import useFetch from "./useFetch";

export const Lmao = () => {
  const { data, loading } = useFetch("url", "GET");
  return <div>{loading && data}</div>
};
