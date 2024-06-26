from rest_framework import serializers
from user_management.models import *


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [ 'profile_pic', 'phone', 'social_link1', 'social_link2', 'about']


class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(many=False, read_only=True)  
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined', 'last_login', 'is_superuser', 'is_email_verified', 'is_staff', 'is_active', 'otp', 'user_profile']

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)  

    class Meta:
        model = UserProfile
        fields = ['profile_pic', 'phone', 'social_link1', 'social_link2', 'about', 'username']