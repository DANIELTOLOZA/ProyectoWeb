<<<<<<< HEAD:divisist_portal/student_portal/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Avg, F
from .models import Course, Grade
from .serializer import CourseSerializer, GradeSerializer
from rest_framework.permissions import IsAuthenticated

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

class GradeViewSet(viewsets.ModelViewSet):
    serializer_class = GradeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Grade.objects.filter(student=self.request.user)

    @action(detail=False, methods=['get'])
    def average_grade(self, request):
        grades = self.get_queryset()
        avg_grade = grades.aggregate(average=Avg(
            F('p1') * 0.3 + F('p2') * 0.3 + F('p3') * 0.3 + F('ex') * 0.1
        ))['average']
=======
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Avg, F
from .models import Course, Grade
from .serializer import CourseSerializer, GradeSerializer
from rest_framework.permissions import IsAuthenticated

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

class GradeViewSet(viewsets.ModelViewSet):
    serializer_class = GradeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Grade.objects.filter(student=self.request.user)

    @action(detail=False, methods=['get'])
    def average_grade(self, request):
        grades = self.get_queryset()
        avg_grade = grades.aggregate(average=Avg(
            F('p1') * 0.3 + F('p2') * 0.3 + F('p3') * 0.3 + F('ex') * 0.1
        ))['average']
>>>>>>> f9a1f56 (add files):student_portal/views.py
        return Response({'average_grade': round(avg_grade, 1) if avg_grade else 0})