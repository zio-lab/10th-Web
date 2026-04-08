import { useState } from "react";
import type { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MoviePage() {
  const [page, setPage] = useState<number>(1);
  const { category } = useParams<{ category: string }>();

  const { data, isPending, error } = useCustomFetch<MovieResponse>(
    category ? `https://api.themoviedb.org/3/movie/${category}` : "",
    {
      language: "ko-KR",
      page,
    }
  );

  const movies = data?.results ?? [];

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-red-500">에러가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 flex items-center justify-center gap-6">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="cursor-pointer rounded-lg bg-[#dda5e3] px-6 py-3 text-white shadow-md transition-all duration-300 hover:bg-[#c990d0] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          이전
        </button>

        <span>{page} 페이지</span>

        <button
          type="button"
          onClick={() => setPage((prev) => prev + 1)}
          className="cursor-pointer rounded-lg bg-[#a0c99f] px-6 py-3 text-white shadow-md transition-all duration-300 hover:bg-[#8bb88a]"
        >
          다음
        </button>
      </div>

      {isPending && (
        <div className="flex h-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && !error && (
        <div className="grid grid-cols-2 gap-4 p-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}