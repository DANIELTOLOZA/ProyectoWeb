from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, GradeViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'grades', GradeViewSet, basename='grade')

schema_view = get_schema_view(
   openapi.Info(
      title="Student Portal API",
      default_version='v1',
      description="API para el portal de estudiantes",
   ),
   public=True,
)

urlpatterns = [
 path('admin/', admin.site.urls),
    path('login/', include('login.urls')),
    path('api/', include(router.urls), name='api'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('', TemplateView.as_view(template_name='index.html')),
]