from .views import *
from django.urls import path

urlpatterns=[
    path("add_course/",AddCourseView.as_view(),name='add_course'),
    path("my_courses/",MyCoursesListview.as_view(),name='my_courses'),
    path('course_view/<int:id>/', CourseDetailView.as_view(), name='course-detail'),
    path('course_status/<int:id>/', CourseStatusChangeView.as_view(), name='course_status'),
]