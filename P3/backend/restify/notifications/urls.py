from django.urls import path
from .views import NotificationViews, NotificationViewsGet

app_name = 'notifications'
urlpatterns = [
     # We send requests on this base url
    path('', NotificationViews.as_view({'post': 'post', 'get': 'get', 'delete': 'delete', 'put': 'put'}), name='notification'),
    path('get/', NotificationViewsGet.as_view({'post': 'post'}), name='notification_get'), # POST: Get info for notif
]