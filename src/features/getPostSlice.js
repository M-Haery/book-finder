import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isLoading: false,
    data: [],
    error: ""
}

export const getPost = createAsyncThunk("post/getPost", async(id, { rejectWithValue })=>{
    try{
        const res = await fetch(`https://openlibrary.org/works/${id}.json`)
        const data = await res.json()
        return data
    }catch(error){
        return rejectWithValue('لطفا از روشن بودن فیلتر شکن اطمینان حاصل کنید و دوباره امتحان کنید')
    }
})

const postSlice = createSlice({
    name: "post",
    initialState: initState,
    reducers:{},
    extraReducers: (build) => {
        build.addCase(getPost.pending, (state) => {
            state.isLoading = true
            state.data = []
            state.error = ""
        }),
        build.addCase(getPost.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error = ""
        }),
        build.addCase(getPost.rejected, (state, action) => {
            state.isLoading = false
            state.data = []
            state.error = action.payload
        })
    }
})

export default postSlice.reducer
