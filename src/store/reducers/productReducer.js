import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
//asynchronous aperations
export const save_review = createAsyncThunk(
    'product/save_review',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            console.log(obj);
            const { data } = await api.post(`/customer/product/save_review`, obj, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);


export const get_reviews = createAsyncThunk(
    'product/get_reviews',
    async ({ productId, pageNumber }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/customer/product/get_reviews/${productId}/${pageNumber}`);
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const productReducer = createSlice({
    name: 'product',
    initialState: {
        productLoader: false,
        productSuccessMessage: '',
        productErrorMessage: '',
        reviews: [],
        totalReviews: 0,
        ratingReviews: []

    },
    reducers: {
        productMessageClear: (state, _) => {
            state.productErrorMessage = '';
            state.productSuccessMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_reviews.pending, (state, { payload }) => {
                state.productLoader = true;
            }).addCase(get_reviews.rejected, (state, { payload }) => {
                state.productLoader = false;
            }).addCase(get_reviews.fulfilled, (state, { payload }) => {
                state.productLoader = false;
                state.reviews = payload.reviews;
                state.totalReviews = payload.totalReviews;
                state.ratingReviews = payload.ratingReviews;
            })
            .addCase(save_review.rejected, (state, { payload }) => {
                state.productErrorMessage = payload.error;
            }).addCase(save_review.fulfilled, (state, { payload }) => {
                state.productSuccessMessage = payload.message;
            })

    }
});
export const { productMessageClear } = productReducer.actions;
export default productReducer.reducer;