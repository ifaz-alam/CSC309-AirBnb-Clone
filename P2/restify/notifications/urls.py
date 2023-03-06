from django.urls import path
from .views import sendNotification

app_name = 'notifications'
urlpatterns = [
    path('send/', sendNotification.as_view(), name='send')
]
