import express, { Request, Response, NextFunction } from 'express';
import { calculateDelta } from './functions';
import { validator } from './validator';
import { errorHandler } from './../../../middlewares/errorHandler';
import {getCurrentUTCTimestamp} from './../../../tools/timestamps';

const router = express.Router();



// ------------------------
//      delta endpoints
// ------------------------

router.post(
  '/',
  validator,
  errorHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const delta: Number = await calculateDelta(
        req.body.pair1,
        req.body.pair2,
      );

    let currentTimestamp: String = getCurrentUTCTimestamp("with_milliseconds")
      res.status(200).json({
        created_at: currentTimestamp,
        delta: delta,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
