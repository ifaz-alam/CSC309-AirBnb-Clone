import React, { useContext, useState } from "react";
import { useAPIContext } from "../../contexts/APIContext";
import { UserContext } from "../../contexts/UserContext";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Carousel } from 'react-bootstrap';

function ImageCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://c4.wallpaperflare.com/wallpaper/1005/371/721/architecture-building-design-house-wallpaper-preview.jpg"
          alt="Elon Musk's Private Resort"
        />
        <Carousel.Caption>
          <h3>Elon Musk's Private Resort</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://wallpaper.dog/large/5491269.jpg"
          alt="The Witch House"
        />
        <Carousel.Caption>
          <h3>The Witch House</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://wallpapercave.com/wp/wp4031430.jpg"
          alt="Steve's Kingdom"
        />
        <Carousel.Caption>
          <h3>Steve's Kingdom</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}



const HomeTesting = () => {
	const { user, setUser } = useContext(UserContext); // Global authenticated user state
	return (
		<>
			<h1>Testing Window</h1>
			<p>Current user: {user.username}</p>
			<p>Current token: {user.Authorization}</p>
			<p>Local Storage, pk: {localStorage.getItem("pk")}</p>
			<p>Local Storage, auth: {localStorage.getItem("Authorization")}</p>
			
			<div className="main">
				<div id="landing-page-top">
					<div className="blur"></div>
					<div className="container-fluid d-flex justify-content-center min-vh-100">
						<div className="row align-items-center px-md-5">
						<div className="col-md-6 rounded text-white" style={{ 
							backdropFilter: 'blur(20px)', 
							boxShadow: '10px 10px 20px rgba(0,0,0,0.5)', 
							padding: '1.5rem' 
						}}>
								<h3>Unique stays, Experiences, Adventures, and more.</h3>
								<p className="text-secondary text-white">Discover a world of unique stays, unforgettable experiences, 
									and thrilling adventures on Restify. From cozy cottages to luxury villas, treehouses to yachts, 
									we have the perfect accommodation for every type of traveler. Join our community and book your next getaway today!</p>
								
								<a href="/accounts/signup"><button type="button" className="btn btn-primary font-weight-bold">Get Started</button></a>
							</div>
						<div className="col-md-6 px-md-5">
							<img src="https://blog-www.pods.com/wp-content/uploads/2021/04/resized_FI_Getty_Airbnb-host-welcoming-guests.jpg" className="img-fluid rounded" />
						</div>
						</div>
					</div>
				</div>
			
				<div id="landing-page-middle" className="banner">
					<div className="container-fluid d-flex justify-content-center text-left text-white">
						<div className="col-9">
							<h3>About us</h3>
							<p>At Restify, we connect travelers with unique and local accommodations around the world.
								Our mission is to provide an authentic travel experience and help our guests discover a sense of belonging in their destination.
								Join our community of hosts and guests and make your next getaway one to remember with Restify.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="landing-page-middle2" style={{backgroundImage: "url('https://images.unsplash.com/photo-1532024802178-20dbc87a312a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWluaW1hbCUyMGRhcmt8ZW58MHx8MHx8&w=1000&q=80')"}}>
				<div className="container-fluid text-white text-center">
					<div className="row align-items-center px-md-5">
						<div className="col-md-6">
							<h3>Many selections to choose from.</h3>
							<p className="text-secondary text-white text-center">Here are some of the things we have to offer!</p>
						</div>
						<div className="col-md-6" style={{padding:"1.5rem"}}>
							<ImageCarousel />
						</div>
						
					</div>
				</div>
			</div>
		</>
		

		
		
	);
};

export default HomeTesting;
