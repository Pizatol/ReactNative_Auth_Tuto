import { Alert } from "react-native";
import { useState, useContext } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    const signupHandler = async ({ email, password }) => {
        setIsAuthenticating(true);

        try {
            const token = await createUser(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert(
                "Authentication failed",
                "please check your inputs and try later"
            );
            setIsAuthenticating(false);
        }
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating User..." />;
    }

    return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
