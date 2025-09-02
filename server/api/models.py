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
    product_name=models.CharField(max_length=255,default='Unknown')
    price=models.DecimalField(max_digits=10,decimal_places=2)
    description=models.TextField()
    image_url=models.URLField(max_length=500,blank=True,null=True)
    ratings=models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)],blank=True,null=True)
    size=models.ManyToManyField(Size,blank=True)

class CustomerReview(models.Model):
    customer_rating=models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)],blank=True,null=True)
    customer_name=models.CharField(max_length=20,unique=True)
    review=models.TextField()
