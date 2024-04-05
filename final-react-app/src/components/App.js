import React, { lazy, Suspense, useEffect, memo } from 'react';
import Header from './Header';

const App = () => {
    const dispatch = useDispatch();
    const redirectTo = useSelector((state) => state.common.redirectTo);
    const appLoaded = useSelector((state) => state.common.appLoaded);
  
    useEffect(() => {
      if (redirectTo) {
        dispatch(clearRedirect());
      }
    }, [redirectTo]);

    useEffect(() => {
      const token = window.localStorage.getItem('jwt');
      dispatch(appLoad(token));
    }, []);    



    return (
      <>
        <Header />
        <p>Loading...</p>
      </>
    );
};

export default memo(App);