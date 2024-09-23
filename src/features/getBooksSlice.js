import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isLoading: false,
    data: [],
    error: ""
}

export const getBooks = createAsyncThunk("books/getBooks", async(title, { rejectWithValue })=>{
    try{
        const res = await fetch(`https://openlibrary.org/search.json?title=${title}`)
        if (!res.ok) {
            return rejectWithValue('خطایی در دریافت اطلاعات از سرور رخ داده است');
        }
        const data = await res.json()
        return data
    }catch(error){
        return rejectWithValue('لطفا از روشن بودن فیلتر شکن اطمینان حاصل کنید و دوباره امتحان کنید');
    }
})

const books = createSlice({
    name:"books",
    initialState: initState,
    reducers:{},
    extraReducers: (build) => {
        build.addCase(getBooks.fulfilled, (state, action)=>{
            state.isLoading = false
            state.data = action.payload
            state.error = ""
        }),
        build.addCase(getBooks.pending, (state)=>{
            state.isLoading = true
            state.data = []
            state.error =""
        }),
        build.addCase(getBooks.rejected, (state, action)=>{
            state.isLoading = false
            state.data = []
            state.error = action.payload 
        })
    }
})

export default books.reducer
