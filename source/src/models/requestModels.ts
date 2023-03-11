export interface requestModel  {
    method?:string,
    path?:string | null,
    data?: any,
    query?:null | string,
    headers?:any,
    newUrl?:string
}