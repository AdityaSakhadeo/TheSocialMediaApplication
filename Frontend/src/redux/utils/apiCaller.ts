// frontend/src/redux/utils/apiCaller.ts
import axios from 'axios';
import { store } from '../store/store';  // Adjust path based on your structure
import { setLoading } from '../slices/loaderSlice';

interface ApiOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: any;
  headers?: any;
  showLoading?: boolean;
}

export const apiCaller = async ({
  method,
  url,
  data,
  headers = {},
  showLoading = true
}: ApiOptions) => {
  try {
    if (showLoading) store.dispatch(setLoading(true));

    const token = localStorage.getItem("token")?.replace(/"/g, "");
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios({
      method,
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...headers
      }
    });

    return response.data;
  } catch (error: any) {
    console.error('API Error:', error);
    throw error.response?.data || { message: "Something went wrong" };
  } finally {
    if (showLoading) store.dispatch(setLoading(false));
  }
};
