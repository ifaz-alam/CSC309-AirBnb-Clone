from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from accounts.models import Account
from rest_framework.permissions import AllowAny, IsAuthenticated
from .create import createComment
from .get import getComment
from .delete import deleteComment
from.update import updateComment

class CommentViews(APIView):
    """API Views for comments within the system

    """
    
    permission_classes = [IsAuthenticated]
    
    def delete(self, request):
        return deleteComment(request)
    
    def post(self, request):
        return createComment(request)
    
    def get(self, request):
        return getComment(request)
    
    def put(self, request):
        return updateComment(request)