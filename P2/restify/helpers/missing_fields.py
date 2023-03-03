
def missing(data: dict[str: list[str]], required_fields: set) -> dict[str: list[str]]:
        """Determine if any of the required fields are missing, if so, return a dictionary with the missing fields

        Returns:
            dict[str: list[str]]: A dictionary from "missing_required_fields' to missing fields names.
        """
        missing = {'missing_required_fields': []}
        for field in required_fields:
            if field not in data:
                missing['missing_required_fields'] = missing['missing_required_fields'].append(
                    field)

        return missing
    
