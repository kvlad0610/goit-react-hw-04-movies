import { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  console.log(reviews);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=7806431bde1ba6e1fc4d430dc735ffb5&language=en-US`,
      )
      .then(({ data }) => setReviews(data.results));
  }, [id]);

  return (
    <>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content.slice(0, 1000)}...</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </>
  );
};
export default Reviews;
