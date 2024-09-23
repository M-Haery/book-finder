import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


let initState = {
    isLoading: true,
    data: null,
    error: null
}

export const createUser = createAsyncThunk('user/createUser', async (userData) => {
    try {
        const response = await fetch("https://book-server.liara.run/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        throw error; 
    }
});


const userSlice = createSlice({
    name:"user",
    initialState: initState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(createUser.rejected, (state) => {
            state.isLoading = false
            state.error = "errrrr"
            state.data = null
        }),
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.data = null
        }),
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            state.data = action.payload
        })
    }
})

export default userSlice.reducer