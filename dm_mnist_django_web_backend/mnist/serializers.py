from rest_framework import serializers
from mnist.models import MNISTLabel


class MNISTLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MNISTLabel
        fields = ["label"]
