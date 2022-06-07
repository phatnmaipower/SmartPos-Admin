import { ApiI } from "@/types/api/api";
import { inject } from "vue";

export const getRuntimeConfig = async (): Promise<ApiI> => {
  const res = await fetch("./runtimeConfig.json");
  const data: ApiI = await res.json();

  const runtimeConfig: ApiI = data;

  return runtimeConfig;
};
