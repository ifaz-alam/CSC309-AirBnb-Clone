from helpers import nonEmpty, missing
from rest_framework.response import Response
from ..models import Comment
from ..serializers import CommentSerializer

# class StandardResultsSetPagination(PageNumberPagination):
#     page_size = 100
#     page_size_query_param = 'page_size'
#     max_page_size = 1000


def getComment(request):
    """Get a comment within the system

    ### Required Fields: "pk"
    
    ### Example Request:
    {
        "pk": "1"
    }
    """
    data = request.data
    required_and_non_empty = {"pk"}
    errors = {}
    
    missing_fields = missing(data, required_and_non_empty)
    empty_fields = nonEmpty(data, required_and_non_empty)
    
    if len(empty_fields['empty_fields']) != 0:
        errors = errors | empty_fields

    if len(missing_fields['missing_required_fields']) != 0:
        errors = errors | missing_fields
    
    if len(errors) != 0:
        return Response(errors, status=400)
    
    comment = Comment.objects.get(pk=int(data['pk']))
    
    return Response(CommentSerializer(comment).data, status=200)