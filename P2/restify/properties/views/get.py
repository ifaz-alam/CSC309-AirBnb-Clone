from rest_framework.response import Response
from ..models.property import Property
from ..serializers.property_serializer import PropertySerializer

#filter
def getProperty(request):
    """ returns the property/ies based on search paramter. 
    ### Fields:
    "pk" : int
    "all" : boolean
    "filter": str 
    "sort": str
    "filter_magnitude": str or int
    
    field descriptions:
    pk: primary key will return associated property.
    
    all: set to true returns all properties and ignores pk.
    
    filter: returns all properties with said filter.
    supported filters: "price", "max_guests", "location", "rating"
    
    sort: returns all properties sorted by given parameter in ascending order
    support sorting: "price", "max_guests"

    filter_magnitude: filter magnitude, e.g if filter is price, 
    and filter_magnitude is 100, will return all properties with a price of 100
    
    note: for filter or sort to work, all must be set to true

    Example requests:
    single property:
    {
        "pk": "1",
        "all": "false",
        "filter": "none",
        "sort": "none"
    }
    all properties:
    {
        "pk": "1",
        "all": "true",
        "filter": "none",
        "sort": "none"
    }
    filter example:
    {
        "pk": "1",
        "all": "true",
        "filter": "price",
        "sort": "none"
        "filter_magnitude": "100"
    }

    """
    data = request.data
    required = {"pk", "all", "filter", "sort"}
    if data['all'] == 'true':
        try:
            properties=Property.objects.all()
        except:
            return Response({'error': 'There are no properties found'}, status=404)
        if data['filter'] != 'none':
            pass
        if data['sort'] != 'none':
            pass
        #return all objects since there is no filter or order
        else:
            return Response(PropertySerializer(properties, many=True).data, status=200)
        
    #get data for a single property
    elif data['all'] == 'false':
        #check that pk is an integer
        try:
            pk_int=int(data['pk'])
        except ValueError:
            return Response({'error': 'pk expected an integer, got something else'}, status=400)
        #check that the property exists, if so return it
        try:
            property = Property.objects.get(pk=pk_int)
            return Response(PropertySerializer(property).data, status=200)
        except:
            return Response({'error': 'Property does not exist'}, status=404)