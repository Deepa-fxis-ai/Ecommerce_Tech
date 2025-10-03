from rest_framework import generics,status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers import RegisterSerializer,LoginSerializer,UserSerializer,ProductSerializer,ReviewSerializer,CartSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken  
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .permissions import HasRole
from .models import Product,CustomerReview,Cart
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.http import JsonResponse
import paypalrestsdk
from .paypal_config import paypalrestsdk

from rest_framework.exceptions import ValidationError


# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer

class LoginView(generics.GenericAPIView):
    serializer_class=LoginSerializer
    def post(self, request, *args, **kwargs):
        username= request.data.get('username')
        password= request.data.get('password')
        user=authenticate(username=username,password=password)

        if user is not None:
            refresh= RefreshToken.for_user(user)
            user_serializer=UserSerializer(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user':user_serializer.data
            })
        else:
            return Response({"detail": "User does not exist"}, status=401)
        
class AdminDashboardView(APIView):
    permission_classes=(IsAuthenticated,HasRole)
    required_role='admin'
    def get(self,request):
        user=request.user
        user_serializer=UserSerializer(user)
        return Response({
            'message': 'Welcome to Admin Dashboard',
            'user': user_serializer.data
        },200)
    
class DashboardView(APIView):
    permission_classes=(IsAuthenticated)
    def get(self,request):
        user=request.user
        user_serializer=UserSerializer(user)
        return Response({
            'message': 'Welcome to Dashboard',
            'user': user_serializer.data
        },200)
    
class ProductCreateView(generics.CreateAPIView):
    permission_classes=(IsAuthenticated,HasRole)
    required_role='admin'
    queryset=Product.objects.all()
    serializer_class=ProductSerializer

class ProductGetView(APIView):
    def get(self,request):
        lang = request.query_params.get("lang")
        product=Product.objects.all()
        serialized_data=ProductSerializer(product,many=True,context={"lang": lang})
        return Response({
           'user': serialized_data.data,
        },200)

class ProductUpdateDeleteView(APIView):
    def get_product(self,pk):
        return get_object_or_404(Product, pk=pk)
    
    def get(self,request,pk):
        product=self.get_product(pk)
        serializer=ProductSerializer(product)
        return Response(serializer.data)
    
    def put(self,request,pk):
        product=self.get_product(pk)
        serializer=ProductSerializer(product,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        product=self.get_product(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class UserReviewCreate(generics.CreateAPIView):
    queryset=CustomerReview.objects.all()
    serializer_class=ReviewSerializer

class UserReviewGet(APIView):
    permission_classes=(IsAuthenticated,)
    def get(self,request):
        customer=CustomerReview.objects.all()
        serialized_data=ReviewSerializer(customer,many=True)
        return Response({
           'user': serialized_data.data,
        },200)
    
class CartView(generics.ListCreateAPIView):
    serializer_class=CartSerializer
    permission_classes=(IsAuthenticated,)
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user) 
    def perform_create(self,serializer):

        cart_item=serializer.save(user=self.request.user)

        product = cart_item.product
        if product.stocks >= cart_item.quantity:
            product.stocks -= cart_item.quantity
            product.save()
        else:
            cart_item.delete()
            
            raise ValidationError(f"Only {product.stock} items in stock")

class CartDeleteView(APIView):
    def get_cart(self,pk):
        return get_object_or_404(Cart, pk=pk)
    
    def delete(self,request,pk):
        cart_item=self.get_cart(pk)

        product=cart_item.product
        product.stocks+=cart_item.quantity
        product.save()
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CreatePayment(APIView):
    def post(self, request, *args, **kwargs):
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {"payment_method": "paypal"},
            "redirect_urls": {
                "return_url": "http://localhost:5173/success/",
                "cancel_url": "http://localhost:5173/cancel/"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Test Item",
                        "sku": "item_1",
                        "price": "10.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {"total": "10.00", "currency": "USD"},
                "description": "Test transaction"
            }]
        })

        if payment.create():
            for link in payment.links:
                if link.method == "REDIRECT":
                    return Response({"redirect_url": link.href})
        else:
            return Response({"error": payment.error}, status=400)


# Execute payment after approval
class ExecutePayment(APIView):
    def get(self, request, *args, **kwargs):
        payment_id = request.GET.get("paymentId")
        payer_id = request.GET.get("PayerID")

        payment = paypalrestsdk.Payment.find(payment_id)

        if payment.execute({"payer_id": payer_id}):
            return Response({"status": "success"})
        else:
            return Response({"status": "failure", "error": payment.error})
    def execute_payment(request):
        payment_id = request.GET.get("paymentId")
        payer_id = request.GET.get("PayerID")
        payment = paypalrestsdk.Payment.find(payment_id)

        if payment.execute({"payer_id": payer_id}):
            return JsonResponse({"status": "success"})
        else:
            return JsonResponse({"status": "failure", "error": payment.error})

    