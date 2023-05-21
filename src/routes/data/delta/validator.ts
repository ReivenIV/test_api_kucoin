import { Request, Response, NextFunction } from 'express';

// -------------------------------
//      Delta Validator
// -------------------------------

export function validator(req: Request, res: Response, next: NextFunction) {
  if (
    typeof req.body.pair1 !== 'string' ||
    typeof req.body.pair2 !== 'string'
  ) {
    const msg = JSON.stringify({
      msg: 'delta pairs have to be string data type',
    });
    const err: any = new Error(msg);
    err.statusCode = 400;
    return next(err);
  }

  next();
}
