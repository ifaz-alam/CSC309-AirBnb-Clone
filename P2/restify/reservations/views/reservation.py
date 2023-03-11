from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from accounts.models import Account
from rest_framework.permissions import AllowAny
from helpers import nonEmpty, missing
from reservations.models import Reservation, ReservationSerializer

from properties.models import Property

class ReservationViews(APIView):
    """Api views for Creating, Getting, Updating and Deleting reservations within the system.
    
    Accepts POST: Create Reservation, GET: See reservation, PUT: Update Reservation, DELETE: Delete Reservation.
    """
    
    
    permission_classes = [AllowAny]
    
    """
    Recall the Reservation Model:
        - state (Pending on initialization)
        - paid (False on initialization)
        - start_date 
        - end_date 
        - guest
        - host
        - property
    
    """

    """
    Endpoint for creating reservation.
    Sample payload:
    {   
        "guest": "ifaz",
        "property_id": 1,
        "start_date": "10-10-2022",
        "end_date": "10-10-2022"
    }

    REQUIRED FIELDS:
    guest
    property_id
    start_date
    end_state
    """
    def post(self, request):
        # validation for required fields
        guest_username = request.data.get('guest')
        if not guest_username:
            return Response({'error': 'guest field is required.'}, status=400)
        else:
            # check if guest is a valid username

            #  filter out the accounts to search for user with given username
            guest = Account.objects.filter(username=guest_username).first()
            if not guest:
                return Response({'error': 'Invalid guest username'}, status=404)


        
        property_id = request.data.get('property_id')

        host = None
        property = None
        if not property_id:
            return Response({'error': 'property field is required.'}, status=400)
        else:
            # filter out the accounts
            property = Property.objects.filter(id=property_id).first()
            if property is None:
                return Response({'error': 'Invalid property_id given'}, status=400)
            else:
                host = property.owner

        start = request.data.get('start_date')

        start_date = None
        if start is None:
            return Response({'error': 'start_date field is required.'}, status=400)
        else:
            # Validate start date and attempt to convert it to datetime in format MM-DD-YYYY
            try:
                start_date = datetime.strptime(start, '%m-%d-%Y').date()
            except:
                return Response({'error': 'Invalid start date format. Expected format: MM-DD-YYYY'}, status=400)

        
        end = request.data.get('end_date')
        end_date = None
        if end is None:
            return Response({'error': 'end_date field is required.'}, status=400)
        else:
            # Validate end date and attempt to convert it to datetime in format MM-DD-YYYY
            try:
                end_date = datetime.strptime(start, '%m-%d-%Y').date()
            except:
                return Response({'error': 'Invalid end date format. Expected format: MM-DD-YYYY'}, status=400)

        
        reservation = Reservation.objects.create(guest=guest, host=host, property=property, start_date=start_date, end_date=end_date)
        reservation.save()

        return Response(ReservationSerializer(reservation).data, status=200)

        
        
    def get(self, request):
        """Get a reservation (or all) from the system.

        ### Fields:
        "reservation_id" : 1
        
        "all" : boolean
        
        * if all is true, ignores reservation_id
        
        Example request:
        {
            "pk": "5",
            "all": "false"
        }
        """

        reservation_id = request.data.get('reservation_id')
        all_field = request.data.get('all')

        # only cares for true value
        if all_field == "true": 
             return Response(ReservationSerializer(Reservation.objects.all()).data, status=200)

        # handle reservation_id field
        if reservation_id is None:
            return Response({'error': 'reservation_id is required'}, status=400)
        else:
            reservation = Reservation.objects.filter(id=reservation_id).first()
            if reservation is None:
                return Response({'error': 'Reservation with given id does not exist'}, status=400)
            return Response(ReservationSerializer(reservation).data, status=200)


        
    def put(self, request):
        """
        Update the reservation with the given reservation_id

        Mandatory field: reservation_id

        Sample PUT Json data:
        {
            "reservation_id" : "1",
            "state" : "",
            "paid" : "",
        }
        """
        reservation_id = request.data.get('reservation_id')

        if reservation_id is None:
            return Response({'error': 'reservation_id is required'}, status=400)
        
        # reservation_id was given. we now perform a filter operation
        reservation = Reservation.objects.filter(id=reservation_id).first()
        if reservation is None:
            return Response({'error': 'Reservation with given id does not exist'}, status=400)
        
        # Validate state field
        valid_states = [state[0] for state in Reservation.State.choices]
        state = request.data.get('state')
        if state is not None and state not in valid_states:
            return Response({'error': 'reservation_id is required'}, status=400)
        reservation.state = state

        # Validate paid field
        paid = request.data.get('paid')

        if paid is not None:
            if paid.lower() == "true":
                reservation.paid = True
            elif paid.lower() == False:
                reservation.paid = paid
            else:
                return Response({'error': 'the value for paid given is not a valid format. it must either be true or false'}, status=400)

        reservation.save()



        # success
        return Response(ReservationSerializer(reservation).data, status=200)
    





    def delete(self, request):
        """
        Delete the reservation with the given reservation_id

        Mandatory field: reservation_id

        DELETE request format
        {
            "reservation_id": "1"
        }
        """
        reservation_id = request.data.get('reservation_id')
        
        if reservation_id is None:
            return Response({'error': 'reservation_id is required'}, status=400)
        
        # reservation_id was given. we now perform a filter operation
        reservation = Reservation.objects.filter(id=reservation_id).first()
        if reservation is None:
            return Response({'error': 'Reservation with given id does not exist'}, status=400)

        reservation.delete()
        
        # success
        return Response({'success': 'Reservation deleted successfully'}, status=200)