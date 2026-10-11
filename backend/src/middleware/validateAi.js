import { validOptions } from '../prompt/prompt.js'

export function validateAi(req, res, next){
    const { option, content } = res.body;
    if(!validOptions.includes(option)){
        return 
    }
}