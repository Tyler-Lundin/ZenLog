'use client';
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function AverageWeightByDuration() {

  const { data, error } = useSwr(`/api/weight/average`, fetcher);
  const isLoading = !data && !error;
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>


  return (
    <div className="p-4 w-full grid place-content-center">
      <div className="text-2xl font-bold text-center">Average Weight</div>
      <h3 className="text-2xl font-bold text-center">{data.averageWeight} lbs</h3>
    </div>
  )
}