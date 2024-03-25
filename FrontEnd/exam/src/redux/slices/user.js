import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userService from '../../service/user.service'


const initialState = {
  users: [],
  isLoading: false,
  errorMessage: '',
}

export const fetchUsers = createAsyncThunk(
  "userAbout/fetchUsers",
  async () => {
    const response = await userService.fetchUser();
    return response;
  }
);

export const createUsers = createAsyncThunk(
  "userAbout/createUsers",
  async (data) => {
    const response = await userService.createUser(data);
    return response;
  }
);
export const updateUsers = createAsyncThunk(
  "userAbout/updateUsers",
  async ({ id, data }) => {
    const response = await userService.updateUser(id, data);
    return response;
  }
);
export const deleteUsers = createAsyncThunk(
  "userAbout/deleteUsers",
  async (id) => {
    await userService.deleteUser(id);
    return id; 
  }
);
export const searchUsers = createAsyncThunk(
  "product/searchUsers",
  async ({ searchTerm, pageNumber, pageSize}) => {
    const response = await userService.searchUser(searchTerm, pageNumber, pageSize);
    return response;
  }
);


const userSlice = createSlice({
  name: "userAbout",
  initialState,
  reducers: {
    logout: (state) => {
      state.users = null;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(createUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUsers.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUsers.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(searchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

const { reducer } = userSlice;
export default reducer;