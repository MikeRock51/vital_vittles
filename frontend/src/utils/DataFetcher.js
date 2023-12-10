import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "https://acr-api.mikerock.tech/api/v1";

export async function GetUserDP(token) {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/users/dp", {
        headers: { "auth-token": token },
      });
      console.log(response)
      console.log("User DP retrieved successfully!");
      return response.data.url;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
