from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from ..models import Account
from accounts.serializers import AccountSerializer
from rest_framework.permissions import AllowAny
from helpers import missing, nonEmpty
from .create import createAccount
from .update import updateAccount
from .delete import deleteAccount
from .get import getAccount

class AccountViewsGet(APIView):
    """Api views for Creating Updating and Deleting Accounts within the system.
    
    Accepts POST: Create Account, PUT: Update Account, DELETE: Delete Account
    """
    
    
    permission_classes = [AllowAny]

    def post(self, request):
        return getAccount(request)
    
   