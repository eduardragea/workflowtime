from django.db import models

# Create your models here.

# Contact Us
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email= models.EmailField(max_length=100)
    subject = models.CharField(max_length=100)
    comment = models.CharField(max_length=250)
    def __str__(self):
        return self.name