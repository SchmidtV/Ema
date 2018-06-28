import {Navigation} from "react-native-navigation";
import AuthScreen from "./src/screens/Auth/Auth";

//register screens
Navigation.registerComponent("ema.AuthScreen", () => AuthScreen);

//start app
Navigation.startSingleScreenApp({
    screen: {
        screen: "ema.AuthScreen",
        title: "Login"
    }
});