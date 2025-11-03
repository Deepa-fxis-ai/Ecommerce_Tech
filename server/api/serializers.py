from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Role,UserRole,Product,CustomerReview,Cart,ProductTranslation,Order,UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=('id','username','email','date_joined','is_staff')

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
    
class ProfileSerializer(serializers.ModelSerializer):
     username=serializers.CharField(source='user.username',read_only=True)
     email=serializers.EmailField(source='user.email',read_only=True)
     date_joined=serializers.DateTimeField(source='user.date_joined',read_only=True)

     class Meta:
         model = UserProfile
         fields=['id','username','email','date_joined','phone','address','avatar']
    
class LoginSerializer(serializers.Serializer):
    username= serializers.CharField(required=True)
    password= serializers.CharField(required=True,write_only=True)

class ProductTranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductTranslation
        fields=("language","name","description","auto_translated")

class ProductSerializer(serializers.ModelSerializer):
    translations=serializers.SerializerMethodField()
    class Meta:
        model=Product
        fields=('id','sku','product_name','price','description','stocks','image_url','ratings','size','dressType','translations')

    def get_translations(self, obj):
        lang = self.context.get("lang")
        qs = obj.translations.all()

        if lang:
            qs = obj.translations.all()
        return ProductTranslationSerializer(qs, many=True).data

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomerReview
        fields=('customer_rating','customer_name','review')

class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Cart
        fields=('id','product','quantity','carted_size','added_at','total_price','user')
        read_only_fields=('id','added_at','total_price')

class OrderSerializer(serializers.ModelSerializer):
    order_user = UserSerializer(read_only=True)
    order_product = ProductSerializer(read_only=True)
    #cart = CartSerializer(read_only=True)
    class Meta:
        model=Order
        fields = '__all__'
        read_only_fields = ('order_user', 'order_product', 'quantity', 'total_price', 'payment_mode')

class PasswordResetRequestSerializer(serializers.Serializer):
    email=serializers.EmailField()

class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8)
