import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  products: [],
};

export const cartReducer = createSlice({
  name: "cartStore",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      const existingProduct = state.products.findIndex(
        (product) =>
          product.productID === payload.productID &&
          product.variantID === payload.variantID
      );
      if (existingProduct < 0) {
        state.products.push(payload);
        state.count = state.products.length;
      }
    },
    increaseQuantity: (state, action) => {
      const { productID, variantID } = action.payload;
      const existingProduct = state.products.findIndex(
        (product) =>
          product.productID === productID && product.variantID === variantID
      );
      if (existingProduct >= 0) {
        state.products[existingProduct].quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const { productID, variantID } = action.payload;
      const existingProduct = state.products.findIndex(
        (product) =>
          product.productID === productID && product.variantID === variantID
      );
      if (existingProduct >= 0) {
        if (state.products[existingProduct].quantity > 1) {
          state.products[existingProduct].quantity -= 1;
        }
      }
    },
    removeFromCart: (state, action) => {
      const { productID, variantID } = action.payload;
      state.products = state.products.filter(
        (product) =>
          !(product.productID === productID && product.variantID === variantID)
      );
      state.count = state.products.length;
    },
    clearCart: (state, action) => {
      state.products = [];
      state.count = 0;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartReducer.actions;

export default cartReducer.reducer;
