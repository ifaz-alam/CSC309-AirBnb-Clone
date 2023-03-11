from notifications.models import Notification, NotificationSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from accounts.models import Account


@api_view(['GET'])
def ListNotifications(request):
    """View to get all notifications of the current authenticated user"""
    if not request.user.is_authenticated:
        return Response({"not_authenticated": "You must be logged in"}, status=403)

    # get all notifications associated with the current user
    notifications = Notification.objects.filter(account=request.user)

    # serialize the notifications
    serializer = NotificationSerializer(notifications, many=True)

    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def ListNotificationsUser(request):
    """View to get all notifications of the specified user"""
    
    username = request.data.get('username')
    if not username:
        return Response({'error': 'username field is required.'}, status=400)

    #  filter out the accounts
    account = Account.objects.filter(username=username).first()
    if not account:
        return Response({'error': 'Account not found.'}, status=404)

    # get all notifications associated with the current user
    notifications = Notification.objects.filter(account=request.user)

    # serialize the notifications
    serializer = NotificationSerializer(notifications, many=True)

    return JsonResponse(serializer.data, safe=False)

