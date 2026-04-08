import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";
import type {
  Cast,
  CreditsResponse,
  Crew,
  MovieDetail,
} from "../types/movie";

export default function MovieDetailPage() {
  const { movieId, category } = useParams<{ movieId: string; category: string }>();
  const navigate = useNavigate();
  const detailParams = useMemo(
  () => ({
    language: "ko-KR",
  }),
  []
);

  const {
  data: movieDetail,
  isPending: isDetailPending,
  error: detailError,
} = useCustomFetch<MovieDetail>(
  movieId ? `https://api.themoviedb.org/3/movie/${movieId}` : "",
  detailParams
);

  const {
    data: creditsData,
    isPending: isCreditsPending,
    error: creditsError,
  } = useCustomFetch<CreditsResponse>(
    movieId ? `https://api.themoviedb.org/3/movie/${movieId}/credits` : ""
  );

  const isPending = isDetailPending || isCreditsPending;
  const error = detailError || creditsError;

  const casts: Cast[] = creditsData?.cast.slice(0, 10) ?? [];
  const directors: Crew[] =
    creditsData?.crew.filter((crewMember) => crewMember.job === "Director") ?? [];

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movieDetail) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-red-500 text-lg">상세 정보를 불러오는 중 오류가 발생했습니다.</p>
        <button
          type="button"
          onClick={() => navigate(category ? `/movies/${category}` : "/")}
          className="px-6 py-3 rounded-lg bg-[#dda5e3] text-white hover:bg-[#c990d0] transition-all duration-300"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div
        className="relative h-[420px] w-full bg-cover bg-center"
        style={{
          backgroundImage: movieDetail.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`
            : "none",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto -mt-48 max-w-6xl px-8">
        <div className="flex flex-col gap-10 md:flex-row">
          {movieDetail.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
              alt={`${movieDetail.title} 포스터`}
              className="w-72 rounded-2xl shadow-2xl"
            />
          ) : (
            <div className="flex h-[408px] w-72 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-400 shadow-2xl">
              이미지 없음
            </div>
          )}

          <div className="flex-1 pt-6">
            <p className="mb-2 text-pink-300">{movieDetail.tagline}</p>

            <h1 className="mb-3 text-4xl font-bold">{movieDetail.title}</h1>

            <p className="mb-4 text-zinc-300">{movieDetail.original_title}</p>

            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-zinc-800 px-3 py-1">
                개봉일 {movieDetail.release_date}
              </span>
              <span className="rounded-full bg-zinc-800 px-3 py-1">
                평점 {movieDetail.vote_average.toFixed(1)}
              </span>
              <span className="rounded-full bg-zinc-800 px-3 py-1">
                러닝타임 {movieDetail.runtime}분
              </span>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {movieDetail.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-[#dda5e3] px-3 py-1 text-sm text-white"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="mb-3 text-2xl font-semibold">줄거리</h2>
              <p className="leading-8 text-zinc-200">{movieDetail.overview}</p>
            </div>

            <div className="mb-8">
              <h2 className="mb-3 text-2xl font-semibold">감독</h2>
              <div className="flex flex-wrap gap-3">
                {directors.length > 0 ? (
                  directors.map((director) => (
                    <span
                      key={director.id}
                      className="rounded-lg bg-zinc-800 px-4 py-2"
                    >
                      {director.name}
                    </span>
                  ))
                ) : (
                  <p className="text-zinc-400">감독 정보가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pb-16">
          <h2 className="mb-6 text-2xl font-semibold">출연진</h2>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {casts.map((actor) => (
              <div
                key={actor.id}
                className="overflow-hidden rounded-2xl bg-zinc-900 shadow-lg"
              >
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                    alt={actor.name}
                    className="h-72 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-72 w-full items-center justify-center bg-zinc-800 text-zinc-400">
                    이미지 없음
                  </div>
                )}

                <div className="p-4">
                  <p className="font-semibold">{actor.name}</p>
                  <p className="mt-1 text-sm text-zinc-400">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}