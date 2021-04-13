import React from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';
import ReviewItem from './ReviewItem';

import { useHotels } from '../../contexts/HotelsContext';

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
  const { loading, error, hotels, reviews } = useHotels();

  const hotelId = parseInt(match.params.id, 10);

  const hotel = hotels.find(hotel => hotel.id === hotelId);
  const hotelReviews = reviews.filter(review => review.hotelId === hotelId);

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
        {hotelReviews.map(review => <ReviewItem data={review} />)}
      </ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : String(error)}</Alert>
  );
};

export default Detail;
