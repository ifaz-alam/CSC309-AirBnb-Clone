import React, { useEffect, useState } from "react";
import ProfileProperty from "../ProfileProperty";
import ProfilePropertyAccepted from "../ProfilePropertyAccepted";
import ProfilePropertyAcceptedToOthers from "../ProfilePropertyAcceptedToOthers";

const ProfileAcceptedToOthers = (props) => {
  const { properties, reservations } = props;

  const [images, setImages] = useState([]);

  // Loop through each property in the properties array and return a ProfileProperty component
  return (
    <>
      {properties ? (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <h1 className="text-center">
                        Accepted Requests To Others' Properties
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    {reservations?.map((reservation, index) => (
                      <div className="col-12 col-md-4 mt-4" key={index}>
                        <ProfilePropertyAcceptedToOthers
                          property={reservation.property}
                          picture={reservation.property.images.image}
                          reservation={reservation}
                          owner={reservation.host.username}
                          state={reservation.state}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <h1 className="text-center">Accepted Stays TODO</h1>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center align-items-center">
                    No Properties
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileAcceptedToOthers;
