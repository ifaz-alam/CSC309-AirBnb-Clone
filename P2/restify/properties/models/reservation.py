from django.db import models
from accounts.models import Account

class Reservation(models.Model):
    owner = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='properties')
    guest = models.ForeignKey(Account, on_delete=models.SET_NULL, related_name='guest_reservations')
    host = models.ForeignKey(Account, on_delete=models.SET_NULL, related_name='host_reservations')