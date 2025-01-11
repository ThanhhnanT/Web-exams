import {get }from '../Utils'

export const getAnswer = async (id) => {
    const res = await get(`answers?userID=${id}`);
    return res
}