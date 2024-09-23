import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    favData: [],
    error: "",
    isLoading: true
}

export const getFavorites = createAsyncThunk("favorites/getFavorites", async(id) => {
    const res = await fetch(`https://book-server.liara.run/user/${id}`)
    const favData = await res.json()
    return favData
})

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: initState,
    reducers: [],
    extraReducers: (build) => {
        build.addCase(getFavorites.pending, (state) => {
            state.isLoading  = true,
            state.favData  = [],
            state.error  = ""
        }),
        build.addCase(getFavorites.fulfilled, (state, action) => {
            state.isLoading = false,
            state.favData = action.payload.favorites,
            state.error = ""
        }),
        build.addCase(getFavorites.rejected, (state, action) => {
            state.isLoading = false,
            state.favData = [],
            state.error = action.error.message
        })
    }
})
export default favoriteSlice.reducer
