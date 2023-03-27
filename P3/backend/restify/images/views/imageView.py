from rest_framework import viewsets
from rest_framework.exceptions import ParseError
from ..models import Image
from ..serializers import ImageUploadSerializer
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

class ImageUploadViewSet(viewsets.ModelViewSet):
    """View for uploading an image
    
    SOURCE: https://stackoverflow.com/questions/45564130/django-rest-framework-image-upload

    """
    queryset = Image.objects.all()
    serializer_class = ImageUploadSerializer
    
    parser_classes = [MultiPartParser]
    
    def post(self, request):
        try:
            file = request.data['image']
        except KeyError:
            raise ParseError('Request has no file attached')
        image = Image(image=file, title=request.data['title'])
        image.save()
        return Response(ImageUploadSerializer(image).data, status=200)
    