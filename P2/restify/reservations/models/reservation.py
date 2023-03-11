from django.db import models



from accounts.models import Account

from django.contrib.auth import get_user_model
# Account = get_user_model()
from rest_framework import serializers

class Reservation(models.Model):
    class State(models.TextChoices):
        PENDING = 'PENDING'
        APPROVED = 'APPROVED'
        DENIED = 'DENIED'
        TERMINATED = 'TERMINATED'

    state = models.CharField(choices=State.choices, default=State.PENDING)
    paid = models.BooleanField(default=False)
    # month-day-year
    start_date = models.DateField()
    # month-day-year
    end_date = models.DateField()
    guest = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='guest_reservations')
    host = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='host_reservations')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='property_reservations')


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'state', 'paid', 'start_date', 'end_date', 'guest', 'host', 'property']