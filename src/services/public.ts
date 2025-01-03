import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8222",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPublicAccessPoints = async () => {
  try {
    const response = await apiClient.post("/api/v1/public/access-point");
    return response.data.data.content;
  } catch (error) {
    throw error;
  }
};
