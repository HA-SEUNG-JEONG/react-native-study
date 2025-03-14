export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
};

export const fetchMovies = async ({ query }: { query: string }) => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
              query
          )}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(`${endpoint}`, {
        method: "GET",
        headers: TMDB_CONFIG.headers
    });
    if (!response.ok) {
        // @ts-ignore
        throw Error("Failed to fetch movies", response.statusText);
    }
    const result = await response.json();
    return result;
};

// const url =
//     "https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1";
// const options = {
//     method: "GET",
//     headers: {
//         accept: "application/json",
//         Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzAxN2Q3MWY0NjNjOWYyMjQ3YzdmMTU5ODlkMDk2ZSIsIm5iZiI6MTc0MTkxODM0OC45MjMsInN1YiI6IjY3ZDM5MDhjNTA2Y2M5MGQ2NDAyNzBiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Elp3_gY0xIbu1BbAkeWxI3mOrM1cR_CjT-iNQ2_YfYE"
//     }
// };

// fetch(url, options)
//     .then((res) => res.json())
//     .then((json) => console.log(json))
//     .catch((err) => console.error(err));
