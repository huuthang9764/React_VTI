import { getToken } from "../utils/helpers";
import api from "./axiosClient";

const fetchProducts = async (pageNumber, pageSize) => {
  try {
    const token = getToken();
    const response = await api.get(`/keyboard?sort=id,asc&pageNumber=${pageNumber}&size=${pageSize}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const ProData = response.data;
    return ProData;
  } catch (error) {
    throw new Error('Login failed');
  }
};
const createProduct = async (data) => {
  try {
    const token = getToken();
    const response = await api.post('/keyboard', data, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const createdProduct = response.data; 
    return createdProduct;
  } catch (error) {
    throw new Error('Creating product failed');
  }
};
const updateProduct = async (id, data) => {
  try {
    const token = getToken();
    const response = await api.put(`/keyboard/${id}`, data, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    throw new Error('Updating product failed');
  }
};


const deleteProduct = async (productId) => {
  try {
    const token = getToken();
    await api.delete(`/keyboard/${productId}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    return 'Product deleted successfully';
  } catch (error) {
    throw new Error('Deleting product failed');
  }
};

const searchProducts = async (searchTerm, pageNumber, pageSize) => {
  try {
    const token = getToken();
    const response = await api.get(`/keyboard?sort=id,desc&search=${searchTerm}&pageNumber=${pageNumber}&size=${pageSize}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    throw new Error('Failed to search products');
  }
};

const sortProductsByPrice = async (order, pageNumber, pageSize) => {
  try {
    const token = getToken();
    const sortOption = order === 'asc' ? 'price,asc' : 'price,desc';
    const response = await api.get(`/keyboard?sort=${sortOption}&pageNumber=${pageNumber}&size=${pageSize}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    throw new Error('Failed to sort products by id');
  }
};

const sortProductsById = async (order, pageNumber, pageSize) => {
  try {
    const token = getToken();
    const sortOption = order === 'asc' ? 'id,asc' : 'id,desc';
    const response = await api.get(`/keyboard?sort=${sortOption}&pageNumber=${pageNumber}&size=${pageSize}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    throw new Error('Failed to sort products by id');
  }
};


const ProductService = {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  sortProductsByPrice,
  sortProductsById
}
export default ProductService;