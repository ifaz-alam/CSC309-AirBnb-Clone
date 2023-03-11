from rest_framework.response import Response
from ..models import Property
from helpers import missing
from properties.serializers.property_serializer import PropertySerializer
from accounts.models import Account

def createProperty(request):
    """Register a property within the system
    
    Accepts a POST request.
    
    Required fields: "owner", "description",
                        "location", "price_per_night", "max_guests", "bathrooms", "bedrooms

    Example post data:
    {
    "owner": "1",
    "description": "this is a nice place to stay",
    "location": "Toronto",
    "price_per_night": "200",
    "max_guests": "4",
    "bathrooms": "1",
    "bedrooms": "2"
    }
    """
    required_fields = {"owner", "description", "location", "price_per_night", "max_guests", "bathrooms", "bedrooms"}

    # Determine if any required fields are missing. uses missing helper function
    missing_fields = missing(request.data, required_fields)
    if len(missing_fields['missing_required_fields']) != 0:
        return Response(missing_fields, status=400)
    #check if owner exists then reference it by primary key
    try:
        owner_object = Account.objects.get(pk=int(request.data['owner']))
    except:
        return Response({"error" : "user not found"}, status=404)
    #do same as above for images
    #check that int fields are sent as ints.
    try:
        property = Property(
        owner=owner_object, 
        description=request.data['description'], location=request.data['location'], price_per_night=int(request.data['price_per_night']), 
        max_guests=int(request.data['max_guests']), bathrooms=int(request.data['bathrooms']), bedrooms=int(request.data['bedrooms']))
    except: 
        return Response({"error" : "expected integer, got something else"}, status=400)
    property.save()
    
    return Response(PropertySerializer(property).data, status=200)