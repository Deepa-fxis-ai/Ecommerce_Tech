"""
URL configuration for ecommerce project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import RegisterView,LoginView,DashboardView,AdminDashboardView,ProductCreateView,ProductGetView,ProductUpdateDeleteView,CartView,CartDeleteView,CreatePayment,ExecutePayment,OrderView,CreateOrderView,UpdateDeleteView,PasswordResetRequestView,PasswordResetConfirmView,UserProfileView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/register',RegisterView.as_view(),name="auth_register"),
    path('api/auth/login',LoginView.as_view(),name="auth_login"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/dashboard/',DashboardView.as_view(),name="dashboard"),
    path('api/admindashboard/',AdminDashboardView.as_view(),name="admin_dashboard"),
    path('product/create/',ProductCreateView.as_view(),name="product_create"),
    path('product/get/',ProductGetView.as_view(),name="product_list"),
    path('product/detail/<int:pk>/',ProductUpdateDeleteView.as_view(),name="product_update_delete"),
    path('cart/',CartView.as_view(),name="cart_get"),
    path('deletecart/<int:pk>',CartDeleteView.as_view(),name="cart_delete"),
    path("paypal/create-payment/",CreatePayment.as_view(),name="create_payment"),
    path("paypal/execute-payment/", ExecutePayment.as_view(),name="execute_payment"),
    path("order/",OrderView.as_view(),name="order"),
    path("order/update-delete/<int:pk>",UpdateDeleteView.as_view(),name="order_update_delete"),
    path("create-order/",CreateOrderView.as_view(),name="order_create"),
    path("password-reset/",PasswordResetRequestView.as_view(),name="reset_password"),
    path("password-reset-confirm/",PasswordResetConfirmView.as_view(),name="reset_password_confirm"),
    path('user-profile/',UserProfileView.as_view(),name='user_profile')
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
