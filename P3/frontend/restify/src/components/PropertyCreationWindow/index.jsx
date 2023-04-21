{/*
Fields:

*/}
const SignupWindow = () => {
	const [newProperty, setNewProperty] = useState({
		address: "",
		name: "",
		owner: "",
		images: "",
		description: "",
		location: "",
		price_per_night: "",
        max_guests: "",
        bathrooms: "",
        bedrooms: "",
        backyard: "",
        pool: "",
        wifi: "",
        pets_allowed: ""
	});
	const [valid, setValid] = useState({
		//Add other amenity fields
        address: false,
		name: false,
		owner: false,
		images: false,
		description: false,
		location: false,
		price_per_night: false,
        max_guests: false,
        bathrooms: false,
        bedrooms: false,
        backyard: false,
        pool: false,
        wifi: false,
        pets_allowed: false
	});

    let navigate = useNavigate();

    const submitform = async (e) => {
        e.preventDefault();
        if(validateAll()) {
            console.log("valid");

            let formatted_body = {
                address: newProperty.address,
		        name: newProperty.name,
		        owner: newProperty.owner,
		        images: newProperty.images,
		        description: newProperty.description,
		        location: newProperty.location,
		        price_per_night: newProperty.price_per_night,
                max_guests: newProperty.max_guests,
                bathrooms: newProperty.bathrooms,
                bedrooms: newProperty.bedrooms,
                backyard: ,
                pool: "",
                wifi: "",
                pets_allowed: ""
            }
        //TODO: navigate to created gallery page
        }
    }