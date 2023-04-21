from django.db import models

# circular import???
from accounts.models import Account

from django.contrib.auth import get_user_model
# Account = get_user_model()
from rest_framework import serializers
from accounts.serializers import AccountSerializer

class Notification(models.Model):
    """A notification sent to a user"""
    SEEN_CHOICES = [
        (0, 'Unseen'),
        (1, 'Seen'),
    ]
    """
     Notification_type must be one of the following values:
        - "reservation_request"
        - "cancellation_request"
        - "reservation_approved"
        - "cancellation_approved"
        - "property_comment"
        - "approval_request"
        - "cancellation_request"
    """

    """
    As a host, I want to see notifications. I want to be notified when someone rates my property, posts a comment about my property, requests approval for making a reservation or cancellation.
    As a user, I want to see notifications. I want to be notified when my reservation is approved or canceled, or when the date of my approved reservations are about to come up.
    """
    NOTIFICATION_TYPE_CHOICES = [
        ('reservation_request', 'You have a Reservation Request'),
        ('cancellation_request', 'You have a Cancellation Request'),
        ('reservation_approved', 'Your Reservation Request was Approved'),
        ('cancellation_approved', 'Your Cancellation Request Approved'),
        ('property_comment', 'Someone left a comment on your property!'),
        ('test_notification', 'Test notification from Phase 2 of Restify!'),
        ('terminate', 'Someone terminated your reservation!'),
    ]
    # link the notification to the associated account
    recipient = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='notifications')

    # type of the notification
    notification_type = models.CharField(choices=NOTIFICATION_TYPE_CHOICES, max_length=50, default='test_notification')

    # track whether the notification has been seen or not (0 or 1)
    # 0 by default
    seen = models.IntegerField(choices=SEEN_CHOICES, default=0)

    # a link associated with the notification
    link = models.URLField(default="http://google.com/")

    # a message associated with the notification
    message = models.TextField(blank=True)


# specifies how to convert notification model instance to a JSON representation

class NotificationSerializer(serializers.ModelSerializer):
    recipient = AccountSerializer()
    notification_type = serializers.ChoiceField(choices=Notification.NOTIFICATION_TYPE_CHOICES, label='Get_notification_type_display')
    message = serializers.CharField()

    class Meta:
        model = Notification
        fields = ['pk', 'notification_type', 'seen', 'link', 'recipient', 'message']
