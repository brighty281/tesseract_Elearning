from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    demo_video = serializers.FileField(required=False)
    thumbnail = serializers.FileField(required=False)
    user = serializers.SerializerMethodField()
    class Meta:
        model = Course
        fields= '__all__'

        
    def get_user(self, obj):
        return obj.author.username