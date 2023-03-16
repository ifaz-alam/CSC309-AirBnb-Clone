from rest_framework.response import Response
from ..models import Property
from helpers import missing
from helpers.check_options import check_optional_fields
from properties.serializers.property_serializer import PropertySerializer
from accounts.models import Account
from images.models import Image
from django.core.exceptions import ValidationError

def createProperty(request):
    """Register a property within the system
    
    Accepts a POST request.
    
    Required fields: "address", "name", "owner", "images", "description",
                        "location", "price_per_night", "max_guests", "bathrooms", "bedrooms

    optional fields: "backyard", "pool", "wifi", "kitchen", "free_parking", "pets_allowed"
    Example post data:
    {
    "address": "308 Negra Arroyo Lane, Albuquerque, New Mexico. 87104",
    "name": "a very nice place to stay",
    "owner": "1",
    "images": "1",
    "description": "this is a nice place to stay",
    "location": "Toronto",
    "price_per_night": "200",
    "max_guests": "4",
    "bathrooms": "1",
    "bedrooms": "2"
    }
    Example post data with some optional fields:
    {
    "address": "308 Negra Arroyo Lane, Albuquerque, New Mexico. 87104",
    "name": "a very nice place to stay",
    "owner": "1",
    "images": "1",
    "description": "this is a nice place to stay",
    "location": "Toronto",
    "price_per_night": "200",
    "max_guests": "4",
    "bathrooms": "1",
    "bedrooms": "2",
    "backyard": "true",
    "pool": "true",
    "wifi": "false",
    "pets_allowed" "false"
    }
    """
    #cannot create a property with a rating, rating must be added in update
    #could probably just use guest_username = request.data.get('guest')
    #rating should be handled in reservation and comments
    #check if other optional fields are given
    optional_fields = ['backyard', 'pool', 'wifi', 'kitchen', 'free_parking', 'pets_allowed']
    options = check_optional_fields(request, optional_fields)

    required_fields = {"address", "name", "owner", "images", "description", "location", "price_per_night", "max_guests", "bathrooms", "bedrooms"}

    # Determine if any required fields are missing. uses missing helper function
    missing_fields = missing(request.data, required_fields)
    if len(missing_fields['missing_required_fields']) != 0:
        return Response(missing_fields, status=400)
    
    # TODO: determine if any required fields are empty uses empty helper function
    
    #check if ints are ints
    try:
        owner_pk = int(request.data['owner'])
        image_pk = int(request.data['images'])
        #price per night
        ppn = int(request.data['price_per_night'])
        #max_guests
        mg = int(request.data['max_guests'])
        baths = int(request.data['bathrooms'])
        beds = int(request.data['bedrooms'])
    except:
        return Response({"error" : "expected owner, image, price per night, max guests, bathrooms, and bedrooms \
                         to be an integers, one or more, were not"}, status=400)
    
    #check if owner exists
    try:
        owner_object = Account.objects.get(pk=owner_pk)
    except:
        return Response({"error" : "user not found"}, status=404)
    #check if the image exists
    try:
        images_object = Image.objects.get(pk=image_pk)
    except:
        return Response({"error" : "image not found"}, status=404)
    
    property = Property(address=request.data['address'],
    name=request.data['name'], owner=owner_object, images=images_object, description=request.data['description'], 
    location=request.data['location'], price_per_night=ppn, max_guests=mg, bathrooms=baths, bedrooms=beds, 
    backyard=options['backyard'], pool=options['pool'], wifi=options['wifi'], kitchen=options['kitchen'], 
    free_parking=options['free_parking'], pets_allowed=options['pets_allowed'])
    try:
        property.full_clean()
    except ValidationError as e:
        return Response({"error " + str(e)}, status=400)
    property.save()
    
    return Response(PropertySerializer(property).data, status=200)