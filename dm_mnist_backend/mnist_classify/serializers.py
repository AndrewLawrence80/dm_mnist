from rest_framework import serializers
from .models import MnistImage


class MnistImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MnistImage
        fields = ['image']
