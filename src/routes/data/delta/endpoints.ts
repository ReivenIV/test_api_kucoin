import express, {Request, Response, NextFunction} from 'express';
import { calculateDelta } from './functions';
const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {

    
  try {

    
     const delta: Number = await calculateDelta(req.body.pair1, req.body.pair2)

     console.log("delta" +  delta);

     res.status(200).json({        
         delta: delta
     })

  } catch (error) {
    next(error);
  }
});

export default router;
