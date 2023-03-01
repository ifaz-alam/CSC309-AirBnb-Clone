from django.urls import path
from .views import AccountViews, LoginView


app_name = 'accounts'
urlpatterns = [
    path('user/', AccountViews.as_view(), name='user'), #POST: Create, #PUT: Update
    path('login/', LoginView.as_view(), name='login'),
]
