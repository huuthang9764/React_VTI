import { getToken } from "../utils/helpers";
import api from "./axiosClient";


const fetchUser = async() => {
  try {
    const token = getToken();
    const response = await api.get('/accounts?sort=id,desc', {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const userData = response.data;
    localStorage.setItem('token', JSON.stringify(token));
    return userData;
  } catch (error) {
    throw new Error('Login failed');
  }
  };
  
  const createUser = async (userData) => {
    try {
      const token = getToken();
      const response = await api.post('/accounts', userData, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      const createdUserData = response.data;
      return createdUserData;
    } catch (error) {
      throw new Error('Create user failed');
    }
  };
  const updateUser = async (id, data) => {
    try {
      const token = getToken();
      const response = await api.put(`/accounts/${id}`, data, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      const updatedUser = response.data; // Người dùng đã được cập nhật
      return updatedUser;
    } catch (error) {
      throw new Error('Update user failed');
    }
  };
  const deleteUser = async (id) => {
    try {
      const token = getToken();
      await api.delete(`/accounts/${id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      return 'User deleted successfully';
    } catch (error) {
      throw new Error('Delete user failed');
    }
  };
  
  const searchUser = async (searchTerm, pageNumber, pageSize) => {
    try {
      const token = getToken();
      const response = await api.get(`/accounts?sort=id,desc&search=${searchTerm}&pageNumber=${pageNumber}&size=${pageSize}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      throw new Error('Failed to search user');
    }
  };

  const userService = {
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    searchUser
  };
  
  export default userService;