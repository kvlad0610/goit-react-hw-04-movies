import axios from "axios";


const BASE_URL = 'https://developers.themoviedb.org/3/'
const API_KEY = '7806431bde1ba6e1fc4d430dc735ffb5'

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key:API_KEY,
}


const getMovies = () => {
  return axios
    .get(`trending/all/day`);
}

export default getMovies;