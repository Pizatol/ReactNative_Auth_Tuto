import { Alert } from "react-native";
import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
    const [isLogin, setIsLogin] = useState(false);

    const authCtx = useContext(AuthContext);

    const signinHandler = async ({ email, password }) => {
        setIsLogin(true);
        try {
            const token = await login(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert(
                "Authentication failed !",
                "Could not log you in, try again later"
            );
            setIsLogin(false);
        }
    };

    if (isLogin) {
        return <LoadingOverlay message="Logging you in..." />;
    }

    return <AuthContent isLogin onAuthenticate={signinHandler} />;
}

export default LoginScreen;
