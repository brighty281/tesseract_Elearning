from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,ListAPIView
from rest_framework.decorators import permission_classes
from user_management.models import *
from .permissions import *
from user_management.api.serializers import *
from rest_framework.filters import SearchFilter
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from user_management.api.email import *
# Create your views here.
class AdminUserListCreateView(ListCreateAPIView):
    permission_classes=[IsAdmin]
    queryset = User.objects.all().order_by('-date_joined') 
    serializer_class = UserSerializer
    filter_backends = [SearchFilter]

class AcceptUserView(APIView):
    permission_classes = [IsAdmin]
    def patch(self, request, pk, *args, **kwargs):
        print(pk)
        user = get_object_or_404(User, pk=pk)
        
        if 'is_email_verified' in request.data:
            user.is_email_verified = True
            UserProfile.objects.get_or_create(user=user)
            send_approval(user.email)

        elif 'is_active' in request.data:
            user.is_active = request.data['is_active']
            print("block/unblockdone")

        user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

