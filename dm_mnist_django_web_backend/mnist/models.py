from django.db import models

# Create your models here.


class MNISTLabel(models.Model):
    label: int = models.IntegerField()