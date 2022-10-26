import axios from '../utils/axios';
export const validateNationalId = async (nationalId: string) => {
    try {
        let response = await axios.post(`/api/auth/validateNationalId`,
            {
                nationalId: nationalId
            });
        return response.data as {
            status: boolean,
            message: string
        };
    } catch (error: any) {
        console.log(error);
        return {
            status: false,
            message: error.response.data.message
        };
    }
}