from rest_framework.views import APIView
from .get import getImage
from .delete import deleteImage

class ImageView(APIView):
    
    def get(self, request):
        return getImage(request)
    
    def delete(self, request):
        return deleteImage(request)