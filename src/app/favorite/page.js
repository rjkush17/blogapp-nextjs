"use client";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Auth from './Auth';
import NonAuth from './NonAuth';
import { fetchFav } from '@/lib/redux/slice/favSlice';


function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth) {
      dispatch(fetchFav());
    }
  }, [ auth]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (auth) {
    const ID = auth.details.user._id;
    const token = auth.token;
    return <Auth id={ID} token={token} />;
  } else {
    return <NonAuth />;
  }
}

export default Page;



