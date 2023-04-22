from notifications.models import Notification, NotificationSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import viewsets
from accounts.models import Account
from rest_framework.permissions import AllowAny

class NotificationViews(viewsets.ModelViewSet):
    """
    API Views for Creating, Getting, Updating, and Deleting Notifications within the system.
    """
    permission_classes = [AllowAny]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def post(self, request):
        """
        Send a notification to a user with the specified username.

        Required Fields: username
        
        (notification_type and link  are optional and have default values)

        Notification_type must be one of the following values:
        - "reservation_request"
        - "cancellation_request"
        - "reservation_approved"
        - "cancellation_approved"
        - "property_comment"
        - "approval_request"
        - "cancellation_request"
        By default it is "test_notification"

        The "link" field is optional and defaults to "https://www.google.com" if not provided.

        Payload format (JSON) POST:
        {   
            "username": "ifaz",
            "notification_type": "new_reservation",
            "link": "https://www.restify.com",
        }

        """

        """
        As a host, I want to see notifications. I want to be notified when someone rates my property, posts a comment about my property, requests approval for making a reservation or cancellation.
        As a user, I want to see notifications. I want to be notified when my reservation is approved or canceled, or when the date of my approved reservations are about to come up.
        """
        # account exists. now do some checking
        if not request.user.is_authenticated:
            return Response({"error" : "You must be logged in"}, status=403)

        username = request.data.get('username')
        if not username:
            return Response({'error': 'username field is required.'}, status=400)

        #  filter out the accounts
        account = Account.objects.filter(username=username).first()
        if not account:
            return Response({'error': 'Account with specified username not found.'}, status=404)

        # Check if the user is sending the notification to themselves
        if username == request.user.username:
            return Response({'error': 'Cannot send notification to yourself.'}, status=400)

        payload = request.data
        link = payload.get('link', 'https://www.google.com')
        notification_type = payload.get('notification_type', "test_notification")

        if notification_type is not None and notification_type.lower() not in [choice[0] for choice in Notification.NOTIFICATION_TYPE_CHOICES]:
            valid_choices = ", ".join([choice[0] for choice in Notification.NOTIFICATION_TYPE_CHOICES])
            return Response({'error': f'Invalid notification_type value. Must be one of {valid_choices}'}, status=400)

        message = ''
        if notification_type == 'reservation_request':
            message = f'{request.user.username} sent you a reservation request.'
        elif notification_type == 'cancellation_request':
            message = f'{request.user.username} cancelled their reservation at your property!'
        elif notification_type == 'reservation_approved':
            message = f'Your reservation request was approved by {request.user.username}.'
        elif notification_type == 'cancellation_approved':
            message = f'Your cancellation request was approved by {request.user.username}.'
        elif notification_type == 'property_comment':
            message = f'{request.user.username} a comment on your property.'
        elif notification_type == 'profile_comment':
            message = f'{request.user.username} left a comment on your profile.'
        elif notification_type == 'terminate':
            message = f'{request.user.username} terminated your reservation!'
        elif notification_type == 'denied':
            message = f'{request.user.username} denied your reservation!'
        else:
            message = 'Test notification from Phase 2 of Restify!'

        notification = Notification.objects.create(recipient=account, link=link, notification_type=notification_type.lower(), message=message)
        notification.save()
        return Response(NotificationSerializer(notification).data, status=200)
    
    def get(self,request):
        """
        Get a notification from the system.

        Payload variables and their purposes:
        All is a required field. is is treated as a switch variable
        - all: True or False - whether or not you want to display all notifications in the system
        - username: the username of the account whose notifications we wish to filter.
        - notification_id: the id of the notification we want to look up
       
        Cases:
            When all is true notification_id is ignored

            All is true and username is valid: Retrieve all notifications belonging to the account with the specified username
            All is true and username is not given: Retrieve all notifications from the system
            All is true and username is invalid: Give an appropriate error

            When all is false notification_id is required.

        Payload variations:

        Get all notifications belonging to ifaz
        {
            "username": "ifaz",
            "all" : true
        }
        
        Get all notifications in the system
        {
            "all": true,
        }

        Get one notification from the system if it exists
        {
            "notification_id": 1
        }

        """
        username = request.data.get('username')
        all_field = request.data.get('all')
        notification_id = request.data.get('notification_id')

        if all_field and all_field is not True:
            return Response({'error': 'all field all must be true if you choose to use it as a field'}, status=400)
            
        if all_field is True:
            if username is None:
                # all other fields are ignored
                page = self.paginate_queryset(Notification.objects.all())
                if page is not None:
                    return Response(NotificationSerializer(page, many=True).data, status=200)
                else:  
                    return Response(NotificationSerializer(Notification.objects.all(), many=True).data, status=200)
                
            else:
                # intended user or not
                if username != request.user.username:
                    if request.user.username == '':
                        return Response({'error': f'You have entered a valid username but you are not logged in'}, status=400)
                    else:
                        return Response({'error': f'You have entered a valid username but you are not not the right recipient (Your username is {request.user.username})'}, status=400)

                page = self.paginate_queryset(Notification.objects.filter(recipient__username=username))
                if page is not None:
                    return Response(NotificationSerializer(page, many=True).data, status=200)
                else:  
                    return Response(NotificationSerializer(Notification.objects.filter(recipient__username=username), many=True).data, status=200)
        else:
            # notification_id was given. we now perform a filter operation
            notification = Notification.objects.filter(id=notification_id).first()
            if notification is None:
                return Response({'error': 'Notification with given notification_id does not exist or you have not provided a notification_id'}, status=400)

            else:
                if notification.recipient != request.user:
                    return Response({'error': 'You have entered a valid notification_id but you are not the intended recipient for it.'}, status=400)
                else:
                    # success
                    return Response(NotificationSerializer(notification).data, status=200)
        
    def put(self, request):
        """
        Edit the notification with the given notification_id

        Mandatory field: notification_id, seen

        Payload format (JSON) PUT:
        {
            "notification_id": 1,
            "seen": 1
        }
        """

        if not request.user.is_authenticated:
            return Response({'error': 'Must be logged in'}, status=400)


        notification_id = request.data.get('notification_id')
        if notification_id is None:
            return Response({'error': 'notification_id is required'}, status=400)

        # notification_id was given. we now perform a filter operation
        notification = Notification.objects.filter(id=notification_id).first()
        if notification is None:
            return Response({'error': 'Notification with given id does not exist'}, status=400)

        if request.user.username != notification.recipient.username:
            return Response({'error': 'This notification does not belong to you'}, status=400)


        seen = request.data.get('seen')

        if seen is None:
            return Response({'error': 'Must enter field seen which is 0 or 1'}, status=400)
            

        if seen is not None:
            if seen not in [choice[0] for choice in Notification.SEEN_CHOICES]:
                return Response({'error': 'Invalid seen value.'}, status=400)
            notification.seen = seen

        notification.save()
        return Response(NotificationSerializer(notification).data, status=200)

    def delete(self, request):
        """
        Delete the notification with the given notification_id

        Mandatory field: notification_id

        DELETE request format
        {
            "notification_id": "1"
        }
        """
        notification_id = request.data.get('notification_id')

        if not request.user.is_authenticated:
            return Response({'error': 'You are not logged in.'}, status=400)

        
        if notification_id is None:
            return Response({'error': 'notification_id is required'}, status=400)
        
        # notification_id was given. we now perform a filter operation
        notification = Notification.objects.filter(id=notification_id).first()
        if notification is None:
            return Response({'error': 'Notification with given id does not exist'}, status=400)

        if (notification.recipient.username != request.user.username):
            return Response({'error': 'This notification does not belong to you. You cannot delete it'}, status=400)

        notification.delete()
        
        # success
        return Response({'success': 'Notification deleted successfully'}, status=200)


# Legacy Code
# @api_view(['GET'])
# def ListNotifications(request):
#     """View to get all notifications of the current authenticated user"""
#     if not request.user.is_authenticated:
#         return Response({"not_authenticated": "You must be logged in"}, status=403)

#     # get all notifications associated with the current user
#     notifications = Notification.objects.filter(account=request.user)

#     # serialize the notifications
#     serializer = NotificationSerializer(notifications, many=True)

#     return JsonResponse(serializer.data, safe=False)

# @api_view(['GET'])
# def ListNotificationsUser(request):
#     """View to get all notifications of the specified user"""
    
#     username = request.data.get('username')
#     if not username:
#         return Response({'error': 'username field is required.'}, status=400)

#     #  filter out the accounts
#     account = Account.objects.filter(username=username).first()
#     if not account:
#         return Response({'error': 'Account not found.'}, status=404)

#     # get all notifications associated with the current user
#     notifications = Notification.objects.filter(account=request.user)

#     # serialize the notifications
#     serializer = NotificationSerializer(notifications, many=True)

#     return JsonResponse(serializer.data, safe=False)

