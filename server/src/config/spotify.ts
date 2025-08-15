import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "@/config";
import axios from "axios";
import { AppError } from "@/interface/middleware";
export const getAccessToken = async (): Promise<string> => {
    try {
        const authOptions = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(
                    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
                ).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'grant_type=client_credentials'
        };

        const response = await axios(authOptions);
        return response.data.access_token;
    } catch (error) {
        throw new AppError("Failed to get Spotify access token", 500, "SPOTIFY_AUTH_ERROR");
    }
}