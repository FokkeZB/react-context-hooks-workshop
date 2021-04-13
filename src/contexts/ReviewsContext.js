import React, { useContext, useEffect, useReducer, createContext } from "react";

const ReviewsContext = createContext(null);

const initialState = {
  loading: true,
  reviews: [],
  error: null,
}

export const ReviewsProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'addReviews':
        return {
          loading: false,
          error: null,
          reviews: [
            ...state.reviews,
            ...action.payload,
          ],
        };
      case 'addReview':
        return {
          ...state,
          reviews: [
            ...state.reviews,
            action.payload,
          ],
        };
      case 'error':
        return {
          loading: false,
          error: action.payload,
          hotels: [],
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/reviews')
      .then(res => res.json())
      .then(reviews => dispatch({ type: 'addReviews', payload: reviews }))
      .catch(error => dispatch({ type: 'setError', payload: error }))
  }, [])

  const value = {
    ...state,
    addReview: (payload) => dispatch({ type: 'addReview', payload })
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