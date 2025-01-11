import { get,post } from "../Utils"

export const userLogin = async(email, pass) => {
    const response = await get(`users?email=${email}&&password=${pass}`);
    return response
} 

export const register= async(options) =>{
    const response = await post('users', options);
    return response
}

export const checkEmail = async(email) => {
    const response = await get(`users?email=${email}`);
    return response
} 