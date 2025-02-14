import { isNumber } from "./number"

export const getParams = (page:any, limit: any, sortBy:any = 'updatedAt',order:any = 'asc',columns:Array<string>) => {
    if(!isNumber(page)){
        page = 1;
    }
    if(!isNumber(limit)){
        limit = 10;
    }
    if(!columns.includes(sortBy)){
        sortBy = 'updatedAt';
    }
    if(order !== 'asc'){
        order = 1;
    }else{
        order = -1;
    };
    const skip = (Number(page) - 1) * Number(limit);
    return {
        page,
        limit,
        sortBy,
        order,
        skip
    }
} 