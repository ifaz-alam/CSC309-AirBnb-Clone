from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, viewsets
from accounts.models import Account
from rest_framework.permissions import AllowAny
from helpers import nonEmpty, missing
from reservations.models import Reservation, ReservationSerializer
from django.db.models import Q

from properties.models import Property

class ReservationViews(viewsets.ModelViewSet):
    """Api views for Creating, Getting, Updating and Deleting reservations within the system.
    
    Accepts POST: Create Reservation, GET: See reservation, PUT: Update Reservation, DELETE: Delete Reservation.
    """
    
    
    permission_classes = [AllowAny]
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    # 
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


    States
    PENDING = 'PENDING'
    DENIED = 'DENIED'
    APPROVED = 'APPROVED'
    CANCELED = 'CANCELED'
    TERMINATED = 'TERMINATED'
    COMPLETED = 'COMPLETED'
    """

    # authentication stuff
    # cant make a reservation at an already existing place
    #  filter by states
    # right user does right stuff


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

            # guest validation
            
            if request.user != guest:
                return Response({'error': 'You must be authenticated as the guest account.'}, status=403)

        
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

        # check if reservation already exists for this guest and property
        existing_reservation = Reservation.objects.filter(guest=guest, property=property).first()
        if existing_reservation:
            return Response({'error': 'Reservation by this guest already exists for this property'}, status=400)

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
        reservation_id: Num
        all: Bool
        username: account username
        user_type: guest or host

        If all is true, ignores reservation_id.
        user may input username and user_type to narrow down the search.
        In addition the user can also filter by state
        
        Example request:
        {
            "reservation_id": "5",
            "all": true,
            "username": "Ifaz",
            "user_type": "guest" 
        }

        if reservation_id is not given then 
        """

        reservation_id = request.data.get('reservation_id')
        all_field = request.data.get('all')

        username = request.data.get('username')
        user_type = request.data.get('user_type')
        state = request.data.get('state')
        if state:
            state = state.upper()

        if all_field is not None and not isinstance(all_field, bool):
            return Response({'error': 'all field all must be either true or false'}, status=400)
        
        # Filter by state if given
        reservations = Reservation.objects.all()
        states =  [choice[0] for choice in Reservation.State.choices]
        if state is not None:
            if state not in states:
                return Response({'error': f'{state} is not a valid state. must be one of {states}'}, status=400)
            else:
                reservations = reservations.filter(state=state)

        if all_field is True:
            if username is None:
                # all other fields are ignored
                page = self.paginate_queryset(reservations)
                if page is not None:
                    return Response(ReservationSerializer(page, many=True).data, status=200)
                else:
                    return Response(ReservationSerializer(reservations, many=True).data, status=200)
            else:
                if request.user.username != username:
                    return Response({'error': 'You must be authenticated to see the reservations belonging to this user'}, status=400)

                if user_type == 'guest':
                    page = self.paginate_queryset(reservations.filter(guest__username=username))
                    if page is not None:
                        return Response(ReservationSerializer(page, many=True).data, status=200)
                    else:
                        return Response(ReservationSerializer(reservations.filter(guest__username=username), many=True).data, status=200)

                # If user_type is host, filter by host username
                elif user_type == 'host':
                    page = self.paginate_queryset(reservations.filter(host__username=username))
                    if page is not None:
                        return Response(ReservationSerializer(page, many=True).data, status=200)
                    else:
                        return Response(ReservationSerializer(reservations.filter(host__username=username), many=True).data, status=200)
                # If user_type is not given, return all reservations
                else:
                    page = self.paginate_queryset(reservations.filter(Q(guest__username=username) | Q(host__username=username)))
                    if page is not None:
                        return Response(ReservationSerializer(page, many=True).data, status=200)
                    else:
                        return Response(ReservationSerializer(reservations, many=True).data, status=200)

        # search by reservation id
        if reservation_id is None:
            return Response({'error': 'All was false, so reservation_id is required'}, status=400)
        else:
            reservation = Reservation.objects.filter(id=reservation_id).first()
            if reservation is None:
                return Response({'error': 'Reservation with given id does not exist'}, status=400)
            
            # check if current user is allowed to access this reservation_id
            if not (reservation.guest == request.user or reservation.host == request.user):
                return Response({'error': 'Reservation with this id exists but you do not have permission to view it. You must be authenticated as the guest for this reservation.'}, status=400)

            return Response(ReservationSerializer(reservation).data, status=200)
        
    def put(self, request):
        """
        Update the reservation with the given reservation_id

        Mandatory fields: reservation_id
        
        Optional:
        - State: check model
        - paid: boolean
        - start_date: string in the form MM-DD-YYYY
        _ end_date: string in the form MM-DD-YYYY

        Sample PUT Json data:
        {
            "reservation_id" : "1",
            "state" : "approved",
            "paid" : true
        }
        """
        # PENDING = 'PENDING'
        # DENIED = 'DENIED'
        # APPROVED = 'APPROVED'
        # CANCELED = 'CANCELED'
        # TERMINATED = 'TERMINATED'
        # COMPLETED = 'COMPLETED'
        
        
        """
        User permissions:
        User is allowed to set status to 
            'CANCELLED'
            'COMPLETED'
        

        Host is allowed to set status to:
            DENIED iff currently PENDING
            TERMINATED iff currently approved

        """ 
        if not request.user.is_authenticated:
            return Response({'error': 'You must be authenticated'}, status=400)


        reservation_id = request.data.get('reservation_id')

        if reservation_id is None:
            return Response({'error': 'reservation_id is required'}, status=400)
        
        # reservation_id was given. we now perform a filter operation
        reservation = Reservation.objects.filter(id=reservation_id).first()
        if reservation is None:
            return Response({'error': 'Reservation with given id does not exist'}, status=400)
        
        
        # Validate state field
        valid_states = [state[0].lower() for state in Reservation.State.choices]
        state = request.data.get('state')
        if state is not None:
            if state.lower() not in valid_states:
                return Response({'error': 'Invalid state given. must be one of pending, approved, denied, or terminated'}, status=400)
            else:
                # error
                if state.lower() in valid_states and request.user.username == reservation.guest.username and state.lower() == 'approved':
                    return Response({'error': 'You do not have permission to approve your own request.'}, status=400)
                reservation.state = state.upper()

        # Validate paid field
        paid = request.data.get('paid')

        if paid is not None:
            if paid is True or paid is False:
                if request.user == reservation.guest:
                    return Response({'error': 'You cannot edit the paid status of your own reservation.'}, status=400)
                reservation.paid = paid
            else:
                return Response({'error': 'the value for paid given is not a valid format. it must either be true or false'}, status=400)

        start = request.data.get('start_date')

        start_date = None
        if start:
            # Validate start date and attempt to convert it to datetime in format MM-DD-YYYY
            try:
                start_date = datetime.strptime(start, '%m-%d-%Y').date()
            except:
                return Response({'error': 'Invalid start date format. Expected format: MM-DD-YYYY'}, status=400)

        
        end = request.data.get('end_date')

        end_date = None
        if end:
            # Validate end date and attempt to convert it to datetime in format MM-DD-YYYY
            try:
                end_date = datetime.strptime(start, '%m-%d-%Y').date()
            except:
                return Response({'error': 'Invalid end date format. Expected format: MM-DD-YYYY'}, status=400)

        if start_date:
            reservation.start_date = start_date
        if end_date:
            reservation.end_date = end_date

        if not reservation.start_date <= reservation.end_date:
            return Response({'error': f'Invalid bounds on start date and end date: After the changes we have: Start: {reservation.start_date}, End: {reservation.end_date}'}, status=400)



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