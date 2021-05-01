import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailReducer, productListReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer, userRegisterReducer ,userDetailsReducer} from './reducers/userReducers';

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
});

// get local cart item stored in local storage.
const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

// get user info stored in local storage.
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    cart: { cartItems: cartItemFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;