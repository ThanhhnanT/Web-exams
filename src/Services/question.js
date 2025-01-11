import { get } from '../Utils'

export const questionList= async(id) => {
    const res = await get(`questions?topicId=${id}`);
    return res
}