import axios from "axios";

const API_DOMAIN ="http://localhost:4000/"


// Hàm GET
export const get = async(path) => {
    try{
        const res = await axios.get(API_DOMAIN + path);
        return res.data;
    }
    catch (errors){
        // console.error("Get error: ", errors.res?.data || errors.message);
        if (errors.res){
            alert(`Error: ${errors.res.data.errors} || 'Unknow error from server'`)
        }
        else {
            alert(`Network error. Please check your connection`)
        }
        throw errors;
    }
}

// Hàm POST
export const post = async(path, options) => {
    try{
        const res = await axios.post(API_DOMAIN + path, options, {
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return res.data;
    }
    catch(error){
        console.error('POST error:', error.response?.data || error.message);
        throw error; // Có thể tuỳ chỉnh cách xử lý lỗi
    }
}

// Hàm Delete
export const del = async(path) => {
    try{
        const res = await axios.delete(API_DOMAIN + path);
         return res?.data || null;
    } catch (error) {
        console.error('DELETE error:', error.response?.data || error.message);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};

// Hàm PATCH
export const patch = async(path, options) => {
    try {
        const res = await axios.patch(API_DOMAIN + path, options, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        return res.data;
    }
    catch (e){
        console.error("PATCH: ", e.res.data.e || e.message);
        throw e;
    }
}