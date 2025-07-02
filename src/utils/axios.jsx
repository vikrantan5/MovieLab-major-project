import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmI5YmIxNjFjNGEwOTdjZTI3ODAyZjJlYWMwYThjZCIsIm5iZiI6MTc1MDkzMzUxNS44NzEsInN1YiI6IjY4NWQyMDBiOGYwZjQyZTliMTdiM2Q4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gYNNeFEkUKRQiZLlvwOoHfitqMdfxCvy3GWvv9EoAqc'
  }
});

export default instance;
