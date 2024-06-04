import axios from 'axios';
import { e, User } from '../../lib/server/models/database'


const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiService = {
  // GET request
  get: async (url, baseURL) => {
    try {
      const response = await axiosInstance.get(url, { baseURL });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  },

  // POST request
  post: async (url, data, baseURL) => {
    try {
      const response = await axiosInstance.post(url, data, { baseURL });
    console.log(requestBody, 'Request Body;;');

    // Assuming you have the userId available in the requestBody
    const { username } = requestBody;

    // Insert BasicDetails
    const basicDetailsResult = await User.insert({
      usename: requestBody.username || ' ',
    
    });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  },

  // UPDATE request
  update: async (url, data, baseURL) => {
    try {
      const response = await axiosInstance.put(url, data, { baseURL });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  },

  // DELETE request
  delete: async (url, baseURL) => {
    try {
      const response = await axiosInstance.delete(url, { baseURL });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  },
};

export default apiService;
