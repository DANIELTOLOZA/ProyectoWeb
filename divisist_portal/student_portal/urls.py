from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, GradeViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'grades', GradeViewSet, basename='grade')

urlpatterns = [
    path('api/', include(router.urls)),
]