import genes from './genes';
import express from 'express';

const router = express.Router();

router.use('/genes', genes);

export default router;