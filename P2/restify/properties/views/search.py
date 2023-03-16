from rest_framework import viewsets
from properties.models import Property
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from properties.serializers import PropertySerializer

class SearchView(viewsets.ModelViewSet):
    """API Views for comments within the system

    """

    permission_classes = [IsAuthenticated]
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    #filtering_backends = [filters.OrderingFilter]

    def get(self, request):
        """
        #TODO: look into search filter django-filter package
        get the results of a search
        for search no fields are required, all are optional.
        if no fields are given return paginated results for all properties.

        ### Fields: 
        "filter_by": str 
        "sort_by": str 
        "filter_magnitude": str or int
        "sort_direction: str:  ascending or descending"
    
        filter_by: returns all properties with said filter, if filter type is given, filter magnitude is required
        supported filters: "price", "max_guests", "location", "rating"
    
        sort_by: returns all properties sorted by given parameter in sort_direction
        support sorting: "price", "rating"

        filter_magnitude: filter magnitude, e.g if filter_type is price, 
        and filter_magnitude is 100, will return all properties with a price of 100
        
        sort_direction: direction to sort the search results in, defaults to ascending
        
        *To access further pages of data when getting all comments from a parent, append ?page=x where x is the page
        to the url

        example request:
        {
            "filter_by": "price",
            "filter_magnitude": "500"
        }
        """
        #TODO: add checks to ensure if pagination not required return it all
        #TODO: ensure filter and sort by work in cohesion
        #for now only 1 of sort or order is supported
        #properties = Property.objects.all()
        #if not request.data.get('filter') and not request.data.get('sort'):
        filter_by = request.data.get('filter_by')
        sort_by = request.data.get('sort_by')
        filter_magnitude = request.data.get('filter_magnitude')
        sort_direction = request.data.get('sort_direction')
        # verify sort direction is ascending or descending
        if sort_direction:
            if sort_direction == 'ascending':
                pass
            elif sort_direction == 'descending':
                pass
            else:
                return Response({'error': 'sort_direction should be ascending or descending, got something else'}, status=400)
        #apply filters
        if filter_by:
            #verify filter_magnitude was given
            if not filter_magnitude:
                return Response({'error': 'filter_by was given, expected filter_magnitude, did not get one'}, status=400)
            
            if filter_by == 'price':
                #verify filter_magnitude is given and is an int
                try:
                    price = int(filter_magnitude)
                except:
                    return Response({'error': 'expected filter magnitude to be an int, got something else'}, status=400)
                page = self.paginate_queryset(Property.objects.filter(price_per_night=price))
                return Response(PropertySerializer(page, many=True).data)
            
            if filter_by == 'max_guests':
                #verify filter_magnitude is given and is an int
                try:
                    max_guest_int = int(filter_magnitude)
                except:
                    return Response({'error': 'expected filter magnitude to be an int, got something else'}, status=400)
                page = self.paginate_queryset(Property.objects.filter(max_guests=max_guest_int))
                return Response(PropertySerializer(page, many=True).data)
            
            if filter_by == 'rating':
                #verify filter_magnitude is given and is an int
                try:
                    rating_int = int(filter_magnitude)
                except:
                    return Response({'error': 'expected filter magnitude to be an int, got something else'}, status=400)
                page = self.paginate_queryset(Property.objects.filter(rating=rating_int))
                return Response(PropertySerializer(page, many=True).data)
            
            if filter_by == 'location':
                #verify filter_magnitude is given and is an int
                page = self.paginate_queryset(Property.objects.filter(location=filter_magnitude))
                return Response(PropertySerializer(page, many=True).data)
        
        elif sort_by:
            if sort_by == 'price':
                #if sort direction isnt given or is given the wrong paramter, returns in ascending order
                if sort_direction == 'descending':
                    page = self.paginate_queryset(Property.objects.order_by('-price_per_night'))
                    return Response(PropertySerializer(page, many=True).data)
                else:
                    page = self.paginate_queryset(Property.objects.order_by('price_per_night'))
                    return Response(PropertySerializer(page, many=True).data)
            if sort_by == 'max_guests':
                if sort_direction == 'descending':
                    page = self.paginate_queryset(Property.objects.order_by('-rating'))
                    return Response(PropertySerializer(page, many=True).data)
                else:
                    page = self.paginate_queryset(Property.objects.order_by('rating'))
                    return Response(PropertySerializer(page, many=True).data)
        else:

            page = self.paginate_queryset(Property.objects.all())
            if page:
                return Response(PropertySerializer(page, many=True).data)
            else:
                return Response(PropertySerializer(Property.objects.all(), many=True).data)