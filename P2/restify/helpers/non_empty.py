def nonEmpty(data: dict[str: list[str]], non_empty_fields: set) -> dict[str: list[str]]:
    """Determine if any of the required fields are empty, if so, return a dictionary with the missing fields

    Returns:
        dict[str: list[str]]: A dictionary from "empty_fields' to empty field names.
        
    """
    
    empty = {'empty_fields': []}
    for field in non_empty_fields:
            if data[field] == None or data[field] == '':
                empty['empty_fields'].append(field)

    return empty