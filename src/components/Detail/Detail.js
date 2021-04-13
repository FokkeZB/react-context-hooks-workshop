import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';

const ReviewsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Detail = ({ match, history }) => {
  // Get this information from the API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [hotel, setHotel] = useState();

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${match.params.id}`)
      .then(res => res.json())
      .then(setHotel)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [match.params.id])

  return !loading && !error ? (
    <>
      {history && hotel && (
        <SubHeader
          goBack={() => history.goBack()}
          title={hotel.title}
          openForm={() => history.push(`${match.url}/new`)}
        />
      )}
      <HotelItem data={hotel} />

      <h3>Reviews:</h3>
      <ReviewsWrapper></ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default Detail;
