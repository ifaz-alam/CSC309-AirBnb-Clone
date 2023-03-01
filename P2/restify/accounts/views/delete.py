from rest_framework.response import Response
from rest_framework import authentication, permissions
from ..models import Account, AccountSerializer
from rest_framework.permissions import AllowAny
from ..helpers import missing

def deleteAccount(request):
    """Delete the currently authenticated account

    Returns Response 200 on sucess, 403 if not authenticated.
    """
    
    
    if not request.user.is_authenticated:
        return Response({"not_authenticated" : "You must be logged in"}, status=403)
    
    request.user.delete()
    
    return Response(status=200)