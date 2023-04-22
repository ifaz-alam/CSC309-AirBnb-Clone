import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import ProfileCommentSection from "../../components/ProfileCommentSection";
import { sendNotification } from "../../helpers/notifications";

const Gallery=() => {
    const { propertypk } = useParams();
    const [property, setProperty] = useState({});
    const [booked, setBooked] = useState(false);
    const [text, setText] = useState("Booking..."); 
    let APIURL = "http://localhost:8000";

    // this happens when the component is mounted for the first time
    useEffect(() => {
        console.log(`I AM GONNA PRINT THE PROPERY STUFF REALLY QUICK ${JSON.stringify(property)}`)
        console.log(propertypk)
        async function fetchProfile() {
			let request = await fetch(`${APIURL}/properties/property/?pk=${propertypk}&all=false`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
            let response = await request.json();
            console.log(response)
            if (request.status !== 200){
                console.log("error!")
            }
            else{
                setProperty(response)
                console.log(property)
            }
        };
        fetchProfile();
    }, [])

    const getStars = (rating) => {
		

		if (rating === 0) {
			return (
				<>
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>
				</>
			);
		} else if (rating === 1) {
			return (
				<>
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>
				</>
			);
		} else if (rating === 2) {
			return (
				<>
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>
				</>
			);
		} else if (rating === 3) {
			return (
				<>
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star"></span>{" "}
					<span className="fa fa-star"></span>
				</>
			);
		} else if (rating === 4) {
			return (
				<>
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star"></span>
				</>
			);
		} else if (rating === 5) {
			return (
				<>
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>{" "}
					<span className="fa fa-star checked"></span>
				</>
			);
		}
	};

    const bookProperty = async () => {
        console.log(`My setbooked value is ${booked}`);
        let request = await fetch(`${APIURL}/reservations/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("Authorization"),
            },
            body: JSON.stringify(
                {
                    guest: localStorage.getItem("username"),
                    property_id: property.pk,
                    start_date: "10-10-2022",
                    end_date: "10-10-2022"
                }),
        })

        let response = await request.json();
        console.log(JSON.stringify(response));
        if (!request.ok) {
            if (!booked) { // Only update state if booked state is false
                setText("You have already booked this property!");
                setBooked(true);
            }
        } else {
            if (!booked) { // Only update state if booked state is false
                setText("Booked!");
                setBooked(true);
            }
        }

        console.log(`IM SENDING A NOTIFICATION SINCE IM RESERVING A REQUST`);
        sendNotification(property.owner.username,
            "reservation_request",
            `http://localhost:3000/accounts/profile/${property.owner.username}`
        );
    }

    const updateRating = (newRating) => {
		console.log("updating rating now")
        if (isNaN(newRating)) {
			newRating = 0;
		}
        console.log(newRating)
		setProperty({
			...property,
			rating: newRating,
		});
		console.log(property.rating);

		fetch(`${APIURL}/properties/property/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${localStorage.getItem("Authorization")}`,
			},
			body: JSON.stringify({
				...property,
                owner: property.owner.pk,
                images: property.images.pk,
				rating: newRating
			}),

		})
			.then((response) => {
                console.log("something testing 2 or something")
                return response.json()})

			.then((result) => {
				console.log("Success:", result);
                console.log("expected", newRating)
			});
	};
    return(<main>
        {Object.keys(property).length > 0 ?(<div><div className="carouselwrapper">
        {console.log(property)}
        <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={`${APIURL}${property.images.image}`}/>
              </div>
              <div className="carousel-item">
              <img src={`${APIURL}${property.images.image}`}/>
              </div>
              <div className="carousel-item">
              <img src={`${APIURL}${property.images.image}`}/>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
    </div>
    <div className="container-fluid">
        <div className="row">
            <h1 className="text-center mt-3 mb-3">
                {property.name}
            </h1>
        </div>
        <div className="row d-flex flex-row justify-content-center">
            <div className="col d-flex justify-content-center">
                <a href="./userpage.html">
                    <h3>{property.owner.username}</h3>
                </a>
                <div className="mt-2 ms-3">
                    {getStars(property.rating)}
                </div>
            </div>
        </div>
        <div className="row my-4">
            <div className="col-lg-3">
                <h4 className="text-center">Price Per Night</h4>
                <ul className="list-group">
                    <li
                        className="list-group-item d-flex justify-content-between"
                    >
                        All Year
                        <span className="fw-bold">{property.price_per_night}</span>
                    </li>
                </ul>
            </div>
            <div className="col-lg-6 mt-3 mt-lg-0">
                <p className="ps-md-5 pe-md-5">
                    {property.description}
                </p>
            </div>
            <div
                className="col-lg-3 mt-3 mt-lg-0 d-flex justify-content-center"
            >
                <div className="d-flex flex-column">
                    <h5 className="text-center mb-4">
                        Contact Information
                    </h5>
                    <h6 className="mb-2">
                        {property.owner.email}
                    </h6>
                    <h6 className="text-center mb-2">{property.owner.phone_number}</h6>
                    {booked ?
                        <button type="button" className="btn btn-secondary" >
                            {text}
                        </button>
                    :
                        <button type="button" className="btn button-color" onClick={async () => await bookProperty() }>
                            Book Now!
                        </button>
                    }
                    <a href="./edit-gallery.html" className="w-100">
                        <button type="button" className="btn btn-danger mt-3 w-100">
                            Edit Property
                        </button>
                    </a>
                    
                </div>
            </div>
        </div>
    </div>
    <div>
        <ProfileCommentSection ParentType="Property"
								ParentID={property.pk}
								updateRating={updateRating}>
        </ProfileCommentSection>
        
    </div>
    </div>):(<div>Property not Found</div>)}
    
</main>)}
export default Gallery;