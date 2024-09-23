import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isLoadingAuthor: false,
    dataAuthor: [],
    errorAuthor: ""
}

export const getBooksByAuthor = createAsyncThunk("booksbyAuthor/getBooksByAuthor", async(author, { rejectWithValue })=>{
    try{
        const res = await fetch(`https://openlibrary.org/search/authors.json?q=${author}`)
        if (!res.ok) {
            return rejectWithValue('خطایی در دریافت اطلاعات از سرور رخ داده است');
        }
        const data = await res.json()
        return data
    }catch(error){
        return rejectWithValue('لطفا از روشن بودن فیلتر شکن اطمینان حاصل کنید و دوباره امتحان کنید');
    }
})

const booksByAuthor = createSlice({
    name:"booksbyAuthor",
    initialState: initState,
    reducers:{},
    extraReducers: (build) => {
        build.addCase(getBooksByAuthor.fulfilled, (state, action)=>{
            state.isLoadingAuthor = false
            state.dataAuthor = action.payload
            state.errorAuthor = ""
        }),
        build.addCase(getBooksByAuthor.pending, (state)=>{
            state.isLoadingAuthor = true
            state.dataAuthor = []
            state.errorAuthor =""
        }),
        build.addCase(getBooksByAuthor.rejected, (state, action)=>{
            state.isLoadingAuthor = false
            state.dataAuthor = []
            state.errorAuthor = action.payload 
        })
    }
})

export default booksByAuthor.reducer
