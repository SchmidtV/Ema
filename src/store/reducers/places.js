import {ADD_PLACE, DELETE_PLACE, ADD_PLACES_TO_DISPLAY_ON_MAP, ADD_CURRENT_LOCATION} from "../actions/actionTypes"

const initialState = {
  places: [],
  placesArray: [],
  baseUrl: "http://pc18.beuth-hochschule.de/php/Stud/Rudi/"

};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random().toString(),
          name: action.placeName,
          image: {
            uri: "https://scontent.ftxl2-1.fna.fbcdn.net/v/t1.0-9/20882552_511468385856826_2094245809844683982_n.jpg?_nc_cat=0&oh=fd8c5662345ce4f2d088e05559901351&oe=5BB0017B"
          }
        }),
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter((place) => {
          return place.key !== action.placeKey;
        })
      };
    case ADD_PLACES_TO_DISPLAY_ON_MAP:
    return {
      ...state,
      placesArray: action.placesArray
    };
    case ADD_CURRENT_LOCATION:
    return {
      ...state,
      curLocation: action.curLocation
    };
    default:
      return state;
  }
};
export default reducer;