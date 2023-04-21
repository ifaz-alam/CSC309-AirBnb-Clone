from properties.models import Property
from helpers import nonEmpty, missing
from comments.serializers import CommentSerializer
from comments.models import Comment
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from accounts.models import Account
from rest_framework.permissions import AllowAny, IsAuthenticated
from .create import createComment
from .get import getComment
from .delete import deleteComment
from .update import updateComment


class CommentViews(viewsets.ModelViewSet):
    """API Views for comments within the system

    """

    permission_classes = [AllowAny]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def delete(self, request):
        return deleteComment(request)

    def post(self, request):
        return createComment(request)

    def get(self, request):
        """Get a comment within the system

        ### Required Fields: "pk", "parent_pk", "parent_type"
        
        *To access further pages of data when getting all comments from a parent, append ?page=x where x is the page
        to the url
        
        ### Example Request:
        {
            "pk": "1",
            "parent_pk: "",
            "parent_type": ""
        }
        """
        data = request.data
        if (data.get('pk') == '' or data.get('pk') == None):
            if (request.GET.get('pk') != None):
                data['pk'] = request.GET.get('pk')
        if (data.get('parent_pk') == '' or data.get('parent_pk') == None): 
            if (request.GET.get('parent_pk') != None):
                data['parent_pk'] = request.GET.get('parent_pk')
        if (data.get('parent_type') == '' or data.get('parent_type') == None):
            if (request.GET.get('parent_type') != None):
                data['parent_type'] = request.GET.get('parent_type')
                
        print(data)
                
        required = {"pk", "parent_pk", "parent_type"}
        non_empty = {"pk"}
        allowed_obj_types = {'Comment', 'Account', 'Property'}

        errors = {}

        try:
            missing_fields = missing(data, required)
            empty_fields = nonEmpty(data, non_empty)
        except:
            return Response({"key_error":"Check payload for wrong fields"}, status=400)

        if len(empty_fields['empty_fields']) != 0:
            return Response(empty_fields, status=400)

        if len(missing_fields['missing_required_fields']) != 0:
            return Response(missing_fields, status=400)
            

        if data['parent_type'] != '' and data['parent_type'] not in allowed_obj_types:
            errors = errors | {'type_not_allowed': f'{data["content_obj_type"]} not allowed'}

        if len(errors) != 0:
            return Response(errors, status=400)

        # If we are getting a single comment
        if (data['parent_pk'] == ''):
            try:
                comment = Comment.objects.get(pk=int(data['pk']))
                return Response(CommentSerializer(comment).data, status=200)
            except:
                return Response({'error': 'Comment does not exist'})

        else:
            
            now_required_and_non_empty = {'parent_pk', 'parent_type'}
            
            missing_fields = missing(data, now_required_and_non_empty)
            empty_fields = nonEmpty(data, now_required_and_non_empty)

            if len(empty_fields['empty_fields']) != 0:
                return Response(empty_fields, status=400)

            if len(missing_fields['missing_required_fields']) != 0:
                return Response(missing_fields, status=400)
            
            # If we are getting all comments from a parent
            Parent = None

            if data['parent_type'] == 'Account':
                Parent = Account.objects.get(pk=data['parent_pk'])
            elif data['parent_type'] == 'Property':
                Parent = Property.objects.get(pk=data['parent_pk'])
            elif data['parent_type'] == 'Comment':
                Parent = Comment.objects.get(pk=data['parent_pk'])
                
            if (request.GET.get('all') == 'true'):
                return Response(CommentSerializer(Parent.comments.all(), many=True).data)

            page = self.paginate_queryset(Parent.comments.all())
            if page is not None:
                return Response(CommentSerializer(page, many=True).data)
            else:  
                return Response(CommentSerializer(Parent.comments.all(), many=True).data)
        
    
    
    def put(self, request):
        return updateComment(request)