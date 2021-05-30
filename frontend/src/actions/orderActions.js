
import { ORDER_CREATE_FAILED, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAILED, ORDER_LIST_MY_FAILED, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAILED, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/orders`, order, config);
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_CREATE_FAILED,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const getOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAILED,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type:  ORDER_PAY_REQUEST,
        })
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult, config);
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_PAY_FAILED,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type:  ORDER_LIST_MY_REQUEST,
        })
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/myorders`, config);
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAILED,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}


export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type:  ORDER_LIST_REQUEST,
        })
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders`, config);
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_LIST_FAILED,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

