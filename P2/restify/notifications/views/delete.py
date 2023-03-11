from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from notifications.models import Notification

class DeleteNotification(APIView):
    """
    Delete a notification with the specified ID.

    Payload format (JSON):
    {
        id: 1
    }

    URL Parameters:
    - REQUIRED: id (integer): ID of the notification to delete.
    """
    def delete(self, request):
        id = request.data.get('id')
        if id is None:
            return Response({'error': 'Notification ID is required.'}, status=400)
        
        notification = Notification.objects.filter(id=id).first()
        if not notification:
            return Response({"error": 'notification with given id does not exist'}, status=400)
        else:
            notification.delete()
            return Response({'success': 'Notification deleted.'}, status=200)