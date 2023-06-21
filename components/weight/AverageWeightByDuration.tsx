import { authOptions } from "@/server/authOptions";
import { getServerSession } from "next-auth";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function AverageWeightByDuration() {

  const session = await getServerSession(authOptions);
  const { data, error } = useSwr(`/api/weight/average`, fetcher);
  const isLoading = !data && !error;
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <div className="p-4 w-full grid place-content-center">
      <div className="text-2xl font-bold text-center">
        Average Weight
      </div>
      <div className="text-2xl font-bold text-center">
        {data.averageWeight} lbs
      </div>
      <div className="text-2xl font-bold text-center">
        {data.averageWeight} lbs
      </div>
    </div>
  )




}
