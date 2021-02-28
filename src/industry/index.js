import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { industryDataFetchedSelector, getIndustryIndustryThunk } from '../redux/industry';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Post from './pages/Post';

export default function Industry() {
  const dispatch = useDispatch();
  const dataFetched = useSelector(industryDataFetchedSelector);
  useEffect(() => {
    if (!dataFetched) dispatch(getIndustryIndustryThunk());
  }, [dispatch, dataFetched]);

  // TODO: temporary login mechanism
  const { isLoggedIn } = useSelector(state => state.user);
  return (
    <Switch>
      <Route path="/industry/posts"><Post /></Route>
      <Route path="/industry/login"><Login /></Route>
      <Route exact path="/industry"><Landing isLoggedIn={isLoggedIn}/></Route>
    </Switch>
  )
}
