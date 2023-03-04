from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from accounts.models import Account
from rest_framework.permissions import AllowAny, IsAuthenticated
from .create import createComment
from .get import getComment

class CommentViews(APIView):
    """API Views for comments within the system

    """
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        return createComment(request)
    
    def get(self, request):
        return getComment(request)