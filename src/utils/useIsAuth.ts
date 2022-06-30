import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching, error }] = useMeQuery({
    requestPolicy: "network-only",
  });
  useEffect(() => {
    if (!fetching && !data?.me) {
      console.log("NOT AUTH");
      // window.location.href = "/";
    }
    if (data?.me) {
      console.log("ME ", data.me);
    }
  }, [data]);
};
