from django.db import models
from accounts.models import Account

class Notification(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='notifications')
    # TODO MORE