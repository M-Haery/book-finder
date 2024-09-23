import { configureStore } from "@reduxjs/toolkit";
import recommendedSlice from "../features/recommendedSlice";
import newUserSlice from "../features/newUserSlice";
import getBooksSlice from "../features/getBooksSlice";
import getPostSlice from "../features/getPostSlice";
import getFavoritesSlice from "../features/getFavoritesSlice";
import getByauthorNameSlice from "../features/getByauthorNameSlice";

const store = configureStore({
    reducer:{
        recommended: recommendedSlice,
        users: newUserSlice,
        books: getBooksSlice,
        post: getPostSlice,
        favorites: getFavoritesSlice,
        booksByAuthor: getByauthorNameSlice
    }
})

export default store