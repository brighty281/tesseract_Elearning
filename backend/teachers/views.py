from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated 
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
from . serializers import CourseSerializer
from rest_framework import generics
from . models import Course
from django.shortcuts import get_object_or_404


# Create your views here.
class AddCourseView(APIView):
    permission_classes=[IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        # mutable_data = request.data.copy()
        # mutable_data['added_by'] = request.user.id
        data = request.data.dict()
        data['author'] = request.user.id
        serializer = CourseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# video

class MyCoursesListview(generics.ListAPIView):
    serializer_class=CourseSerializer
    def get_queryset(self):
        user=self.request.user
        if user.is_authenticated:
            c=Course.objects.filter(author_id=user.id)
            print(c)
            return Course.objects.filter(author_id=user.id)
        else:
            print('s')
            return Course.objects.none() 

class CourseDetailView(generics.RetrieveAPIView):
    serializer_class = CourseSerializer
    lookup_url_kwarg = 'id'

    def get_queryset(self):
        queryset = Course.objects.filter(id=self.kwargs.get(self.lookup_url_kwarg))
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CourseStatusChangeView(APIView):
    def patch(self, request, id, *args, **kwargs):
        course = get_object_or_404(Course, id=id)
        print(course)
        if 'is_blocked' in request.data:
            course.is_blocked = request.data['is_blocked']

        course.save()

        serializer = CourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)