import React, { useContext, useEffect, useState, createContext } from "react";

const ReviewsContext = createContext(null);

export const ReviewsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/reviews')
      .then(res => res.json())
      .then(setReviews)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const value = {
    loading, error, reviews
  }

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
}

export const useReviews = () => {
  const value = useContext(ReviewsContext);

  if (!value) {
    throw new Error('Use under a ReviewsProvider you dummy!');
  }

  return value;
};