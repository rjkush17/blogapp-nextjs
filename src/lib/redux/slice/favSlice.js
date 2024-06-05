import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFav = createAsyncThunk("fetchFav", async () => {
  try {
    const tok = JSON.parse(localStorage.getItem("auth"));
    if (!tok) {
      console.log("User not logged in");
      return;
    }
    const id = tok.details.user._id;
    console.log(id)

    const res = await fetch(`/api/fav/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tok.token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const toggleFav = createAsyncThunk("toggleFav", async (bodyData, { dispatch }) => {
  try {
    const tok = JSON.parse(localStorage.getItem("auth"));
    if (!tok) {
      console.log("User not logged in");
      return;
    }

    const res = await fetch("/api/fav", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tok.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    await dispatch(fetchFav());
    return bodyDATA;
  } catch (error) {
    throw new Error(error.message);
  }
});

const initialState = {
  fav: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
};

export const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFav.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(fetchFav.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fav = action.payload.favBlogs;
      })
      .addCase(fetchFav.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.error.message || "An error occurred while fetching";
      })
      .addCase(toggleFav.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(toggleFav.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(toggleFav.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.error.message || "An error occurred while fetching";
      });
  },
});

export default favSlice.reducer;
