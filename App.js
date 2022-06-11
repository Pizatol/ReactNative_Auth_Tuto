import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from 'expo-app-loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContextProvider, { AuthContext } from "./store/auth-context";


import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import IconButton from "./components/ui/IconButton";



const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    const authCtx = useContext(AuthContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    headerRight: ({ tintColor }) => (
                        <IconButton
                            icon="exit"
                            size={24}
                            color={tintColor}
                            onPress={authCtx.logout}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function Navigation() {
    const authCtx = useContext(AuthContext);
    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <AuthenticatedStack />}
        </NavigationContainer>
    );
}

const Root = () => {
    const [istryLoading, setIsTryLoading] = useState(true)
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");

            if (storedToken) {
                authCtx.authenticate(storedToken);
            }
            setIsTryLoading(false)
        };
        fetchToken();
    }, []);

    if(istryLoading){
        return <AppLoading />
    }

    return <Navigation />;
};



export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <AuthContextProvider>
                <Root />
            </AuthContextProvider>
        </>
    );
}
