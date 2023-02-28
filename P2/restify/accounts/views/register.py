from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from ..models import Account, AccountSerializer
from rest_framework.permissions import AllowAny

class RegisterAccount(APIView):
    """Register an Account within the system

    Accepts a POST request.

    Required fields:
    "username", "first_name", "last_name", "password", "phone_number", "email"
    
    example post data:
    {
    "first_name": "Austin",
    "last_name": "Blackman",
    "email": "austin@mail.com",
    "username": "Austin",
    "password": "password",
    "phone_number": "555-555-5555"
    }
    
    """
    permission_classes = [AllowAny]
    def _missing(self, data: dict[str: list[str]], required_fields: set) -> dict[str: list[str]]:
        """Determine if any of the required fields are missing, if so, return a json response with the missing fields.

        Returns:
            dict[str: list[str]]: A dictionary from "missing_required_fields' to missing fields.
        """
        missing = {'missing_required_fields': []}
        for field in required_fields:
            if field not in data:
                missing['missing_required_fields'] = missing['missing_required_fields'].append(
                    field)

        return missing

    def post(self, request):

        required_fields = {"username", "first_name",
                           "last_name", "password", "phone_number", "email"}
        print(f'Data {request.data}')

        # Determine if any required fields are missing.
        missing = self._missing(request.data, required_fields)
        if len(missing['missing_required_fields']) != 0:
            return Response(missing, status=400)
        
        # Check if username or email is already in use
        if Account.objects.filter(username=request.data['username']).exists() or Account.objects.filter(username=request.data['email']).exists():
            return Response({"error": 'Username or email already in use'}, status=400)
        
        user = Account(
            username=request.data['username'], password=request.data['password'], first_name=request.data['first_name'], last_name=request.data['last_name'], phone_number=request.data['phone_number'])

        user.save()
        
        return Response(AccountSerializer(user).data, status=200)

    
    

