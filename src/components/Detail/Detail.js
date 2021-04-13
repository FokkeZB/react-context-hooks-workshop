import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';
import ReviewItem from './ReviewItem';

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
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${match.params.id}`)
        .then(res => res.json()),
      fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/reviews')
        .then(res => res.json())
        .then(reviews => reviews.filter(review => review.hotelId === parseInt(match.params.id, 10)))
    ])
      .then(([hotel, reviews]) => {
        setHotel(hotel);
        setReviews(reviews)
      })
      .catch(setError)
      .finally(() => setLoading(false))
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
      <ReviewsWrapper>
        {reviews.map(review => <ReviewItem data={review} />)}
      </ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : String(error)}</Alert>
  );
};

export default Detail;
