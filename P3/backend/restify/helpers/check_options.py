def check_optional_fields(request, params):
    """helper function that checks if the optional field 
    has been filled. 
    returns a dictionary where the key is the field and the value is the submitted value fo the field, 
    defaults to False if it was no supplied.
    """
    r ={}
    for param in params:
        try:
            val = request.data[param]
            r[param] = eval(val.capitalize())
        except KeyError:
            r[param] = False
            pass
    return r