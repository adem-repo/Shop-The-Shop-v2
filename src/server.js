import { useEffect, useRef } from "react";
import axios from "axios";

import * as actions from "./store/actions";

const firebaseConfig = {
  apiKey: "AIzaSyDNIbaK9g9P5lIPfI2Mjj1erIoZ_cxRAtY",
  authDomain: "foomarket-e6013.firebaseapp.com",
  databaseURL: "https://foomarket-e6013.firebaseio.com",
  projectId: "foomarket-e6013",
  storageBucket: "foomarket-e6013.appspot.com",
  messagingSenderId: "897365741751",
  appId: "1:897365741751:web:8759757706dfdbd94bfd32",
};

const refreshTokenURI = "https://securetoken.googleapis.com/v1/token?key=";
const authBaseURI = "https://identitytoolkit.googleapis.com/v1/accounts:";
const signInURI = `${authBaseURI}signInWithPassword?key=${firebaseConfig.apiKey}`;
const getUserData = `${authBaseURI}lookup?key=${firebaseConfig.apiKey}`;

function listModifier(list) {
  let result = [];
  for (let id in list) {
    let item = list[id];
    item.id = id;
    result.push(item);
  }
  return result;
}

export const useServer = (store, dispatch) => {
  /* SIGN IN */
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!store.signingIn) {
      return;
    }
    const { login, password } = store.user;
    axios({
      method: "post",
      url: signInURI,
      data: {
        email: login,
        password: password,
        returnSecureToken: true,
      },
    })
      .then((response) => {
        const { idToken, refreshToken, expiresIn } = response.data;
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        dispatch(actions.signInSuccess({idToken, refreshToken, expirationDate}));
      })
      .catch((error) => {
        dispatch(actions.signInFailure(error));
      });
  }, [store.user, store.signingIn, dispatch]);

  /* REFRESH TOKEN */
  useEffect(() => {
    console.log("refresh token attempt.");
    const expirationDate = localStorage.getItem("expirationDate");
    const refreshToken = localStorage.getItem("refreshToken");
    const idToken = localStorage.getItem("idToken");
    if (!expirationDate || !refreshToken || !idToken || store.signedIn) {
      return;
    }
    const expirationTime = new Date(expirationDate).getTime();
    const now = new Date();
    if (now > expirationTime) {
      console.log("retrieving new token");
      axios
        .post(`${refreshTokenURI}${firebaseConfig.apiKey}`, {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        })
        .then((data) => {
          console.log(data);
        });
    } else {
      axios({
        method: 'post',
        url: getUserData,
        data: {
          idToken
        },
      }).then((response) => {
        dispatch(actions.signInSuccess({expirationDate, refreshToken, idToken}));
      }).catch(error => {
        console.log(error.response.data.error.message)
      });
    }
  });

  /* FETCH CATEGORIES */
  useEffect(() => {
    if (store.fetchingCategories) {
      axios
        .get(
          `${firebaseConfig.databaseURL}/categories.json?auth=${store.user.idToken}`
        )
        .then((response) => {
          console.log(response);
          dispatch(actions.fetchCategoriesSuccess(listModifier(response.data)));
        })
        .catch((error) => {
          console.log(error);
          dispatch(actions.fetchCategoriesFailure(error));
        });
    }
  }, [store.fetchingCategories, store.user, dispatch]);
};

// export const useFetchCategories = (login, password) => {
//   const { store, dispatch } = useContext(AppContext);

// };

// export const useFetchGoods = ({ filter: { category } = { category: "" } }) => {
//   const { store, dispatch } = useContext(AppContext);

//   useEffect(() => {
//     if (store.fetchingGoods) {
//       // TODO: do something with this shit
//       if (category) {
//         firebase
//           .database()
//           .ref(`/goods/`)
//           .orderByChild("category")
//           .equalTo(category)
//           .once("value")
//           .then(function (snapshot) {
//             const data = (snapshot.val() && listModifier(snapshot.val())) || [];
//             dispatch(actions.fetchGoodsSuccess(data));
//           })
//           .catch((error) => {
//             dispatch(actions.fetchGoodsFailure(error));
//           });
//       } else {
//         firebase
//           .database()
//           .ref(`/goods/`)
//           .once("value")
//           .then(function (snapshot) {
//             const data = (snapshot.val() && listModifier(snapshot.val())) || [];
//             dispatch(actions.fetchGoodsSuccess(data));
//           })
//           .catch((error) => {
//             dispatch(actions.fetchGoodsFailure(error));
//           });
//       }
//     }
//   }, [store.fetchingGoods, dispatch, category]);
// };

// export const useSetData = (dataToSet) => {
//   const { store, dispatch } = useContext(AppContext);

//   useEffect(() => {
//     if (store.sendData) {
//       const {
//         type,
//         data: { id, ...info },
//       } = dataToSet;
//       let key;

//       if (id) {
//         key = id;
//       } else {
//         key = firebase.database().ref().child(`/${type}/`).push().key;
//       }

//       firebase
//         .database()
//         .ref(`/${type}/${key}`)
//         .set(info, () => {
//           dispatch(actions.sendDataSuccess());
//           if (type === "goods") {
//             dispatch(actions.fetchGoodsRequest());
//           } else if (type === "categories") {
//             dispatch(actions.fetchCategoriesRequest());
//           }
//         });
//     }
//   }, [store.sendData, dataToSet, dispatch]);
// };

// export const useDeleteData = (isDelete, deletingItem) => {
//   const { store, dispatch } = useContext(AppContext);

//   useEffect(() => {
//     if (isDelete) {
//       const { type, id } = deletingItem;

//       firebase
//         .database()
//         .ref(`/${type}/${id}`)
//         .remove(() => {
//           console.log(type, id, "removed");
//           dispatch(actions.deleteItemSuccess());
//           dispatch(actions.fetchCategoriesRequest());
//           dispatch(actions.fetchGoodsRequest());
//         });
//     }

//   }, [isDelete, dispatch, deletingItem]);
// };
