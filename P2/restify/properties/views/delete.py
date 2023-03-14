from rest_framework.response import Response
from ..models import Property

def deleteProperty(request):
    """Delete the Property with the associated primary key
    Must be the owner of the account to delete the property. 
    Returns response status 200 on success, 403 if they are not the owner of the property
    required field: primary key of property
    
    example delete request:
    {
        "pk": "1"
    }
    """

    if request.user != property.owner:
        return Response({'error': 'You are not the owner, permission denied'}, status=403)
    data = request.data
    required_fields = {"pk"}
    #TODO: check for required fields and missing fields here
    try:
        pk_int = int(data['pk'])
    except:
        return Response({'error': 'expected pk to be an int, got something else'}, status=400)

    try:
        property=Property.objects.get(pk=pk_int)
    except:
        return Response({'error': 'Property does not exist'}, status=404)
    
    property.delete()
    return Response({'success, property deleted'}, status=200)