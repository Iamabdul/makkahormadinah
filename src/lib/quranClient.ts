import { Chapter, ChaptersResponse } from "@/shared/schema";
import axios from "axios";
import { accessTokenProvider } from "./accessTokenProvider";

export function quranClient() {
  const getChapters = async (): Promise<Chapter[]> =>
    (await apiRequest<ChaptersResponse>("chapters")).chapters;

  return {
    getChapters,
  };
}

export async function apiRequest<T>(path: string): Promise<T> {
  try {
    const accessToken = (await accessTokenProvider()).instance;
    const response = await axios({
      method: "GET",
      url: process.env.QURAN_FDN_URL + path,
      headers: {
        "x-auth-token": accessToken,
        "x-client-id": process.env.QURAN_FDN_CLIENT_ID,
      },
    });

    return response.data as T;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error;
  }
}
