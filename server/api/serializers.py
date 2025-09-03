from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Role,UserRole,Product,CustomerReview,Cart

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=('id','username','email','date_joined')

class RegisterSerializer(serializers.ModelSerializer):
    role=serializers.CharField(write_only=True,required=False)
    class Meta:
        model= User
        fields=('username','email','password','role')
    
    def create(self,validated_data):
        role_name=validated_data.pop('role',None)
        user=User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        if role_name:
            role,created=Role.objects.get_or_create(name=role_name)
            UserRole.objects.create(user=user,role=role)
        return user
    
class LoginSerializer(serializers.Serializer):
    username= serializers.CharField(required=True)
    password= serializers.CharField(required=True,write_only=True)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('id','product_name','price','description','image_url','ratings','size','dressType')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomerReview
        fields=('customer_rating','customer_name','review')

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields=('id','product','quantity','added_at','total_price')
        read_only_fields=('id','added_at','total_price')