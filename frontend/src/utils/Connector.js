import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "https://acr-api.mikerock.tech/api/v1/users";

export async function CreateUser(userData, setError) {
    try {
        const response = await axios.post(API_URL + '/', userData);
        console.log(response.data);
        toast.success(response.data.message);
        return true;
    } catch(error) {
        console.log(error);
        setError(error.response.data.message);
        return false;
    }
}
