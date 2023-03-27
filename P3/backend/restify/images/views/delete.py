from helpers import nonEmpty, missing
from rest_framework.response import Response
from ..models import Image


def deleteImage(request):
    """Delete an image from the system

    ### Required Fields: "pk"
    
    ### Example Request:
    {
        "pk":"1"
    }
    """
    data = request.data
    required = {'pk'}
    
    missing_fields = missing(data, required)
    empty_fields = nonEmpty(data, required)
    errors = {}
    
    if len(empty_fields['empty_fields']) != 0:
        errors = errors | empty_fields

    if len(missing_fields['missing_required_fields']) != 0:
        errors = errors | missing_fields
    
    if len(errors) != 0:
        return Response(errors, status=400)
    
    try:
        image = Image.objects.get(pk=int(request.data['pk']))
        image.delete()
        return Response(status=200)
    except:
        return Response({'error': 'Image does not exist'})