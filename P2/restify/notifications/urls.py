from django.urls import path
from .views import sendNotification, ListNotifications, DeleteNotification, ListNotificationsUser

app_name = 'notifications'
urlpatterns = [
    # Want to specify the recipient of the notification
    path('send/', sendNotification, name='send'),
    # all notification of the currently authenticated user
    path('all/', ListNotifications, name='list-current'),
    path('<int:username>/all', ListNotificationsUser, name='list-user'),
    path('<int:notification_id>/delete/', DeleteNotification.as_view(), name='delete'),
]
