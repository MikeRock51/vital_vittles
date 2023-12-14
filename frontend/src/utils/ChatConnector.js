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


export async function deleteChatSession(sessionID, token) {
  try {
    await axios.delete(
      `${API_URL}/chat_sessions/${sessionID}`,
      { headers: { "auth-token": token } },
    );
    toast.success("Chat session deleted successfully!");
    return true;
  } catch (error) {
    console.log(error);
    toast.error("Error deleting chat: ", error?.response?.data?.message);
  }
}

export async function fetchSessionChats(sessionID, token) {
  try {
    const response = await axios.get(
      `${API_URL}/chats/${sessionID}`,
      { headers: { "auth-token": token } },
    );
    console.log("Session chat history fetched successfully!");
    return response.data?.data;
  } catch (error) {
    console.log(error);
    console.error("Error fetching chat history: ", error.response?.data?.message);
  }
}

export async function processChat(content, sessionID, token) {
  try {
    const response = await axios.post(
      `${API_URL}/chats`,
      { content, sessionID },
      { headers: { "auth-token": token } },
    );
    console.log("Chat processed successfully!");
    console.log(response);
    return response.data?.data;
  } catch (error) {
    console.error(error);
    toast.error("Error creating your chat: ", error?.response?.data?.message);
  }
}
