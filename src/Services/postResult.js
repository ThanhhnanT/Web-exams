import { get, post } from "../Utils";

export const postResult = async(options) => {
    const response = await post ("answers",options);
    return response
}

export const getResult = async(id) => {
    const response = await get(`answers?id=${id}`)
    return response;
}