import { useState, useEffect } from 'react';
import axios from 'axios';

const Cast = ({ id }) => {
  const [actors, setActors] = useState(null);
  console.log(actors);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7806431bde1ba6e1fc4d430dc735ffb5&language=en-US`,
      )
      .then(({ data }) => setActors(data.cast));
  }, [id]);

  return (
    <ul>
      {actors
        ? actors.map(actor => (
            <>
              {actor.profile_path && (
                <li key={actor.id}>
                  {actor.profile_path && (
                    <img
                      src={
                        'https://image.tmdb.org/t/p/w300' + actor.profile_path
                      }
                      alt=""
                      width="50"
                    />
                  )}

                  <p>{actor.name}</p>
                  <p>Character : {actor.character}</p>
                </li>
              )}
            </>
          ))
        : null}
    </ul>
  );
};

export default Cast;
