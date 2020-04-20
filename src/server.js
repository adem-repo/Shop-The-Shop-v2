import { useContext, useEffect, useRef } from "react";
import firebase from "firebase/app";
import "firebase/database";

import { AppContext } from "./store/appContext";
import * as actions from "./store/actions";

function listModifier(list) {
  let result = [];
  for (let id in list) {
    let item = list[id];
    item.id = id;
    result.push(item);
  }
  return result;
}

export const useSignIn = (login, password) => {
  const { store, dispatch } = useContext(AppContext);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(login, password)
      .then((userData) => {
        dispatch(actions.signInSuccess(userData));
        return userData;
      })
      .catch(function (error) {
        dispatch(actions.signInFailure);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }, [store.signingIn, dispatch, login, password]);
};

export const useSignOut = () => {
  const { store, dispatch } = useContext(AppContext);

  useEffect(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(actions.signOutSuccess());
      });
  }, [store.signingOut, dispatch]);
};

export const useFetchCategories = () => {
  const { store, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (store.fetchingCategories) {
      firebase
        .database()
        .ref("/categories/")
        .once("value")
        .then(function (snapshot) {
          const data = (snapshot.val() && listModifier(snapshot.val())) || [];
          dispatch(actions.fetchCategoriesSuccess(data));
        })
        .catch((error) => {
          dispatch(actions.fetchCategoriesFailure(error));
        });
    }
  }, [store.fetchingCategories, dispatch]);
};




export const useFetchGoods = ({ filter: { category } = { category: "" } }) => {
  const { store, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (store.fetchingGoods) {
      // TODO: do something with this shit
      if (category) {
        firebase
        .database()
        .ref(`/goods/`)
        .orderByChild("category")
        .equalTo(category)
        .once("value")
        .then(function (snapshot) {
          const data = (snapshot.val() && listModifier(snapshot.val())) || [];
          dispatch(actions.fetchGoodsSuccess(data));
        })
        .catch((error) => {
          dispatch(actions.fetchGoodsFailure(error));
        });
      } else {
        firebase
        .database()
        .ref(`/goods/`)
        .once("value")
        .then(function (snapshot) {
          const data = (snapshot.val() && listModifier(snapshot.val())) || [];
          dispatch(actions.fetchGoodsSuccess(data));
        })
        .catch((error) => {
          dispatch(actions.fetchGoodsFailure(error));
        });
      }      
    }
  }, [store.fetchingGoods, dispatch, category]);
};

// export const useSetData = (dataToSet) => {

//   console.log(dataToSet);

//   // firebase.database().ref('users/' + userId).set({
//   //   username: name,
//   //   email: email,
//   //   profile_picture : imageUrl
//   // });
// }
