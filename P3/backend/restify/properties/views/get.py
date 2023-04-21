from rest_framework.response import Response
from ..models.property import Property
from ..serializers.property_serializer import PropertySerializer

def getProperty(request):
    """ returns the property/ies based on search paramter. 
    ### Fields:
    "pk" : int
    "all" : boolean
    
    field descriptions:
    pk: primary key will return associated property.
    
    all: set to true returns all properties and ignores pk.

    Example requests:
    single property:
    {
        "pk": "1",
        "all": "false"
    }
    all properties:
    {
        "pk": "1",
        "all": "true"
    """
    data = request.data
    
    if (data.get('pk') == '' or data.get('pk') == None):
            if (request.GET.get('pk') != None):
                data['pk'] = request.GET.get('pk')
    if (data.get('all') == '' or data.get('all') == None):
            if (request.GET.get('all') != None):
                data['all'] = request.GET.get('all')

    required = {"pk", "all"}
    if data['all'] == 'true':
        try:
            properties=Property.objects.all()
            return Response(PropertySerializer(properties, many=True).data, status=200)
        except:
            return Response({'error': 'There are no properties found'}, status=404)
        
        
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