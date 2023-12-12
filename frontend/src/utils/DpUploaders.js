import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_API_URL;

export async function UploadUserDP(file, token) {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await axios.put(`${BASE_URL}/users/dp`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": token,
      },
    });
    toast.success("Profile picture updated successfully!");
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
    toast.error("Couldn't upload your file 😥, please try again");
    // toast.error(error.response?.data?.message);
    return false;
  }
}
