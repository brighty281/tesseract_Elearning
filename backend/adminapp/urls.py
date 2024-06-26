from .views import *
from django.urls import path

urlpatterns=[
    path('users/', AdminUserListCreateView.as_view(), name='users'),
    path('users/status/<int:pk>/', AcceptUserView.as_view(), name='accept_teachers_view'),

    path('teachers/accept/<int:pk>/', AcceptUserView.as_view(), name='accept_teachers_view'),

]