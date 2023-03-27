from rest_framework import serializers
from ..models import Image


class ImageUploadSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Image
        fields = ['pk', 'title','image']
