from django.urls import path
from .views import ReservationViews

app_name = 'reservations'
urlpatterns = [
    # We send requests on this base url
    path('', ReservationViews.as_view(), name='reservation'),
]
