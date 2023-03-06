from django.db import models

# circular import???
from accounts.models import Account

from django.contrib.auth import get_user_model
# Account = get_user_model()

class Notification(models.Model):
    """A notification sent to a user"""
    SEEN_CHOICES = [
        (0, 'Unseen'),
        (1, 'Seen'),
    ]
    NOTIFICATION_TYPE_CHOICES = [
        ('new_reservation', 'New Reservation'),
        ('cancellation_request', 'Cancellation Request'),
        ('approved_reservation', 'Approved Reservation'),
        ('cancellation_approved', 'Cancellation Approved'),
    ]
    # # link the notification to the associated account
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='notifications')

    # track whether the notification has been seen or not (0 or 1)
    seen = models.IntegerField(choices=SEEN_CHOICES, default=0)

    # a link associated with the notification
    link = models.URLField(default="http://restify.com/notifications/test")

    # type of the notification
    notification_type = models.CharField(choices=NOTIFICATION_TYPE_CHOICES, max_length=50)