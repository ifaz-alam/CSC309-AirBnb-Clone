from helpers import missing, nonEmpty
from rest_framework.response import Response
from ..models import Comment
from properties.models import Property
from accounts.models import Account
from ..serializers import CommentSerializer

def createComment(request):
    """Create a comment within the system.

    ### Required fields:
    'comment', 'rating', 'content_obj_pk', 'content_obj_type'
    
    * If content_obj_type is Comment, rating will be ignored

    ### Example post data:
    {
    "comment": "Hi!",
    "rating": "5",
    "content_obj_pk": "1",
    "content_obj_type": "Account"
    }
    """
    data = request.data
    
    errors = {}
    
    required_fields = {'comment', 'rating', 'content_obj_pk', 'content_obj_type'}
    non_empty_fields = {'comment', 'content_obj_pk', 'content_obj_type'}
    allowed_obj_types = {'Comment', 'Account', 'Property'}
    
    missing_fields = missing(data, required_fields)
    empty_fields = nonEmpty(data, non_empty_fields)
    
    if len(empty_fields['empty_fields']) != 0:
        errors = errors | empty_fields

    if len(missing_fields['missing_required_fields']) != 0:
        errors = errors | missing_fields
    
    if data['content_obj_type'] not in allowed_obj_types:
        errors = errors | {'type_not_allowed': f'{data["content_obj_type"]} not allowed'}
    
    if len(errors) != 0:
        return Response(errors, status=400)
    
    comment_parent = None
    
    if data['content_obj_type'] == 'Account':
        comment_parent = Account.objects.get(pk=data['content_obj_pk'])
    elif data['content_obj_type'] == 'Property':
        comment_parent = Property.objects.get(pk=data['content_obj_pk'])
    elif data['content_obj_type'] == 'Comment':
        comment_parent = Comment.objects.get(pk=data['content_obj_pk']) 
        
    new_comment = Comment(author=request.user, comment=data['comment'], rating = data['rating'], content_object=comment_parent)
    
    new_comment.save()
    return Response(CommentSerializer(new_comment).data, status=200)