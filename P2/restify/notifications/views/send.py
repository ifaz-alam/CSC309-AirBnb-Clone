from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from accounts.models import Account
from notifications.models import Notification

class sendNotification(APIView):
    """Add a new notification to an account within the system

    ### Required fields:
    "type", "link"
    
    ### Example post data:
    {
    "type": "new_reservation",
    "link": "http://restify.com/reservations/123"
    }
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, account_id):
        account = get_object_or_404(Account, id=account_id)
        
        # Create the notification object and set its attributes
        notification = Notification()
        notification.type = request.data.get('type', '')
        notification.link = request.data.get('link', '')
        notification.seen = False
        notification.save()

        # Add the notification to the account's notifications list
        account.notifications.add(notification)

        # # Serialize the notification and return it in the response
        # serializer = NotificationSerializer(notification)
        # return Response(serializer.data, status=201)
