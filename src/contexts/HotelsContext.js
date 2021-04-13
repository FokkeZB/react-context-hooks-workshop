import React, { useContext, useEffect, useState, createContext } from "react";

const HotelsContext = createContext(null);

export const HotelsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels')
      .then(res => res.json())
      .then(setHotels)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const value = {
    loading, error, hotels
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