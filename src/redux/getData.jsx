import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../https/httpfunction";
import { getPostApi } from "../https/apis";

export const fetchPosts = createAsyncThunk(
  "getData/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest(getPostApi, "get", [], null, {});
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  posts: null,
  loading: false,
  error: null,
};

const getDataSlice = createSlice({
  name: "getData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // pending
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // fulfilled
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      // rejected
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getDataReducer = getDataSlice.reducer;