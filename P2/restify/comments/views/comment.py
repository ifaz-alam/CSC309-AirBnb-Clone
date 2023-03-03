from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from accounts.models import Account
from rest_framework.permissions import AllowAny


class CommentViews(APIView):
    """API Views for comments within the system

    """
    
    def post(self, request):
        pass
    