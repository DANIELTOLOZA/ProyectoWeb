from rest_framework import serializers
from .models import Course, Grade

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'code', 'name', 'credits', 'semester']

class GradeSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    course_code = serializers.CharField(source='course.code', read_only=True)
    final_grade = serializers.SerializerMethodField()

    class Meta:
        model = Grade
        fields = ['id', 'course', 'course_name', 'course_code', 'p1', 'p2', 'p3', 'ex', 'final_grade']

    def get_final_grade(self, obj):
        return obj.calculate_final_grade()