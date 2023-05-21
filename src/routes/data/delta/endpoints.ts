import express from "express";
import { calculateDelta } from "./functions.js";
const router = express.Router();



// router.post("/", async (req, res, next) => {
//   try {
//     const [result] = await addDrugIntervalUptake(req.body, req.user.userId);

//     res.status(200).json({
//       msg: `Added to Database successfully`,
//       affectedRows: result.affectedRows,
//       id: result.insertId,
//     });
//   } catch (e) {
//     next(e);
//   }
// });




export default router;