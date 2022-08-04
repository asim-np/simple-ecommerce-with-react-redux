import { createSlice } from '@reduxjs/toolkit';


/*

// CartItem ->
{
    id: 1,
    product: {
        id: 1,
        name: 'Product 1',
        price: 100,
        image: 'https://via.placeholder.com/150',
    },
    quantity: 1,
}

*/

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        quantity: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const { product } = action.payload;
            const productIndex = state.items.findIndex(item => item.product.id === product.id);
            if (productIndex === -1) {
                state.items.push({
                        id: (state.items.length || 0) + 1,
                        product,
                        quantity: 1,
                        total: product.price,
                    });
            } else {
                state.items[productIndex].quantity += 1;
                state.items[productIndex].total += state.items[productIndex].product.price;
            }
            state.total += product.price;
            state.quantity += 1;
        },
        removeFromCart: (state, action) => {
            const { product } = action.payload;
            const productIndex = state.items.findIndex(item => item.product.id === product.id);
            if (productIndex !== -1) {
                state.items[productIndex].quantity -= 1;
                state.items[productIndex].total -= state.items[productIndex].product.price;

                if (state.items[productIndex].quantity === 0) {
                    state.items.splice(productIndex, 1);
                }
                state.total -= product.price;
                state.quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            state.quantity = 0;
        },
        removeItem: (state, action) => {
            const { product } = action.payload;
            const productIndex = state.items.findIndex(item => item.product.id === product.id);
            if (productIndex !== -1) {
                state.total -= state.items[productIndex].total;
                state.quantity -= state.items[productIndex].quantity;
                state.items.splice(productIndex, 1);
            }
        }
    }
});


export const { addToCart, removeFromCart, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;