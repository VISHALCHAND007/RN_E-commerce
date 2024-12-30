import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../constants/type";

interface StoreState {
    productData: Product[]
}

const initialState: StoreState = {
    productData: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.productData.find(
                (item: Product) => item._id === action.payload._id
            );
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.productData.push(action.payload);
            }
        },
        increaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
                (item: Product) => item._id === action.payload._id
            )
            existingProduct && existingProduct.quantity++;
        },
        decreaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
                (item: Product) => item._id === action.payload._id
            );
            if (existingProduct?.quantity === 1) {
                existingProduct.quantity === 1;
            } else {
                existingProduct && existingProduct.quantity--;
            }
        },
        deleteProduct: (state, action) => {
            state.productData = state.productData.filter(
                item => item._id !== action.payload._id
            )
        },
        reset: (state) => {
            state.productData = [];
        }
    }
})

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct, reset } = productSlice.actions;
export default productSlice.reducer;  