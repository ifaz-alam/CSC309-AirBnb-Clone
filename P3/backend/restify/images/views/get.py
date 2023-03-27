from ..models import Image
from rest_framework.response import Response
from ..serializers import ImageUploadSerializer


def getImage(request):
    """Get all the images in the system
    """
    queryset = Image.objects.all()
    return Response(ImageUploadSerializer(queryset, many=True).data, status=200)
    