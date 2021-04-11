import genes from './genes.js';
import express from 'express';

const router = express.Router();

router.use('/genes', genes);

export default router;