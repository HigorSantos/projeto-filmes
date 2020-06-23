import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
      api_key: process.env.REACT_APP_MOVIES_KEY,
      language: "pt-BR",
      include_adult: false,
    }
});


/*

https://api.themoviedb.org/3/discover/movie?api_key=e188b9dabc206fb3f36d47f212012846&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=6&with_genres=12%2C35%2C10402%2C10751&without_genres=80%2C18%2C27%2C53%2C10752&with_runtime.lte=120

*/
export default api;