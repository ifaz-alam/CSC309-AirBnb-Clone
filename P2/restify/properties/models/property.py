from django.db import models
from accounts.models import Account


class Property(models.Model):
    owner = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='properties')