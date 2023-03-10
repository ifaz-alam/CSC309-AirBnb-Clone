from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from accounts.models import Account
from notifications.models import Notification

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from accounts.models import Account
from notifications.models import Notification
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


@csrf_exempt
@api_view(['POST'])
def sendNotification(request):
    """
    Send a notification to a user with the specified username.

    Required Fields: username

    Payload format (JSON) POST:
    {   
        "username": "Ifaz",
        "notification_type": "new_reservation",
        "link": "https://www.google.com",
    }

    Notification_type must be one of the following values:
    - "new_reservation"
    - "cancellation_request"
    - "approved_reservation"
    - "cancellation_approved"
    By default it is "test_notification"

    The "link" field is optional and defaults to "https://www.google.com" if not provided.
    """
    username = request.data.get('username')
    if not username:
        return Response({'error': 'username field is required.'}, status=400)

    #  filter out the accounts
    account = Account.objects.filter(username=username).first()
    if not account:
        return Response({'error': 'Account not found.'}, status=404)

    payload = request.data
    link = payload.get('link', 'https://www.google.com')
    notification_type = payload.get('notification_type', None)

    if notification_type is not None and notification_type not in [choice[0] for choice in Notification.NOTIFICATION_TYPE_CHOICES]:
        return Response({'error': 'Invalid notification_type value.'}, status=status.HTTP_400_BAD_REQUEST)

    notification = Notification.objects.create(account=account, link=link, notification_type=notification_type)
    return Response({'success': 'Notification sent.'}, status=status.HTTP_200_OK)