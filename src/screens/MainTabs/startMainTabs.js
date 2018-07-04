import {Navigation} from "react-native-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";


const startTabs = () => {
    Promise.all([
        Icon.getImageSource("home", 30),
        Icon.getImageSource("home", 30),
        Icon.getImageSource("home", 30),
        Icon.getImageSource("location-on", 30),
        Icon.getImageSource("format-list-bulleted", 30),
        Icon.getImageSource("favorite-border", 30),
        Icon.getImageSource("perm-identity", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "Ema.FindPlaceScreen",
                    label: "Find Place",
                    title: "Find Place",
                    icon: sources[0]
                },
                {
                    screen: "Ema.SharePlaceScreen",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1]
                },
                {
                    screen: "Ema.HomeScreen",
                    label: "Home",
                    title: "Home",
                    icon: sources[2]
                },
                {
                    screen: "Ema.MapScreen",
                    label: "Map",
                    title: "Map",
                    icon: sources[3]
                },
                {
                    screen: "Ema.FilterScreen",
                    label: "Filter",
                    title: "Filter",
                    icon: sources[4]
                },
                {
                    screen: "Ema.FavoritesScreen",
                    label: "Favorites",
                    title: "Favorites",
                    icon: sources[5]
                },
                {
                    screen: "Ema.ProfileScreen",
                    label: "Profile",
                    title: "Profile",
                    icon: sources[6]
                }


            ]
        });
    });


};

export default startTabs;

