import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";
//asynchronous aperations

export const get_categories = createAsyncThunk(
    'home/get_categories',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/customer/get-categories`);

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
            const { data } = await api.get(`/customer/get-products`);

            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const price_range_product = createAsyncThunk(
    'home/price_range_product',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/customer/price-range-product`);
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const filter_products = createAsyncThunk(
    'home/filter_products',
    async (query, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {
                min,
                max,
                category,
                rating,
                sortPrice,
                pageNumber,
                searchValue
            } = query;
            const { data } = await api.get(`/customer/filter-products?min=${min}&max=${max}&category=${category}&rating=${rating}&sortPrice=${sortPrice}&pageNumber=${pageNumber}&searchValue=${searchValue ? searchValue : ''}`);
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_product_details = createAsyncThunk(
    'home/get_product_details',
    async (slug, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/customer/get-product-detail/${slug}`);
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
        products: [],
        totalProducts: 0,
        perPage: 0,
        latest_products: [],
        topRated_products: [],
        discount_products: [],
        priceRange: {
            min: 0,
            max: 0
        },
        product: {},
        relatedProducts: [],
        moreProducts: []

    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_categories.pending, (state) => {
            state.loader = true;
        }).addCase(get_categories.rejected, (state) => {
            state.loader = true;
        }).addCase(get_categories.fulfilled, (state, { payload }) => {
                state.categories = payload.categories
            })

            .addCase(get_products.pending, (state) => {
                state.loader = true;
            }).addCase(get_products.rejected, (state) => {
                state.loader = false;
            }).addCase(get_products.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.products = payload.products
                state.totalProducts = payload.products.length
                state.discount_products = payload.discount_products
                state.latest_products = payload.latest_products
                state.topRated_products = payload.topRated_products
            })

            .addCase(price_range_product.pending, (state) => {
                state.loader = true;
            }).addCase(price_range_product.rejected, (state) => {
                state.loader = false;
            }).addCase(price_range_product.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.latest_products = payload.latest_products
                state.priceRange = payload.priceRange
            })

            .addCase(filter_products.fulfilled, (state, { payload }) => {                
                state.products = payload.products
                state.perPage = payload.perPage
                state.totalProducts = payload.totalProducts
            })

            .addCase(get_product_details.pending, (state) => {
                state.loader = true
            }).addCase(get_product_details.rejected, (state) => {
                state.loader = true
            }).addCase(get_product_details.fulfilled, (state, { payload }) => {
                state.product = payload.product
                state.relatedProducts = payload.relatedProducts
                state.moreProducts = payload.moreProducts
                state.loader = false
            })
    }
});
export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;