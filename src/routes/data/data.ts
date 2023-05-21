import express, { Router } from 'express';
import deltaEndpoints from './delta/endpoints';

// ------------------------
//      data.ts rooter
// ------------------------

const router: Router = express.Router();

router.use('/delta', deltaEndpoints);

export default router;
