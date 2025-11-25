"""
URL configuration for chatbot project.
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # Authentication endpoints
    path('api/login/', views.login, name='login'),
    path('api/logout/', views.logout, name='logout'),
    path('api/check-auth/', views.check_auth, name='check_auth'),
    # Chatbot endpoints
    path('api/chat/', views.chat, name='chat'),
    path('api/conversation/', views.get_conversation, name='get_conversation'),
]
