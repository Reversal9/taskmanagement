import axios from 'axios';

export const getIssues = async () => {
    try {
        return await axios.get("/issues");
    } catch (error) {
        throw new Error(error.message);
    }
};