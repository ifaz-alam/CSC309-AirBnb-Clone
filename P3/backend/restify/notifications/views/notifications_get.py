from notifications.models import Notification, NotificationSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import viewsets
from accounts.models import Account
from rest_framework.permissions import AllowAny


class NotificationAPIView(APIView):

    def get(self, request):
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
            message = f'{request.user.username} sent you a cancellation request.'
        elif notification_type == 'reservation_approved':
            message = f'Your reservation request was approved by {request.user.username}.'
        elif notification_type == 'cancellation_approved':
            message = f'Your cancellation request was approved by {request.user.username}.'
        elif notification_type == 'property_comment':
            message = f'Someone left a comment on your property.'
        else:
            message = 'Test notification from Phase 2 of Restify!'

        notification = Notification.objects.create(recipient=account, link=link, notification_type=notification_type.lower(), message=message)
        notification.save()
        return Response(NotificationSerializer(notification).data, status=200)
