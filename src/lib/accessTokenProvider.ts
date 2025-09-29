"use server";
import axios from "axios";

let instance: string;

export async function accessTokenProvider() {
  if (!instance) {
    instance = await getAccessToken();
  }
  return {
    instance,
  };
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.QURAN_FDN_CLIENT_ID;
  const clientSecret = process.env.QURAN_FDN_CLIENT_SECRET;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await axios({
      method: "post",
      url: process.env.QURAN_FDN_AUTH_URL,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "grant_type=client_credentials&scope=content",
    });

    return response.data.access_token as string;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}
