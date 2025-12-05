import { NextFunction, Request, Response } from "express";

export function accessToken(req: Request, res:Response, nest: NextFunction) {
    const cookies = req.signedCookies;
    const at = cookies.at;

    if(!at) {
        //bearer token
        //header Authorization Token
        //const hat = (req.header['Authorization'] as string || '');
    }else{
        req.aToken = at;

    }
}

export  function validAccess(token: string) {
    return token=='test';
}

export function auth(req: Request, res: Response,next:NextFunction) {
      
}