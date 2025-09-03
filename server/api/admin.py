from django.contrib import admin
from api.models import Role,UserRole,Product,Size

admin.site.register(Role)
admin.site.register(UserRole)

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display=("name",)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display=('product_name','price','description','image_url','ratings','dressType')
    filter_horizontal=("size",) 

