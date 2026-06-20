'use client';

import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { setToken } from './authSlice';

function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      localStorage.getItem('token');

    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return null;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthLoader />
      {children}
    </Provider>
  );
}