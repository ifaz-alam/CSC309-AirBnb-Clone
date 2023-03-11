from django.db import models
from properties.models import Property

from datetime import date, timedelta

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

    state = models.CharField(choices=State.choices, default=State.PENDING, max_length=200)
    paid = models.BooleanField(default=False)
    # month-day-year default today
    start_date = models.DateField()
    # month-day-year default tomorrow
    end_date = models.DateField()
    guest = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='guest_reservations')
    host = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='host_reservations')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='reservations')

    # Property.objects.get()

class ReservationSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    guest = serializers.CharField(source='guest.username')
    host = serializers.CharField(source='host.username')
    property_description = serializers.CharField(source='property.description')

    reservation_id = serializers.IntegerField(source='id')
    property_id = serializers.IntegerField(source='property.id')
    guest_id = serializers.IntegerField(source='guest.id', read_only=True)
    host_id = serializers.IntegerField(source='host.id', read_only=True)



    class Meta:
        model = Reservation
        fields = ['reservation_id', 'property_id', 'property_description', 'state', 'paid', 'start_date', 'end_date', 'guest', 'guest_id', 'host', 'host_id']