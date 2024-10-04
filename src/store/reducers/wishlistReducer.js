import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";
//asynchronous aperations
export const add_wishlist = createAsyncThunk(
    'wishlist/add',
    async (product, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/customer/wishlist/add`, product, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const delete_wishlist = createAsyncThunk(
    'wishlist/delete',
    async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
        try {
            console.log(wishlistId)
            const { data } = await api.delete(`/customer/wishlist/${wishlistId}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);


//asynchronous aperations
export const get_wishlist = createAsyncThunk(
    'wishlist/get-all',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/customer/wishlist/get-all`, { withCredentials: true });                        
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const wishlistReducer = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: [],
        wishlist_count: 0,
        wishlistErrorMessage: '',
        wishlistSuccessMessage: ''
    },
    reducers: {
        wishListMessageClear: (state, _) => {
            state.wishlistErrorMessage = '';
            state.wishlistSuccessMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_wishlist.rejected, (state, { payload }) => {
                state.wishlistErrorMessage = payload.error;
            }).addCase(add_wishlist.fulfilled, (state, { payload }) => {
                state.wishlistSuccessMessage = payload.message;
                state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count + 1 : 1   
            })

            .addCase(get_wishlist.rejected, (state, { payload }) => {
                state.wishlistErrorMessage = payload.error;
            }).addCase(get_wishlist.fulfilled, (state, { payload }) => {
                state.wishlist = payload.wishlist;  
                state.wishlist_count = state.wishlist.length;              
            })

            .addCase(delete_wishlist.rejected, (state, { payload }) => {
                state.wishlistErrorMessage = payload.error;
            }).addCase(delete_wishlist.fulfilled, (state, { payload }) => {
                state.wishlistSuccessMessage = payload.message;
                state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count - 1 : 0                
            })
    }
});
export const { wishListMessageClear } = wishlistReducer.actions;
export default wishlistReducer.reducer;