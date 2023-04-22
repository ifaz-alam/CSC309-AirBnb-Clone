//TODO: validate images
const validateAddress = (address) => {
    if (address.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const validateName = (name) => {
    if (name.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const validateOwner = (owner) => {
    if (Number(owner) > 0) {
      return true;
    } else {
      return false;
    }
  };
  const validateDescription = (description) => {
    if (description.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const validateLocation = (location) => {
    if (location.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const validatePrice_per_night = (price_per_night) => {
    if (Number(price_per_night) > 0) {
      return true;
    } else {
      return false;
    }
  };
  const validateMax_guests = (max_guests) => {
    if (Number(max_guests) > 0) {
      return true;
    } else {
      return false;
    }
  };
  const validateBathrooms = (bathrooms) => {
    if (Number(bathrooms) > 0) {
      return true;
    } else {
      return false;
    }
  };
  const validateBedrooms = (bedrooms) => {
    if (Number(bedrooms) > 0) {
      return true;
    } else {
      return false;
    }
  };
  const validateBackyard = (backyard) => {
    if (backyard ==="true" || backyard ==="false") {
      return true;
    } else {
      return false;
    }
  };
  const validatePool = (pool) => {
    if (pool ==="true" || pool ==="false") {
      return true;
    } else {
      return false;
    }
  };
  const validateWifi = (wifi) => {
    if (wifi ==="true" || wifi ==="false") {
      return true;
    } else {
      return false;
    }
  };
  const validateKitchen = (kitchen) => {
    if (kitchen ==="true" || kitchen ==="false") {
      return true;
    } else {
      return false;
    }
  };
  const validateFree_parking = (free_parking) => {
    if (free_parking ==="true" || free_parking ==="false") {
      return true;
    } else {
      return false;
    }
  };
  const validatePets_allowed = (pets_allowed) => {
    if (pets_allowed ==="true" || pets_allowed ==="false") {
      return true;
    } else {
      return false;
    }
  };

module.exports = {
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
}