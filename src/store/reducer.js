import * as ACTION_TYPES from './actionsTypes';

const emptyProduct = {
  title: '',
  category: '',
  image: '',
};

export const initialState = {

  user: {
    login: null,
    password: null
  },

  signingIn: false,
  signedIn: false,
  signInFailure: false,
  signingOut: false,
  refreshingToken: false,

  fetchingCategories: false,
  fetchCategoriesFailure: false,

  fetchingGoods: false,
  fetchGoodsFailure: false,

  goods: [],
  categories: [],

  signInModalOpen: false,
  editProductModalOpen: false,
  editCategoryModalOpen: false,

  editingProduct: emptyProduct,
  editingCategoryID: null,
  
  sendData: false,
  sendDataFailure: false,

  deletingItem: null,
  deleteInProcess: false
};

export const reducer = (state, action) => {

  console.log(action);

  switch (action.type) {
    case ACTION_TYPES.SIGN_IN_REQUEST: 
      const signInData = action.payload;
      return {...state, signedIn: false, signingIn: true,  signInFailure: false, user: {...state.user, ...signInData} };
    case ACTION_TYPES.SIGN_IN_SUCCESS: 
      const user = action.payload;
      return {...state, signedIn: true,  signingIn: false, signInFailure: false, user: {...state.user, ...user} };
    case ACTION_TYPES.SIGN_IN_FAILURE: return {...state, signedIn: false, signingIn: false, signInFailure: true, user: null };

    case ACTION_TYPES.SING_OUT:       
      return {...state, signedIn: false, user: null};

    case ACTION_TYPES.REFRESH_TOKEN_REQUEST: return {...state, refreshingToken: true }

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

    case ACTION_TYPES.OPEN_EDIT_PRODUCT_MODAL: 
      const product = action.payload;
      return {...state, editProductModalOpen: true, editingProduct: product};
    case ACTION_TYPES.CLOSE_EDIT_PRODUCT_MODAL: return {...state, editProductModalOpen: false, editingProduct: emptyProduct};

    case ACTION_TYPES.OPEN_EDIT_CATEGORY_MODAL: 
    const editingCategoryID = action.payload;
    const editingCategory = state.categories.find(category => editingCategoryID === category.id);
      return {...state, editCategoryModalOpen: true, editingCategory};
    case ACTION_TYPES.CLOSE_EDIT_CATEGORY_MODAL: return {...state, editCategoryModalOpen: false, editingCategory: null};

    case ACTION_TYPES.SEND_DATA_REQUEST: return {...state, sendData: true}
    case ACTION_TYPES.SEND_DATA_SUCCESS: return {...state, sendData: false}

    case ACTION_TYPES.DELETE_ITEM_REQUEST: 
      const deletingItem = action.payload;
      return {...state, deletingItem, deleteInProcess: true}
    case ACTION_TYPES.DELETE_ITEM_SUCCESS: return {...state, deletingItem: null, deleteInProcess: false}

    default: return state;
  }
};