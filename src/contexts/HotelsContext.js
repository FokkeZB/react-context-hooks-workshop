import React, { useContext, createContext, useReducer, useCallback } from "react";

const HotelsContext = createContext(null);

const initialState = {
  loading: false,
  error: null,
  hotels: [],
}

export const HotelsProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'setLoading':
        return {
          ...state,
          loading: false,
          error: null,
        };
      case 'setHotels':
        return {
          loading: false,
          error: null,
          hotels: action.payload,
        };
      case 'addHotel':
        return {
          loading: false,
          error: null,
          hotels: [
            ...state.hotels,
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

  const ensureHotels = useCallback(() => {
    dispatch({ type: 'setLoading' });
    fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels')
      .then(res => res.json())
      .then(hotels => dispatch({ type: 'setHotels', payload: hotels }))
      .catch(error => dispatch({ type: 'setError', payload: error }))
  }, []);

  const ensureHotel = useCallback((id) => {
    const hasHotel = state.hotels.some(hotel => hotel.id === id);
    if (!hasHotel) {
      dispatch({ type: 'setLoading' });
      fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${id}`)
        .then(res => res.json())
        .then(hotel => dispatch({ type: 'addHotel', payload: hotel }))
        .catch(error => dispatch({ type: 'setError', payload: error }))
    }
  }, [state.hotels]);

  const value = {
    ...state,
    ensureHotels,
    ensureHotel,
  };

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