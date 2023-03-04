from helpers import nonEmpty, missing
from rest_framework.response import Response
from ..serializers import AccountSerializer
from ..models import Account


def getAccount(request):
    """Get an account (or all) from the system.

    ### Fields:
    "pk" : account_id
    
    "all" : boolean
    
    * if all is true, ignores pk
    
    Example request:
    {
        "pk": "5",
        "all": "false"
    }
    """
    data = request.data
    required_fields = {'pk', 'all'}
    
    errors = {}
    
    missing_fields = missing(data, required_fields)
    empty_fields = nonEmpty(data, required_fields)
    
    if len(empty_fields['empty_fields']) != 0:
        errors = errors | empty_fields

    if len(missing_fields['missing_required_fields']) != 0:
        errors = errors | missing_fields
    
    if len(errors) != 0:
        return Response(errors, status=400)
    
    if data['all'] == 'true':
        return Response(AccountSerializer(Account.objects.all(), many=True).data, status=200)
    
    else:
        try:
            user = Account.objects.get(pk=data['pk'])
            return Response(AccountSerializer(user).data, status=200)
        except:
            return Response({'error': 'Account does not exist'}, status=404)