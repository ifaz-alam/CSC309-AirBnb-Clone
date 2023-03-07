from notifications.models import Notification, NotificationSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

def notifications(request):
    """View to get all notifications of the current authenticated user"""
    if not request.user.is_authenticated:
        return Response({"not_authenticated": "You must be logged in"}, status=403)

    # get all notifications associated with the current user
    notifications = Notification.objects.filter(account=request.user)

    # serialize the notifications
    serializer = NotificationSerializer(notifications, many=True)

    return JsonResponse(serializer.data, safe=False)