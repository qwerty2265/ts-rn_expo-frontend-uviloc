import axios from "axios";
import { TrackerType } from "../types/tracker";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const getTrackerByUsername = async ({ username } : { username: string}): Promise<TrackerType[]> => {
    try {
        const response = await axios.get(`${apiUrl}/api/trackers/${username}`);
        return response.data
    } 
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
            throw new Error(`Server responded with error: ${error.response?.status}, ${error.response?.data}`);
        } 
        else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred');
        }
    }
}