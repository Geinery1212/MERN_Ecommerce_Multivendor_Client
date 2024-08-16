import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
//asynchronous aperations

export const get_categories = createAsyncThunk(
    'home/get_categories',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/client/get-categories`);

            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_products = createAsyncThunk(
    'home/get_products',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/client/get-products`);

            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const homeReducer = createSlice({
    name: 'home',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        categories: [],
        products: []

    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_categories.fulfilled, (state, { payload }) => {
                state.categories = payload.categories
            })
            .addCase(get_products.fulfilled, (state, { payload }) => {
                state.products = payload.products
            })
    }
});
export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;