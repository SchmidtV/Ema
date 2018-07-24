import {ADD_PLACE, DELETE_PLACE, ADD_PLACES_TO_DISPLAY_ON_MAP, ADD_CURRENT_LOCATION, ADD_TOKEN, REMOVE_TOKEN, ADD_USERNAME, REMOVE_USERNAME} from "./actionTypes";

export const addPlace = (placeName) => {
  return {
    type: ADD_PLACE,
    placeName: placeName
  };
};
export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};
export const addPlacesToDisplayOnMap = (placesArray) => {
  return {
    type: ADD_PLACES_TO_DISPLAY_ON_MAP,
    placesArray: placesArray
  };
};

export const addCurrentLocation = (location) => {
  return {
    type: ADD_CURRENT_LOCATION,
    curLocation: location
  };
};

export const addToken = (token) => {
  return {
    type: ADD_TOKEN,
    token: token
  };
};
export const removeToken = () => {
  return {
    type: REMOVE_TOKEN
  };
};

export const addUsername = (username) => {
  return {
    type: ADD_USERNAME,
    username: username
  };
};

export const removeUsername = () => {
  return {
    type: REMOVE_USERNAME
  };
};

