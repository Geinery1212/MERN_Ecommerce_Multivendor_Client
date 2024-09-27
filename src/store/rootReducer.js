import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import homeReducer from "./reducers/homeReducer";
import orderReducer from "./reducers/orderReducer";
import productReducer from "./reducers/productReducer";
import wishlistReducer from "./reducers/wishlistReducer";


const rootReducer = {
    home: homeReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    dashboard: dashboardReducer,
    wishlist: wishlistReducer,
    product: productReducer
}
export default rootReducer;