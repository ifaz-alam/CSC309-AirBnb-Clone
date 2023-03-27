from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from helpers import missing
from django.contrib.auth import authenticate

class LoginView(APIView):
    """Login a user within the system

    ### Required fields:
    "username", "password"
    
    ### Example post data:
    {
    "username": "Austin",
    "password": "password"
    }
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        
        required_fields = {'username', 'password'}
        data = request.data
        
        
        # Determine if there are missing required fields.
        missing_fields = missing(data, required_fields)
        
        if len(missing_fields['missing_required_fields']) != 0:
            return Response(missing_fields, status=400)
        
        user = authenticate(username=data['username'], password=data['password'])
        
        if user is not None:
            return Response(status=200)
        else:
            return Response({'authentication_error': 'Username or Password do not match'})