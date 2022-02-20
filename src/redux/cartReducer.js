const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { payload } = action;
      const item = state.cartItems.find((product) => product.id === payload.id);

      if (item) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, payload],
      };

    //{return {
    //...state,
    //cartItems: [...state.cartItems, action.payload],
    //};
    // }
    case "DELETE_FROM_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (obj) => obj.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};
