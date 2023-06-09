import { Request, Response, NextFunction } from 'express';

// -----------------------
//      Delta Validator
// -----------------------

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

  if (
    req.body.pair1 === undefined ||
    req.body.pair1 === null ||
    req.body.pair1 === '' ||
    req.body.pair2 === undefined ||
    req.body.pair2 === null ||
    req.body.pair2 === ''
  ) {
    const msg = JSON.stringify({
      msg: 'delta pairs are null/undefined or empty',
    });
    const err: any = new Error(msg);
    err.statusCode = 400;
    return next(err);
  }

  if (typeof req.body.timezone !== 'string') {
    const msg = JSON.stringify({
      msg: 'timezone has to be string data type',
    });
    const err: any = new Error(msg);
    err.statusCode = 400;
    return next(err);
  }

  if (
    typeof req.body.timezone === undefined ||
    req.body.timezone === null ||
    req.body.timezone === ''
  ) {
    const msg = JSON.stringify({
      msg: 'timezone is null/undefined or empty',
    });
    const err: any = new Error(msg);
    err.statusCode = 400;
    return next(err);
  }
  next();
}
