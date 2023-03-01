from rest_framework.response import Response
from ..models import Account, AccountSerializer
from ..helpers import missing, nonEmpty

def updateAccount(request):
    """Update the currently authenticted account

    ### Required fields:
    "username", "first_name", "last_name", "password", "phone_number", "email"


    All fields except password_1 and password_2 will be auto-filled out with current data.

    *If password_1 is empty, do not update the user's password.


    ### Example post data.
    {
    "first_name": "Austin",
    "last_name": "Blackman",
    "email": "austin@mail.com",
    "username": "Austin",
    "password": "password",
    "phone_number": "555-555-5555",
    "password_1": "",
    "password_2": ""
    }
    """
    
    if not request.user.is_authenticated:
        return Response({"not_authenticated" : "You must be logged in"}, status=403)
    
    required_fields = {"username", "first_name",
                        "last_name", "password", "phone_number", "email", "password_1", "password_2"}
    non_empty_fields = {"username", "first_name",
                        "last_name", "password", "phone_number", "email"}

    data = request.data

    # Check if required fields are missing or empty
    missing_fields = missing(data, required_fields)
    empty = nonEmpty(data, non_empty_fields)

    if len(missing_fields['missing_required_fields']) != 0 and len(empty['empty_fields']) != 0:
        return Response(missing_fields | empty, status=400)

    elif len(empty['empty_fields']) != 0:
        return Response(empty, status=400)

    elif len(missing_fields['missing_required_fields']) != 0:
        return Response(missing_fields, status=400)

    # Update non-password fields
    currentUser = request.user
    currentUser.username = data['username']
    currentUser.first_name = data['first_name']
    currentUser.last_name = data['last_name']
    currentUser.email = data['email']

    # Update password field if non-empty
    if data['password_1'] != '':
        errors = {}
        if data['password_1'] != data['password_2']:
            errors['passwords_do_not_match'] = [
                f'{data["password_1"]} does not equal {data["password_2"]}']

        if len(data['password_1']) < 8:
            errors['password_length_invalid'] = [
                f"{data['password_1']} is not long enough. Must be atleast length 8"]

        if len(errors) != 0:
            return Response(errors, status=400)
        else:
            Account.set_password(data['password_1'])

    return Response(AccountSerializer(currentUser).data, status=200)


