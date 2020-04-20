import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import Product from './Product/Product';
import { AppContext } from '../../../store/appContext';
import * as actions from '../../../store/actions';
import { useFetchGoods } from '../../../server';

import './Goods.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Goods() {

  const { store, dispatch } = useContext(AppContext);
  const params = useLocation();

  const { pathname } = params;
  const pathnameParts = pathname.split('/');
  let category = pathnameParts[pathnameParts.length - 1];
  const isCategoryExist = store.categories.some(cat => category === cat.title);
  category = isCategoryExist ? category : '';

  useEffect(() => {
    if (store.categories.length)
      dispatch(actions.fetchGoodsRequest());
  }, [dispatch, category, pathname, store.categories]);

  useFetchGoods({
    filter: {
      category
    }
  });

  const goodsList = store.goods.map(product => <Product product={product} key={product.id}/>);

  const classes = useStyles();

  return (
    <Grid className={classes.root} container >
      <div className="goods-list">
        {goodsList}
      </div>
    </Grid>
  )
}