import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

let initState = {
    loading: true,
    books: [],
    error: ""
}

const fetchBooks = createAsyncThunk("recommended/fetchBooks", async () => {
    const response = await fetch("https://book-server.liara.run/recommended");
    const books = await response.json();
    return books;
});

const recommendedSlice = createSlice({
    name: "recommended",
    initialState: initState,
    reducers:{

    },
    extraReducers: (build) => {
        build.addCase(fetchBooks.pending, (state) => {
            state.loading  = true,
            state.books  = [],
            state.error  = ""
        }),
        build.addCase(fetchBooks.fulfilled, (state, action) => {
            state.loading = false,
            state.books = action.payload,
            state.error = ""
        }),
        build.addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false,
            state.books = [],
            state.error = action.error.message
        })
    }
})

export default recommendedSlice.reducer
export { fetchBooks as fetchBooks };