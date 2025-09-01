from rest_framework import generics,status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers import RegisterSerializer,LoginSerializer,UserSerializer,ProductSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .permissions import HasRole
from .models import Product
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
        
class  AdminDashboardView(APIView):
    permission_classes=(IsAuthenticated,HasRole)
    required_role='admin'
    def get(self,request):
        user=request.user
        user_serializer=UserSerializer(user)
        return Response({
            'message': 'Welcome to Admin Dashboard',
            'user': user_serializer.data
        },200)
    
class  DashboardView(APIView):
    permission_classes=(IsAuthenticated)
    def get(self,request):
        user=request.user
        user_serializer=UserSerializer(user)
        return Response({
            'message': 'Welcome to Dashboard',
            'user': user_serializer.data
        },200)
    
class ProductCreateView(generics.CreateAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer

class ProductGetView(APIView):
    permission_classes=(IsAuthenticated,)
    def get(self,request):
        product=Product.objects.all()
        serialized_data=ProductSerializer(product,many=True)
        return Response({
           'user': serialized_data.data,
        },200)

class ProductUpdateDeleteView(APIView):
    permission_classes=(IsAuthenticated,)

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
    