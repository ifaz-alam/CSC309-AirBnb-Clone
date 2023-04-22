import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import {
    validateAddress,
    validateName,
    validateOwner,
    validateDescription,
    validateLocation,
    validatePrice_per_night,
    validateMax_guests,
    validateBathrooms,
    validateBedrooms,
    validateBackyard,
    validatePool,
    validateWifi,
    validateKitchen,
    validateFree_parking,
    validatePets_allowed
} from "../../helpers/PropertyValidation"
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const PropertyCreationWindow = () => {
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
        kitchen: "",
        free_parking: "",
        pets_allowed: ""
	});
	const [valid, setValid] = useState({
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
        kitchen: false,
        free_parking: false,
        pets_allowed: false
	});

    let navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        if(validateAll()) {
            console.log("valid");

            let formatted_body = {
                address: newProperty.address,
		        prop_name: newProperty.name,
		        owner: newProperty.owner,
		        images: newProperty.images,
		        description: newProperty.description,
		        location: newProperty.location,
		        price_per_night: newProperty.price_per_night,
                max_guests: newProperty.max_guests,
                bathrooms: newProperty.bathrooms,
                bedrooms: newProperty.bedrooms,
                backyard: newProperty.backyard,
                pool: newProperty.pool,
                wifi: newProperty.wifi,
                kitchen: newProperty.kitchen,
                free_parking: newProperty.free_parking, 
                pets_allowed: newProperty.pets_allowed
            };
        //TODO: navigate to created gallery page
        
        try{
            let APIURL = "http://localhost:8000";
            const response = await fetch(`${APIURL}/properties/property`, {
                method: "POST",
                
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "",
                    },
                body: JSON.stringify(formatted_body),
            });

            const data = await response.json();

            if (response.status !== 200){
                throw new Error(data);
            }
            //TODO: navigate to the gallery of the created property
            //navigate(`/properties/gallery/${data.pk}`);
            } catch(error) {
                console.log("error with request in creating a property");
            }
        } else {
            console.log("invalid");
        }
    };
    
    const validateAll = () => {
        if (
            validateAddress(newProperty.address) &&
            validateName(newProperty.name) &&
            validateOwner(newProperty.owner) &&
            validateDescription(newProperty.description) &&
            validateLocation(newProperty.location) &&
            validatePrice_per_night(newProperty.price_per_night) &&
            validateMax_guests(newProperty.max_guests) &&
            validateBathrooms(newProperty.bathrooms) &&
            validateBedrooms(newProperty.bedrooms) &&
            validateBackyard(newProperty.backyard) &&
            validatePool(newProperty.pool) &&
            validateWifi(newProperty.wifi) &&
            validateKitchen(newProperty.kitchen) &&
            validateFree_parking(newProperty.free_parking) &&
            validatePets_allowed(newProperty.pets_allowed)
        ) {
            return true;
        } else{
            return false;
        }
    };
    const updateAddress = (value) => {
		setNewProperty({ ...newProperty, address: value });
		setValid({
			...valid,
			address: validateAddress(address) ? true : false,
		});
	};
    const updateName = (value) => {
		setNewProperty({ ...newProperty, name: value });
		setValid({
			...valid,
			name: validateName(prop_name) ? true : false,
		});
	};
    const updateOwner = (value) => {
		setNewProperty({ ...newProperty, owner: value });
		setValid({
			...valid,
			owner: validateOwner(owner) ? true : false,
		});
	};
    const updateDescription = (value) => {
		setNewProperty({ ...newProperty, description: value });
		setValid({
			...valid,
			description: validateDescription(description) ? true : false,
		});
	};
    const updateLocation = (value) => {
		setNewProperty({ ...newProperty, location: value });
		setValid({
			...valid,
			location: validateLocation(location) ? true : false,
		});
	};
    const updatePrice_per_night = (value) => {
		setNewProperty({ ...newProperty, price_per_night: value });
		setValid({
			...valid,
			price_per_night: validatePrice_per_night(price_per_night) ? true : false,
		});
	};
    const updateMax_guests = (value) => {
		setNewProperty({ ...newProperty, max_guests: value });
		setValid({
			...valid,
			max_guests: validateMax_guests(max_guests) ? true : false,
		});
	};
    const updateBathrooms = (value) => {
		setNewProperty({ ...newProperty, bathrooms: value });
		setValid({
			...valid,
			bathrooms: validateBathrooms(bathrooms) ? true : false,
		});
	};
    const updateBedrooms = (value) => {
		setNewProperty({ ...newProperty, bedrooms: value });
		setValid({
			...valid,
			bedrooms: validateBedrooms(bedrooms) ? true : false,
		});
	};
    const updateBackyard = (value) => {
		setNewProperty({ ...newProperty, backyard: value });
		setValid({
			...valid,
			address: validateBackyard(backyard) ? true : false,
		});
	};
    const updatePool = (value) => {
		setNewProperty({ ...newProperty, pool: value });
		setValid({
			...valid,
			pool: validatePool(pool) ? true : false,
		});
	};
    const updateWifi = (value) => {
		setNewProperty({ ...newProperty, wifi: value });
		setValid({
			...valid,
			wifi: validateWifi(wifi) ? true : false,
		});
	};
    const updateKitchen = (value) => {
		setNewProperty({ ...newProperty, kitchen: value });
		setValid({
			...valid,
			kitchen: validateKitchen(kitchen) ? true : false,
		});
	};
    const updateFree_parking = (value) => {
		setNewProperty({ ...newProperty, free_parking: value });
		setValid({
			...valid,
			free_parking: validateKitchen(free_parking) ? true : false,
		});
	};
    const updatePets_allowed = (value) => {
		setNewProperty({ ...newProperty, pets_allowed: value });
		setValid({
			...valid,
			pets_allowed: validatePets_allowed(pets_allowed) ? true : false,
		});
	};
  
	return (
		<>
			<div className="container d-flex flex-column justify-content-center h-100">
				<div className="row d-flex justify-content-center">
					<div className="card w-75 mb-3 mt-3 primary-card-color">
						<div className="card-body">
							<h2 className="card-title text-center mb-3">
								Create a{" "}
								<span className="primary-bold-color">
									Restify
								</span>{" "}
								Property!
							</h2>
							<form
								className="row needs-validation"
								action="/register"
								method="POST"
								novalidate
							>
								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="address"
										className="form-label text-center w-100"
									>
										Address
									</label>
									<input
										type="text"
										className="form-control"
										id="address"
										name="property[address]"
										required
										autofocus
										onChange={(e) =>
											updateAddress(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.address === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid address{" "}
										</div>
									)}
								</div>

								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="name"
										className="form-label text-center w-100"
									>
										Property Name
									</label>
									<input
										type="text"
										className="form-control"
										id="name"
										name="property[name]"
										required
										autofocus
										onChange={(e) =>
											updateName(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.name === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid property name{" "}
										</div>
									)}
								</div>
								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="owner"
										className="form-label text-center w-100"
									>
										Owner
									</label>
									<input
										type="text"
										className="form-control"
										id="owner"
										name="property[owner]"
										maxlength="19"
										required
										onChange={(e) =>
											updateOwner(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.owner === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid owner pk{" "}
										</div>
									)}
								</div>
								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="description"
										className="form-label text-center w-100"
									>
										Property description
									</label>
									<input
										type="text"
										className="form-control"
										id="description"
										name="property[description]"
										maxlength="19"
										required
										onChange={(e) =>
											updateDescription(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.description === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid property description{" "}
										</div>
									)}
								</div>
								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="location"
										className="form-label text-center w-100"
									>
										Location
									</label>
									<input
										type="text"
										className="form-control"
										id="location"
										name="property[location]"
										maxlength="200"
										required
										onChange={(e) =>
											updateLocation(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.last === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid Location{" "}
										</div>
									)}
								</div>
								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="price_per_night"
										className="form-label text-center w-100"
									>
										Price per night
									</label>
									<input
										type="text"
										className="form-control"
										id="price_per_night"
										name="property[price_per_night]"
										maxlength="10"
										required
										onChange={(e) =>
											updatePrice_per_night(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.price_per_night === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid price per night{" "}
										</div>
									)}
								</div>
								<div className="col-md-10 offset-md-1 mb-3">
									<label
										for="max_guests"
										className="form-label text-center w-100"
									>
										Max guests
									</label>
									<input
										type="text"
										className="form-control"
										id="max_guests"
										name="property[max_guests]"
										maxlength="10"
										required
										onChange={(e) =>
											updateMax_guests(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.max_guests === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid number of max guests{" "}
										</div>
									)}
								</div>
                                <div className="col-md-10 offset-md-1 mb-3">
									<label
										for="bathrooms"
										className="form-label text-center w-100"
									>
										Bathrooms
									</label>
									<input
										type="text"
										className="form-control"
										id="bathrooms"
										name="property[bathrooms]"
										maxlength="10"
										required
										onChange={(e) =>
											updateBathrooms(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.bathrooms === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid number of bathrooms{" "}
										</div>
									)}
								</div>
                                <div className="col-md-10 offset-md-1 mb-3">
									<label
										for="bedrooms"
										className="form-label text-center w-100"
									>
										Bedrooms
									</label>
									<input
										type="text"
										className="form-control"
										id="bedrooms"
										name="property[bedrooms]"
										maxlength="10"
										required
										onChange={(e) =>
											updateBedrooms(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.bedrooms === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please enter a valid number of bedrooms{" "}
										</div>
									)}
								</div>
                                <div className="col-md-10 offset-md-1 mb-3">
									<label
										for="backyard"
										className="form-label text-center w-100"
									>
										Backyard ?
									</label>
									<input
										type="text"
										className="form-control"
										id="backyard"
										name="property[backyard]"
										maxlength="10"
										required
										onChange={(e) =>
											updateBackyard(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.backyard === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please indicate whether the property has a backyard{" "}
										</div>
									)}
								</div>
                                <div className="col-md-10 offset-md-1 mb-3">
									<label
										for="pool"
										className="form-label text-center w-100"
									>
										Pool?
									</label>
									<input
										type="text"
										className="form-control"
										id="pool"
										name="property[pool]"
										maxlength="10"
										required
										onChange={(e) =>
											updatePool(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.pool === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please indicate whether or not the property has a pool{" "}
										</div>
									)}
								</div>
                                <div className="col-md-10 offset-md-1 mb-3">
									<label
										for="wifi"
										className="form-label text-center w-100"
									>
										Wifi?
									</label>
									<input
										type="text"
										className="form-control"
										id="wifi"
										name="property[wifi]"
										maxlength="10"
										required
										onChange={(e) =>
											updateWifi(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.wifi === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please indicate if the property has wifi{" "}
										</div>
									)}
								</div>
                                <div className="col-md-10 offset-md-1 mb-3">
									<label
										for="kitchen"
										className="form-label text-center w-100"
									>
										Kitchen?
									</label>
									<input
										type="text"
										className="form-control"
										id="kitchen"
										name="property[kitchen]"
										maxlength="10"
										required
										onChange={(e) =>
											updateKitchen(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.kitchen === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please indicate whether or not the property has a kitchen{" "}
										</div>
									)}
								</div>
                                <div className="col-md-10 offset-md-1 mb-3">
									<label
										for="free_parking"
										className="form-label text-center w-100"
									>
										Free Parking?
									</label>
									<input
										type="text"
										className="form-control"
										id="free_parking"
										name="property[free_parking]"
										maxlength="10"
										required
										onChange={(e) =>
											updateFree_parking(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.free_parking === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please indicate whether the property has free parking{" "}
										</div>
									)}
								</div>
                                <div className="col-md-10 offset-md-1 mb-3">
									<label
										for="pets_allowed"
										className="form-label text-center w-100"
									>
										Pets Allowed?
									</label>
									<input
										type="text"
										className="form-control"
										id="pets_allowed"
										name="property[pets_allowed]"
										maxlength="10"
										required
										onChange={(e) =>
											updatePets_allowed(e.target.value)
										}
									/>
								</div>
								<div className="col-md-10 offset-md-1 mb-3 email-feedback d-flex justify-content-center">
									{valid.pets_allowed === true ? (
										<div className="good-feedback">
											{" "}
											Looks Good{" "}
										</div>
									) : (
										<div className="bad-feedback">
											{" "}
											Please indicate whether the property allows pets{" "}
										</div>
									)}
								</div>
                                
								<div className="col-10 offset-1 mt-4">
									<button
										className="btn w-100 submit-button button-color"
										onClick={(e) => {
											submitForm(e);
										}}
									>
										Create Account
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PropertyCreationWindow;



