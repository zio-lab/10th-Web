import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <div>
            <img src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> 
        </div>
    )
}    