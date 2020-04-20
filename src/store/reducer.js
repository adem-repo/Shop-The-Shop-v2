import * as ACTION_TYPES from './actionsTypes';

export const initialState = {
  signingIn: false,
  signedIn: true,
  signInFailure: false,
  signingOut: false,

  fetchingCategories: false,
  fetchCategoriesFailure: false,

  fetchingGoods: false,
  fetchGoodsFailure: false,

  goods: [],
  categories: [],

  signInModalOpen: false,
  editProductModalOpen: false,
  editCategoryModalOpen: false,
};

export const reducer = (state, action) => {

  switch (action.type) {
    case ACTION_TYPES.SIGN_IN_REQUEST: return {...state, signedIn: false, signingIn: true,  signInFailure: false };
    case ACTION_TYPES.SIGN_IN_SUCCESS: return {...state, signedIn: true,  signingIn: false, signInFailure: false };
    case ACTION_TYPES.SIGN_IN_FAILURE: return {...state, signedIn: false, signingIn: false, signInFailure: true };
      
    case ACTION_TYPES.SIGN_OUT_REQUEST: return {...state, signingOut: true};
    case ACTION_TYPES.SIGN_OUT_SUCCESS: return {...state, signedIn: false, signingOut: false};

    case ACTION_TYPES.FETCH_CATEGORIES_REQUEST: return {...state, fetchingCategories: true,  fetchFailure: false};
    case ACTION_TYPES.FETCH_CATEGORIES_FAILURE: return {...state, fetchingCategories: false, fetchCategoriesFailure: true};
    case ACTION_TYPES.FETCH_CATEGORIES_SUCCESS: 
      const categories = action.payload;
      return {...state, fetchingCategories: false, fetchFailure: false, categories};

    case ACTION_TYPES.FETCH_GOODS_REQUEST: return {...state, fetchingGoods: true,  fetchGoodsFailure: false};
    case ACTION_TYPES.FETCH_GOODS_FAILURE: return {...state, fetchingGoods: false, fetchGoodsFailure: true};
    case ACTION_TYPES.FETCH_GOODS_SUCCESS: 
      const goods = action.payload;
      return {...state, fetchingGoods: false, fetchGoodsFailure: false, goods};

    case ACTION_TYPES.OPEN_SIGN_IN_MODAL: return {...state, signInModalOpen: true};
    case ACTION_TYPES.CLOSE_SIGN_IN_MODAL: return {...state, signInModalOpen: false};

    case ACTION_TYPES.OPEN_EDIT_PRODUCT_MODAL: return {...state, editProductModalOpen: true};
    case ACTION_TYPES.CLOSE_EDIT_PRODUCT_MODAL: return {...state, editProductModalOpen: false};

    case ACTION_TYPES.OPEN_EDIT_CATEGORY_MODAL: return {...state, editCategoryModalOpen: true};
    case ACTION_TYPES.CLOSE_EDIT_CATEGORY_MODAL: return {...state, editCategoryModalOpen: false};

    default: return state;
  }
};