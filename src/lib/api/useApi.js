import axios from 'axios';

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
      console.log(url);
    try {
      const response = await axiosInstance.post(url, data, { baseURL });
      console.log(response.data);
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
