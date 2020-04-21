import * as ACTION_TYPES from './actionsTypes';

export const signInSuccess = (payload) => ({ type: ACTION_TYPES.SIGN_IN_SUCCESS, payload });
export const signInFailure = ()        => ({ type: ACTION_TYPES.SIGN_IN_FAILURE });
export const signInRequest = ()        => ({ type: ACTION_TYPES.SIGN_IN_REQUEST });

export const signOutRequest = () => ({ type: ACTION_TYPES.SIGN_OUT_REQUEST });
export const signOutSuccess = () => ({ type: ACTION_TYPES.SIGN_OUT_SUCCESS });

export const fetchCategoriesRequest = ()        => ({ type: ACTION_TYPES.FETCH_CATEGORIES_REQUEST });
export const fetchCategoriesSuccess = (payload) => ({ type: ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload });
export const fetchCategoriesFailure = ()        => ({ type: ACTION_TYPES.FETCH_CATEGORIES_FAILURE });

export const fetchGoodsRequest = ()        => ({ type: ACTION_TYPES.FETCH_GOODS_REQUEST });
export const fetchGoodsSuccess = (payload) => ({ type: ACTION_TYPES.FETCH_GOODS_SUCCESS, payload });
export const fetchGoodsFailure = ()        => ({ type: ACTION_TYPES.FETCH_GOODS_FAILURE });

export const openSignInModal = () => ({ type: ACTION_TYPES.OPEN_SIGN_IN_MODAL });
export const closeSignInModal = () => ({ type: ACTION_TYPES.CLOSE_SIGN_IN_MODAL });

export const openEditProductModal  = (payload) => ({ type: ACTION_TYPES.OPEN_EDIT_PRODUCT_MODAL, payload });
export const closeEditProductModal = (payload) => ({ type: ACTION_TYPES.CLOSE_EDIT_PRODUCT_MODAL, payload });

export const openEditCategoryModal  = (payload) => ({type: ACTION_TYPES.OPEN_EDIT_CATEGORY_MODAL, payload});
export const closeEditCategoryModal = ()        => ({type: ACTION_TYPES.CLOSE_EDIT_CATEGORY_MODAL});

export const sendDataRequest = () => ({type: ACTION_TYPES.SEND_DATA_REQUEST});
export const sendDataSuccess = () => ({type: ACTION_TYPES.SEND_DATA_SUCCESS});
export const sendDataFailure = () => ({type: ACTION_TYPES.SEND_DATA_FAILURE});