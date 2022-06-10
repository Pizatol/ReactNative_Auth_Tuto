
import axios from 'axios'

const API_KEY = "AIzaSyDZT8hDY-MuF_u7rugyxuf0hIGGMSkmx3Y"

const createUser = async (email, password) => {
 const response = await	axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY, 
	{
		email : email,
		password : password,
		returnSecureToken: true
	}
	);

}