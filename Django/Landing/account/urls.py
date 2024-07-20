from django.urls import path
from account import views

urlpatterns = [
    
    # Account
    path('login/',views.login,name="login"),
    path('password_forget/',views.password_forget,name="password_forget"),
    path('signup/',views.signup,name="signup"),
    
]