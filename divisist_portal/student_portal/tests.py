from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from .models import Course, Grade

class GradeTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.course = Course.objects.create(
            code='TEST101', 
            name='Test Course', 
            credits=3, 
            semester=1
        )
        
    def test_calculate_final_grade(self):
        grade = Grade.objects.create(
            student=self.user,
            course=self.course,
            p1=4.0,
            p2=4.0,
            p3=4.0,
            ex=4.0
        )
        self.assertEqual(grade.calculate_final_grade(), 4.0)

class APITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.course = Course.objects.create(
            code='TEST101', 
            name='Test Course', 
            credits=3, 
            semester=1
        )
        self.client.force_authenticate(user=self.user)

    def test_get_grades(self):
        response = self.client.get('/api/grades/')
        self.assertEqual(response.status_code, 200)

    def test_create_grade(self):
        data = {
            'course': self.course.id,
            'p1': 4.0,
            'p2': 4.0,
            'p3': 4.0,
            'ex': 4.0
        }
        response = self.client.post('/api/grades/', data)
        self.assertEqual(response.status_code, 201)