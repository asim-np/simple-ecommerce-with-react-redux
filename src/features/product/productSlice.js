import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*
products = {
    all: [],
    fashion: [],
    electronics: [],
    sports: [],
    books: [],
    toys: [],
    music: [],
}
*/

const initialState = {
    products: {},
    filterProducts: [],
    loading: true,
    error: null,
}


export const fetchProductAsync = createAsyncThunk(
    'product/fetchProductAsync',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data;
    }
)

export const fetchProductByCategoryAsync = createAsyncThunk(
    'product/fetchProductByCategoryAsync',
    async (category) => {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await response.json();
        return {data, category};
    }
)


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getProduct: (state, action) => {
            state.products = action.payload;
        },
        filter(state, action) {
            const { query } = action.payload;
            if (query === '') {
                state.filterProducts = state.products.all;
            } else {
                state.filterProducts = state.products.all.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
            }
        }

    },
    extraReducers: {
        [fetchProductAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchProductAsync.fulfilled]: (state, action) => {
            state.loading = false;
            state.products.all = action.payload;
            state.filterProducts = action.payload;
        },
        [fetchProductAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [fetchProductByCategoryAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchProductByCategoryAsync.fulfilled]: (state, action) => {
            state.loading = false;
            const { category, data } = action.payload;
            state.products[category] = data;
        },
        [fetchProductByCategoryAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        }
    }
})


export const { getProduct, filter } = productSlice.actions;
export default productSlice.reducer;