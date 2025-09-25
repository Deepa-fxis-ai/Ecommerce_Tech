from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator,MinValueValidator

# Create your models here.
class Role(models.Model):
    name=models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name
    
class UserRole(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE,related_name='user_roles')
    role=models.ForeignKey(Role, on_delete=models.CASCADE)

    class Meta:
        unique_together=('user','role')

class Size(models.Model):
    name=models.CharField(max_length=20,unique=True)

    def __str__(self):
        return self.name
        
class Product(models.Model):
    sku=models.CharField(max_length=50,unique=True,default='SKU')
    price=models.DecimalField(max_digits=10,decimal_places=2)
    image_url=models.URLField(max_length=500,blank=True,null=True)
    product_name=models.CharField(max_length=255,default='Unknown')
    description=models.TextField(blank=True,null=True)
    ratings=models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)],blank=True,null=True)
    stocks=models.IntegerField(default=10)
    size=models.ManyToManyField(Size,blank=True)
    dressType=models.CharField(max_length=20,choices=[('C','Casual'),('F','Formal'),('P','Party'),('G','Gym',)],default=('C','Casual'))

    def __str__(self):
           return self.sku

class ProductTranslation(models.Model):
    product=models.ForeignKey(Product,related_name="translations",on_delete=models.CASCADE)
    language=models.CharField(max_length=10)
    name=models.CharField(max_length=255,default='Unknown')
    description=models.TextField()
    auto_translated=models.BooleanField(default=False)

    class Meta:
        unique_together=("product","language")

    def __str__(self):
        return f"{self.product.sku}[{self.language}]"
    
class CustomerReview(models.Model):
    customer_rating=models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)],blank=True,null=True)
    customer_name=models.CharField(max_length=20,unique=True)
    review=models.TextField()

class Cart(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField(default=1)
    added_at=models.DateTimeField(auto_now_add=True)
    
    @property
    def total_price(self):
        return self.product.price * self.quantity
