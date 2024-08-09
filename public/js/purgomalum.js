import axios from "axios";

export async function purgomalum(text){
    try{
        const response = await axios.get("https://www.purgomalum.com/service/json?text=" + encodeURIComponent(text));
        return response.data.result;
    }catch(error){
        console.error(error.message);
        return "error occured";
    }
} 
