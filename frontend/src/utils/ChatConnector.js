import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL;

export async function createChatSession(topic, token) {
  try {
    const response = await axios.post(
      `${API_URL}/chat_sessions`,
      { topic },
      { headers: { "auth-token": token } },
    );
    toast.success("Chat session created successfully!");
    console.log(response);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    toast.error("Error creating your chat: ", error?.response?.data?.message);
  }
}

export async function getUserSessions(token) {
  try {
    const response = await axios.get(`${API_URL}/chat_sessions`, {
      headers: {
        "auth-token": token,
      },
    });
    console.log("Chat sessions retrieved successfully!");
    console.log(response);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    console.error(
      "Error fetching user chat sessions: ",
      error.response?.data?.message,
    );
  }
}

export async function updateChatSession(newTopic, token, sessionID) {
  try {
    const response = await axios.put(
      `${API_URL}/chat_sessions`,
      { topic: newTopic, sessionID },
      { headers: { "auth-token": token } },
    );
    toast.success("Chat session updated successfully!");
    console.log(response);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    toast.error("Error updating your chat: ", error?.response?.data?.message);
  }
}
