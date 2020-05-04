import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Tooltip, Fade } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

import { AppContext } from "../../../store/appContext";
import * as actions from "../../../store/actions";

import "./Sidebar.scss";

export default function Sidebar() {
  const { store, dispatch } = useContext(AppContext);
  let history = useHistory();

  useEffect(() => {
    dispatch(actions.fetchCategoriesRequest());
  }, [dispatch]);

  const addCategoryHandler = () => {
    console.log("add category");
    dispatch(actions.openEditCategoryModal());
  };

  const editCategoryHandler = (event, category) => {
    event.preventDefault();
    dispatch(actions.openEditCategoryModal(category)); 
  };

  const removeCategoryHandler = (event, id) => {
    event.preventDefault();
    console.log("delete category", id);
    dispatch(actions.deleteItemRequest({
      type: 'categories',
      id
    }))
  }

  const resetCategories = () => {
    history.push("/shop");
  };

  const categoiesElements = store.categories.map((category) => {
    const capitalizeString = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);
    return (
      <Fade in={true} timeout={300} key={category.id}>
        <li>
          <NavLink to={`/shop/${category.title}`} activeClassName="active">
            <span>{capitalizeString(category.title)}</span>
            <div>
              <Tooltip title="Edit category" placement="right">
                <EditIcon
                  className="edit-icon"
                  onClick={(event) =>
                    editCategoryHandler(event, category.id)
                  }
                />
              </Tooltip>
              <Tooltip title="Remove category" placement="right">
                <DeleteIcon
                  className="edit-icon"
                  onClick={(event) =>
                    removeCategoryHandler(event, category.id)
                  }
                />
              </Tooltip>
            </div>
          </NavLink>
        </li>
      </Fade>
    );
  });

  const skeletonElements = new Array(4).fill(null).map((el, i) => (
    <li key={i}>
      <Skeleton variant="text" animation="wave" className="skeleton" />
    </li>
  ));

  return (
    <div className="sidebar">
      <div className="title" onClick={resetCategories}>
        Categories
      </div>
      <ul>{store.fetchingCategories ? skeletonElements : categoiesElements}</ul>
      <Tooltip title="Add category" placement="right">
        <div className="add-category-button" onClick={addCategoryHandler}>
          <AddIcon />
        </div>
      </Tooltip>
    </div>
  );
}
