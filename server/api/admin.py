from django.contrib import admin
from .models import Role,UserRole,Product,Size,ProductTranslation

admin.site.register(Role)
admin.site.register(UserRole)

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display=("name",)

class ProductTranslationInline(admin.TabularInline):
    model=ProductTranslation
    extra=1

class ProductAdmin(admin.ModelAdmin):
    inlines=[ProductTranslationInline]
    list_display=('sku','stocks','product_name','description','price','image_url','ratings','dressType')
    filter_horizontal=("size",)

admin.site.register(Product,ProductAdmin)


