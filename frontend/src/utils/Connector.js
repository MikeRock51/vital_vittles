import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "https://acr-api.mikerock.tech/api/v1";

export async function CreateUser(userData, setError) {
  try {
    const response = await axios.post(API_URL + "/users", userData);
    console.log(response.data);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    console.log(error);
    setError(error.response.data.message);
    return false;
  }
}

export async function LoginUser(userData, setError) {
  try {
    const response = await axios.post(API_URL + "/login", userData);
    console.log(response.data);
    toast.success(response.data.message);
    return { token: response.data["auth-token"], user: response.data.data };
  } catch (error) {
    console.log(error);
    setError(error.response.data.message);
    return false;
  }
}

export async function LogoutUser(token) {
  try {
    const response = await axios.delete(API_URL + "/logout", {
      headers: { "auth-token": token },
    });
    console.log(response.data);
    toast.success("Sign out failed, please try again!");
    return true;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    return false;
  }
}
