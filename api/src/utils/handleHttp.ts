import { Response } from "express";

const handleHttp = (res:Response, err:any) => {
    return res.status(403).json({err:String(err)})
}

export default handleHttp