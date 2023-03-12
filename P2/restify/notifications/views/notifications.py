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
        - "new_reservation"
        - "cancellation_request"
        - "approved_reservation"
        - "cancellation_approved"
        By default it is "test_notification"

        The "link" field is optional and defaults to "https://www.google.com" if not provided.

        Payload format (JSON) POST:
        {   
            "username": "ifaz",
            "notification_type": "new_reservation",
            "link": "https://www.restify.com",
        }

        """

        username = request.data.get('username')
        if not username:
            return Response({'error': 'username field is required.'}, status=400)

        #  filter out the accounts
        account = Account.objects.filter(username=username).first()
        if not account:
            return Response({'error': 'Account with specified username not found.'}, status=404)

        payload = request.data
        link = payload.get('link', 'https://www.google.com')
        notification_type = payload.get('notification_type', "test_notification")

        if notification_type is not None and notification_type.lower() not in [choice[0] for choice in Notification.NOTIFICATION_TYPE_CHOICES]:
            return Response({'error': 'Invalid notification_type value.'}, status=400)

        notification = Notification.objects.create(recipient=account, link=link, notification_type=notification_type.lower())
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
            "all" : "true"
        }

        Get all notifications in the system
        {
            "all": "true",
        }

        """
        username = request.data.get('username')
        all_field = request.data.get('all')
        notification_id = request.data.get('notification_id')

        if not isinstance(all_field, bool):
            return Response({'error': 'all field all must be either true or false'}, status=400)
        
        if all_field is True:
            if username is None:
                # all other fields are ignored
                page = self.paginate_queryset(Notification.objects.all())
                if page is not None:
                    return Response(NotificationSerializer(page, many=True).data, status=200)
                else:  
                    return Response(NotificationSerializer(Notification.objects.all(), many=True).data, status=200)
                
            else:
                page = self.paginate_queryset(Notification.objects.filter(recipient__username=username))
                if page is not None:
                    return Response(NotificationSerializer(page, many=True).data, status=200)
                else:  
                    return Response(NotificationSerializer(Notification.objects.filter(recipient__username=username), many=True).data, status=200)
        else:
            # reservation_id was given. we now perform a filter operation
            notification = Notification.objects.filter(id=notification_id).first()
            if notification is None:
                return Response({'error': 'Notification with given notification_id does not exist or you have not provided a notification_id'}, status=400)

            else:
                # success
                return Response(NotificationSerializer(notification).data, status=200)
        
    def put(self, request):
        """
        Edit the notification with the given notification_id

        Mandatory field: notification_id

        Optional fields: 
        - notification_type
        - seen

        Payload format (JSON) PUT:
        {
            "notification_id": 1,
            "notification_type": "new_reservation"
        }
        """
        notification_id = request.data.get('notification_id')
        if notification_id is None:
            return Response({'error': 'notification_id is required'}, status=400)

        # notification_id was given. we now perform a filter operation
        notification = Notification.objects.filter(id=notification_id).first()
        if notification is None:
            return Response({'error': 'Notification with given id does not exist'}, status=400)

        # Update the notification type if it was included in the request
        notification_type = request.data.get('notification_type')
        if notification_type is not None:
            if notification_type.lower() not in [choice[0] for choice in Notification.NOTIFICATION_TYPE_CHOICES]:
                return Response({'error': 'Invalid notification_type value.'}, status=400)
            notification.notification_type = notification_type.lower()

        seen = request.data.get('seen')
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
        
        if notification_id is None:
            return Response({'error': 'notification_id is required'}, status=400)
        
        # notification_id was given. we now perform a filter operation
        notification = Notification.objects.filter(id=notification_id).first()
        if notification is None:
            return Response({'error': 'Notification with given id does not exist'}, status=400)

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

