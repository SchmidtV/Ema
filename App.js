import {Navigation} from "react-native-navigation";
import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlaceTab";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import HomeScreen from "./src/screens/HomeTab/HomeTab";
import MapScreen from "./src/screens/MapTab/MapTab";
import FilterScreen from "./src/screens/FilterTab/FilterTab";
import FavoritesScreen from "./src/screens/FavoritesTab/FavoritesTab";
import ProfileScreen from "./src/screens/ProfileTab/ProfileTab";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";

import {Provider} from "react-redux";
import configureStore from "./src/store/configureStore";

const store = configureStore();

//register screens
Navigation.registerComponent("Ema.AuthScreen", () => AuthScreen, store, Provider);
// Navigation.registerComponent("Ema.SharePlaceScreen", () => SharePlaceScreen, store, Provider );
// Navigation.registerComponent("Ema.FindPlaceScreen", () => FindPlaceScreen, store, Provider );
Navigation.registerComponent("Ema.HomeScreen", () => HomeScreen, store, Provider );
Navigation.registerComponent("Ema.MapScreen", () => MapScreen, store, Provider );
Navigation.registerComponent("Ema.FilterScreen", () => FilterScreen, store, Provider );
Navigation.registerComponent("Ema.FavoritesScreen", () => FavoritesScreen, store, Provider );
Navigation.registerComponent("Ema.ProfileScreen", () => ProfileScreen, store, Provider );
Navigation.registerComponent("Ema.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent("Ema.SideDrawer", () => SideDrawer, store, Provider);

//start app
// Navigation.startSingleScreenApp({
//     screen: {
//         screen: "Ema.HomeScreen",
//         title: "Home"
//     }
// });

Navigation.startSingleScreenApp({
    screen: {
        screen: "Ema.AuthScreen",
        title: "Login"
    }
});
