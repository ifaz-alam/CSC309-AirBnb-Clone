from helpers import nonEmpty, missing
from rest_framework.response import Response
from ..models import Comment
from ..serializers import CommentSerializer

def updateComment(request):
    """Update a comment within the system
    
    *JSON must contain old data and new updated data
    
    ### Required Fields:
    {"pk", "comment", "rating"}

    ### Example Put Request:
    {
        "pk": "1",
        "comment": "Oops changed my mind!",
        "rating" : "5"
    }
    """
    
    data = request.data
    
    required_and_non_empty = {"pk", "comment", "rating"}
    
    missing_fields = missing(data, required_and_non_empty)
    empty_fields = nonEmpty(data, required_and_non_empty)
    errors = {}
    if len(empty_fields['empty_fields']) != 0:
        errors = errors | empty_fields

    if len(missing_fields['missing_required_fields']) != 0:
        errors = errors | missing_fields
    
    if len(errors) != 0:
        return Response(errors, status=400)
    
    comment = None
    
    try:
        comment = Comment.objects.get(pk=data['pk'])
    except:
        return Response({'error': 'Comment does not exist'}, status=404)
    
    if (comment.author != request.user) and not request.user.is_superuser:
        return Response({'error': 'You do not have permission to do this'}, status=403)
    
    comment.comment = data['comment']
    comment.rating = data['rating']
    comment.save()
    
    return Response(CommentSerializer(comment).data, status=200)
    