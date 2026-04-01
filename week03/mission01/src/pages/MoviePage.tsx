import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]> ([]);

    useEffect(() => {
        const fetchmovies = async () => {
            const {data} = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
            setMovies(data.results);
        }
        fetchmovies();
    }, []);
     
    return (
     <div>
        {movies?.map(movie => (
            <MovieCard key={movie.id} movie={movie}/>
        ))}
     </div>
     )
}