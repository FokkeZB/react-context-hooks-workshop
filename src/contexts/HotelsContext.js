import React, { useContext, useEffect, createContext, useReducer } from "react";

const HotelsContext = createContext(null);

const initialState = {
  loading: true,
  error: null,
  hotels: [],
}

export const HotelsProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'addHotels':
        return {
          loading: false,
          error: null,
          hotels: [
            ...state.hotels,
            ...action.payload,
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
    fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels')
      .then(res => res.json())
      .then(hotels => dispatch({ type: 'addHotels', payload: hotels }))
      .then(error => dispatch({ type: 'setError', payload: error }))
  }, [])

  return (
    <HotelsContext.Provider value={state}>
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