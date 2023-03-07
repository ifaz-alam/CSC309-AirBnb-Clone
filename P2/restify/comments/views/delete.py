from helpers import missing, nonEmpty
from rest_framework.response import Response
from ..models import Comment

def deleteComment(request):
    """Delete a comment within the system
    
    *Must be owner or super user

    ### Required Fields:
    "pk"
    
    ### Example Delete Request:
    {
        "pk" : "1"
    }
    """
    data = request.data
    
    required_fields = {"pk"}
    
    missing_fields = missing(data, required_fields)
    empty_fields = nonEmpty(data, required_fields)
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
    
    comment.delete()
    
    return Response(status=200)