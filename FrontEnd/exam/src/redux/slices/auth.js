import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from '../../service/auth.service'

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  errorMessage: '',
  currentUser: null,
};
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    try {
      const userData = await authService.login(username, password); 
      return userData;
    } catch (error) {
      throw error;
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = null; 
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        // state.errorMessage = action.payload.message;
      })
  },
});
// Export actions
export const { logout } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectCurrentUser = (state) => state.auth.currentUser;

