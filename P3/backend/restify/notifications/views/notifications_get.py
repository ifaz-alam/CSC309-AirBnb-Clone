from notifications.models import Notification, NotificationSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import viewsets
from accounts.models import Account
from rest_framework.permissions import AllowAny

class NotificationViewsGet(viewsets.ModelViewSet):
    """
    API Views for Creating, Getting, Updating, and Deleting Notifications within the system.
    """
    permission_classes = [AllowAny]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
    def post(self,request):
        """
        Get a notification from the system.

        Payload variables and their purposes:
        All is a required field. is is treated as a switch variable
        - all: True or False - whether or not you want to display all notifications in the system
        - username: the username of the account whose notifications we wish to filter.
        - notification_id: the id of the notification we want to look up
       
        Cases:
            When all is true notification_id is ignored

            All is true and username is valid: Retrieve all notifications belonging to the account with the specified username
            All is true and username is not given: Retrieve all notifications from the system
            All is true and username is invalid: Give an appropriate error

            When all is false notification_id is required.

        Payload variations:

        Get all notifications belonging to ifaz
        {
            "username": "ifaz",
            "all" : true
        }
        
        Get all notifications in the system
        {
            "all": true,
        }

        Get one notification from the system if it exists
        {
            "notification_id": 1
        }

        """
        username = request.data.get('username')
        all_field = request.data.get('all')
        notification_id = request.data.get('notification_id')

        if all_field and all_field is not True:
            return Response({'error': 'all field all must be true if you choose to use it as a field'}, status=400)
            
        if all_field is True:
            if username is None:
                # all other fields are ignored
                page = self.paginate_queryset(Notification.objects.all().order_by('-pk'))
                if page is not None:
                    return Response(NotificationSerializer(page, many=True).data, status=200)
                else:  
                    return Response(NotificationSerializer(Notification.objects.all(), many=True).data, status=200)
                
            else:
                # intended user or not
                if username != request.user.username:
                    if request.user.username == '':
                        return Response({'error': f'You have entered a valid username but you are not logged in'}, status=400)
                    else:
                        return Response({'error': f'You have entered a valid username but you are not not the right recipient (Your username is {request.user.username})'}, status=400)

                page = self.paginate_queryset(Notification.objects.filter(recipient__username=username).order_by('-pk'))
                if page is not None:
                    return Response(NotificationSerializer(page, many=True).data, status=200)
                else:  
                    return Response(NotificationSerializer(Notification.objects.filter(recipient__username=username), many=True).data, status=200)
        else:
            # notification_id was given. we now perform a filter operation
            notification = Notification.objects.filter(id=notification_id).first()
            if notification is None:
                return Response({'error': 'Notification with given notification_id does not exist or you have not provided a notification_id'}, status=400)

            else:
                if notification.recipient != request.user:
                    return Response({'error': 'You have entered a valid notification_id but you are not the intended recipient for it.'}, status=400)
                else:
                    # success
                    return Response(NotificationSerializer(notification).data, status=200)