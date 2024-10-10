from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Avg, F
from .models import Course, Grade
from .serializers import CourseSerializer, GradeSerializer

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class GradeViewSet(viewsets.ModelViewSet):
    serializer_class = GradeSerializer

    def get_queryset(self):
        return Grade.objects.filter(student=self.request.user)

    @action(detail=False, methods=['get'])
    def average_grade(self, request):
        grades = self.get_queryset()
        avg_grade = grades.annotate(
            final_grade=…
[5:53 p.m., 10/10/2024] +57 310 5161529: ruta student_portal/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, GradeViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'grades', GradeViewSet, basename='grade')

urlpatterns = [
    path('api/', include(router.urls)),
]