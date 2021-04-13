import React, { useContext, useEffect, useState, createContext } from "react";

const HotelsContext = createContext(null);

export const HotelsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [hotels, setHotels] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels')
        .then(res => res.json()),
      fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/reviews')
        .then(res => res.json())
    ])
      .then(([hotels, reviews]) => {
        setHotels(hotels);
        setReviews(reviews)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const value = {
    loading, error, hotels, reviews
  }

  return (
    <HotelsContext.Provider value={value}>
      {children}
    </HotelsContext.Provider>
  );
}

export const useHotels = () => {
  const value = useContext(HotelsContext);

  if (!value) {
    throw new Error('Use under a HotelsProvider you dummy!');
  }

  return value;
};