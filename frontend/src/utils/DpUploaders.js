import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_API_URL;

export async function UploadUserDP(file, token) {
  try {
    const response = await axios.put(`${BASE_URL}/users/dp`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": token,
      },
    });
    toast.success("Profile picture updated successfully!");
    return response.data.data
  } catch (error) {
    console.log(error);
    toast.error(error.respon)
  }
}
