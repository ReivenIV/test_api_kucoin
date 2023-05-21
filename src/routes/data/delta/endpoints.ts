import express, { Request, Response, NextFunction } from 'express';
import { calculateDelta } from './functions';
import { validator } from './validator';
import { errorHandler } from './../../../middlewares/errorHandler';
import { getCurrentUTCTimestamp } from './../../../tools/timestamps';

const router = express.Router();

// ------------------------
//      delta endpoints
// ------------------------

router.post(
  '/v1',
  validator,
  errorHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const delta: Number = await calculateDelta(
        req.body.pair1,
        req.body.pair2,
      );

      let currentTimestamp: String =
        getCurrentUTCTimestamp('with_milliseconds');
      res.status(200).json({
        pair1: req.body.pair1,
        pair2: req.body.pair2,
        delta: delta,
        created_at: currentTimestamp,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
