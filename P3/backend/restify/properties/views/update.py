from rest_framework.response import Response
from properties.models.property import Property
from properties.serializers.property_serializer import PropertySerializer
from accounts.models import Account
from images.models import Image
from django.core.exceptions import ValidationError

def updateProperty(request):
    """
    Update the property with the given pk associated to that property
    required fields: property primary key
    
    optional fields: 
    address: str
    name: str
    owner: User -> pk int of that user
    images: Image -> pk int of that image
    description: str
    rating: int
    location: str
    price_per_night: int
    max_guests: int
    current_status: str: "available" or "reserved"
    current_renter: User
    banned: User -> pk int of that user
    bathrooms: int
    bedrooms: int
    backyard: bool
    pool: bool
    wifi: bool
    kitchen: bool
    free_parking: bool
    pets_allowed: bool

    Example Put data:
    {
        "pk" : "1",
        "owner": "1",
        "description" : "this is the nicest place to stay in canada",
        "price_per_night": "400"
    }
    """
    #TODO: add support for objects from foreign keys, shouldnt be adding just the pk int, should be the object
    try:
        primary_key = request.data.get('pk')
    except:
        Response({'error': 'property primary key is required'}, status=400)
    if primary_key is None:
        return Response({'error': 'property primary key is required'}, status=400)
    #check that pk is an int
    try:
        pk_int=int(primary_key)
    except:
        return Response({"error" : "expected pk to be an int, got something else"}, status=400)
    #check that property exists
    try:
        property = Property.objects.get(pk=pk_int)
    except:
        return Response({"error" : "property not found"}, status=404)
    #check that the user is the owner of the property
    #if request.user != property.owner:
        #return Response({'error': 'You are not the owner, permission denied'}, status=403)
    #check that rating is an int
    rating = request.data.get('rating')
    try:
        rating_int = int(rating)
    except:
        return Response({"error" : "expected rating to be an int, got something else"}, status=400)
    address = request.data.get('address')
    name = request.data.get('name')
    #add validation to ensure account exists
    owner = Account.objects.get(pk=request.data.get('owner'))
    images = request.data.get('images')
    description = request.data.get('description')
    #int
    
    location = request.data.get('location')
    price_per_night = request.data.get('price_per_night')
    max_guests = request.data.get('max_guests')
    current_status = request.data.get('current_status')
    current_renter = request.data.get('current_renter')
    # need to figure out how to make this a list of some sort
    banned = request.data.get('banned')
    bathrooms = request.data.get('bathrooms')
    bedrooms = request.data.get('bedrooms')
    if address:
        property.address = address
    if name:
        property.name = name
    if owner:
        property.owner = owner
    if images:
        property.images = Image.objects.get(pk=images)
    if description:
        property.description = description
    #int validation should already be done in the model
    if rating:
        property.rating = rating_int
    if location:
        property.location = location
    if price_per_night:
        property.price_per_night = price_per_night
    if max_guests:
        property.max_guests = max_guests
    if current_status:
        property.current_status = current_status
    if current_renter:
        property.current_renter = current_renter
    # make sure its adding the actual objerct.
    if banned:
        property.banned.add(banned)
    if bathrooms:
        property.bathrooms = bathrooms
    if bedrooms:
        property.bedrooms = bedrooms
    
    if request.data.get('backyard'):
        property.backyard = request.data.get('backyard')
    
    if request.data.get('pool'):
        property.pool = request.data.get('pool')

    if request.data.get('wifi'):
        property.wifi = request.data.get('wifi')

    if request.data.get('kitchen'):
        property.kitchen = request.data.get('kitchen')

    if request.data.get('free_parking'):
        property.free_parking = request.data.get('free_parking')

    if request.data.get('pets_allowed'):
        property.pets_allowed = request.data.get('pets_allowed')
    
    try:
        property.full_clean()
    except ValidationError as e:
        return Response({"error " + str(e)}, status=400)
    
    property.save()
    return Response(PropertySerializer(property).data, status=200)