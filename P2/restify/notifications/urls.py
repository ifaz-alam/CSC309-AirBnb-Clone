from django.urls import path
from .views import sendNotification

app_name = 'notifications'
urlpatterns = [
    # Want to specify the recipient of the notification
    path('send/', sendNotification, name='send'),
]
