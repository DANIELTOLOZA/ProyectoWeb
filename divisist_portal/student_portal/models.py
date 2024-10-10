from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    credits = models.IntegerField()
    semester = models.IntegerField()

    def _str_(self):
        return f"{self.code} - {self.name}"

class Grade(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    p1 = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    p2 = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    p3 = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    ex = models.DecimalField(max_digits=3, decimal_places=1, default=0)

    class Meta:
        unique_together = ('student', 'course')

    def calculate_final_grade(self):
        return round(self.p1 * 0.3 + self.p2 * 0.3 + self.p3 * 0.3 + self.ex * 0.1, 1)

    def _str_(self):
        return f"{self.student.username} - {self.course.code}"