import { apiUrl } from "./config"
import axios from 'axios';

export const getProduct = async (id) => {
    try{
        const response = await axios({
            url: apiUrl + '/api/products/' + id,
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(error){
        console.log(error)
        return {error: error.message}
    }
}