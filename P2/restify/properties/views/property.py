from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .create import createProperty
from .update import updateProperty
from .delete import deleteProperty
from .get import getProperty

class PropertyViews(APIView):
    """API views for getting, creating, updating, and deleting properties. 
    accepts get, post, put, and delete requests respectively.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        return getProperty(request)
    
    def post(self, request):
        return createProperty(request)
        
    def put(self, request):
        return updateProperty(request)

    def delete(self, request):
        return deleteProperty(request)