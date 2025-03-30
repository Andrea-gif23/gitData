import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    fetchUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});


export const fetchUser = (username) => async (dispatch) => {
  try {
    dispatch(fetchUserStart());
    const response = await axios.get(`https://api.github.com/users/${username}`);
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserError(error.message));
  }
};


export const { fetchUserStart, fetchUserSuccess, fetchUserError } = githubSlice.actions;
export default githubSlice.reducer;