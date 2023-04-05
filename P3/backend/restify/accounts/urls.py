from django.urls import path
from .views import AccountViews, LoginView, AccountViewsGet


app_name = 'accounts'
urlpatterns = [
    path('user/', AccountViews.as_view(), name='user'), #POST: Create, #PUT: Update
    path('user/get/', AccountViewsGet.as_view(), name='user_get'), #POST: Get
    path('login/', LoginView.as_view(), name='login'),
]
