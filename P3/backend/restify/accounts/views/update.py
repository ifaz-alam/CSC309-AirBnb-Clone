from rest_framework.response import Response
from accounts.models import Account
from accounts.serializers import AccountSerializer
from helpers import missing, nonEmpty
from images.models import Image

def updateAccount(request):
    """Update the currently authenticted account

    ### Required fields:
    "username", "first_name", "last_name", "password_1", "password_2", "phone_number", "email", "biography",
    "guest_rating", "profile_pic"


    All fields except password_1, password_2, and profile_pic will be auto-filled out with current data.

    *If password_1 is empty, do not update the user's password.
    *If profile_pic is empty, do not update the user's profile picture


    ### Example post data.
    {
    "first_name": "Austin",
    "last_name": "Blackman",
    "email": "austin@mail.com",
    "username": "Austin",
    "password": "password",
    "phone_number": "555-555-5555",
    "biography": "bio",
    "guest_rating" : "0",
    "profile_picture" : "",
    "password_1": "",
    "password_2": ""
    }
    """
    
    if not request.user.is_authenticated:
        return Response({"not_authenticated" : "You must be logged in"}, status=403)
    
    required_fields = {"username", "first_name",
                        "last_name", "phone_number", "email", "password_1", "password_2", "biography", "guest_rating", "email", "profile_picture"}
    non_empty_fields = {"username", "first_name",
                        "last_name", "phone_number", "email"}

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
    currentUser.first_name = data['first_name']
    currentUser.last_name = data['last_name']
    currentUser.email = data['email']
    currentUser.biography = data['biography']
    currentUser.guest_rating = data['guest_rating']

    # Check if username or email is already in use
    if (request.user.username != data['username']):
        if Account.objects.filter(username=request.data['username']).exists() or Account.objects.filter(username=request.data['email']).exists():
            return Response({"error": 'Username or email already in use'}, status=400)
        else:
            currentUser.username = data['username']
            
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
    
    if data['profile_picture'] != '' and data['profile_picture'] != None and type(data['profile_picture']) != dict:
        try:
            image = Image.objects.get(pk=int(data['profile_picture']))
            currentUser.profile_picture = image
        except:
            return Response({'error': 'Image does not eixst'})

    currentUser.save()
    return Response(AccountSerializer(currentUser).data, status=200)


