import Swal from "sweetalert2";
import api from "./axiosClient";


const login = async (username, password) => {
  try {
    const token = btoa(`${username}:${password}`);
    const response = await api.get('/auth/login', {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const userData = response.data;
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "ERROR",
      text: "Thông tin đăng nhập chưa đúng!",
    });
    throw new Error('Login failed');
  }
};

const authService = {
  login,
};

export default authService;