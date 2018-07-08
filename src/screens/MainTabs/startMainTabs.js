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
        Icon.getImageSource("perm-identity", 30),
        Icon.getImageSource("menu", 30),

    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "Ema.FindPlaceScreen",
                    label: "Find Place",
                    title: "Find Place",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[7],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "Ema.SharePlaceScreen",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[7],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "Ema.HomeScreen",
                    label: "Home",
                    title: "Home",
                    icon: sources[2],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[7],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "Ema.MapScreen",
                    label: "Map",
                    title: "Map",
                    icon: sources[3],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[7],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "Ema.FilterScreen",
                    label: "Filter",
                    title: "Filter",
                    icon: sources[4],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[7],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "Ema.FavoritesScreen",
                    label: "Favorites",
                    title: "Favorites",
                    icon: sources[5],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[7],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "Ema.ProfileScreen",
                    label: "Profile",
                    title: "Profile",
                    icon: sources[6],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[7],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                }


            ],
            drawer: {
                left: {
                    screen: "Ema.SideDrawer"
                }
            }
        });
    });


};

export default startTabs;

