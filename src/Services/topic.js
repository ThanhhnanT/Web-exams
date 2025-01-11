import {get} from '../Utils'

export const getTopic = async() =>{
    const response = await get('topics');
    return response
}

export const get1Topic = async(id) =>{
    const response = await get(`topics?id=${id}`);
    return response
}