from django.urls import path
from .views import NotificationViews, NotificationAPIView

app_name = 'notifications'
urlpatterns = [
     # We send requests on this base url
    path('', NotificationViews.as_view({'post': 'post', 'get': 'get', 'delete': 'delete', 'put': 'put'}), name='notification'),
    path('get/', NotificationAPIView.as_view(), name='notification_get'), # POST: Get
]