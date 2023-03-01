from rest_framework.response import Response
from ..models import Account, AccountSerializer
from ..helpers import missing

def createAccount(request):
    """Register an Account within the system

    Accepts a POST request.
    

    ### Required fields:
    "username", "first_name", "last_name", "password", "phone_number", "email"
    
    ### Example post data:
    {
    "first_name": "Austin",
    "last_name": "Blackman",
    "email": "austin@mail.com",
    "username": "Austin",
    "password": "password",
    "phone_number": "555-555-5555"
    }
    
    """
    required_fields = {"username", "first_name",
                        "last_name", "password", "phone_number", "email"}

    # Determine if any required fields are missing.
    missing_fields = missing(request.data, required_fields)
    if len(missing_fields['missing_required_fields']) != 0:
        return Response(missing_fields, status=400)

    # Check if username or email is already in use
    if Account.objects.filter(username=request.data['username']).exists() or Account.objects.filter(username=request.data['email']).exists():
        return Response({"error": 'Username or email already in use'}, status=400)

    user = Account.objects.create_user(
        username=request.data['username'], password=request.data['password'], first_name=request.data['first_name'], last_name=request.data['last_name'], phone_number=request.data['phone_number'])

    user.save()

    return Response(AccountSerializer(user).data, status=200)