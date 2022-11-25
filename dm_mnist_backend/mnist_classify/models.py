from django.db import models


class MnistImage(models.Model):
    upload_to = 'uploads'
    image = models.ImageField(upload_to=upload_to)

# Create your models here.
