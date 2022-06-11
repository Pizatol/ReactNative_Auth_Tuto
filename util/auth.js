import axios from "axios";

const API_KEY = "AIzaSyDZT8hDY-MuF_u7rugyxuf0hIGGMSkmx3Y";

const authenticate = async (mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
    });

    const token = response.data.idToken;

    return token;
};

export const createUser =  (email, password) => {
    const token =  authenticate("signUp", email, password);
    return token;
};

export const login =  (email, password) => {
    return authenticate("signInWithPassword", email, password);
};
