from .views import *
from django.urls import path

urlpatterns =  [
    path("user_details/", UserDetails.as_view(), name="user_details"),
    path("user_details_update/",UserDetailsUpdate.as_view(), name="user-details-update"),
    path("course_list/",CourseListCreateAPIView.as_view(),name="course_list"),
]
