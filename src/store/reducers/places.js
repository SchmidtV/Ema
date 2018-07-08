import {ADD_PLACE, DELETE_PLACE} from "../actions/actionTypes"
const initialState = {
    places: []
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
        default:
            return state;
    }
};
export default reducer;