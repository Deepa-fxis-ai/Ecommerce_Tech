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
    serializer_class=ProductSerializer(many=True)

class ProductGetView(APIView):
    def get(self,request):
        product=Product.objects.all()
        serialized_data=ProductSerializer(product,many=True)
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
        serializer.save(user=self.request.user)

class CartDeleteView(APIView):
    def get_cart(self,pk):
        return get_object_or_404(Cart, pk=pk)
    
    def delete(self,request,pk):
        product=self.get_cart(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

   