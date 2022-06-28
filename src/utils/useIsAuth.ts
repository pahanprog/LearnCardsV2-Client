import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching, error }] = useMeQuery();
  useEffect(() => {
    if (!fetching && !data?.me) {
      window.location.href = "/";
    }
    if (data?.me) {
      console.log("ME ", data.me)
    }
  }, [data]);
};
