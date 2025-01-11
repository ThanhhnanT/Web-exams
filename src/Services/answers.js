import {get }from '../Utils'

export const getAnswer = async () => {
    const res = await get("answers");
    return res
}