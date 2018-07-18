import {ADD_PLACE, DELETE_PLACE, ADD_PLACES_TO_DISPLAY_ON_MAP, ADD_CURRENT_LOCATION} from "./actionTypes";

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
