from django.db import models
from properties.models import Property

from datetime import date, timedelta
from accounts.serializers import AccountSerializer
from properties.serializers import PropertySerializer

from accounts.models import Account

from django.contrib.auth import get_user_model
# Account = get_user_model()
from rest_framework import serializers

class Reservation(models.Model):
    class State(models.TextChoices):
        PENDING = 'PENDING'
        DENIED = 'DENIED'
        APPROVED = 'APPROVED'
        CANCELED = 'CANCELED'
        TERMINATED = 'TERMINATED'
        COMPLETED = 'COMPLETED'






    state = models.CharField(choices=State.choices, default=State.PENDING, max_length=200)
    paid = models.BooleanField(default=False)
    start_date = models.DateField()
    end_date = models.DateField()
    guest = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='guest_reservations')
    host = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='host_reservations')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='reservations')

    # Property.objects.get()

class ReservationSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(format='%m-%d-%Y')
    end_date = serializers.DateField(format='%m-%d-%Y')
    guest = AccountSerializer()
    property = PropertySerializer()



    class Meta:
        model = Reservation
        fields = ['pk', 'state', 'paid', 'start_date', 'end_date', 'guest', 'property']