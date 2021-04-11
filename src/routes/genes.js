import express from "express";
import Gen from 'gen/index.js';
import dotenv from 'dotenv';
import fs from 'fs';
import RedisStrategy from "gen/stratege/redis.js";

dotenv.config();
const router = express.Router();

const strategy = new RedisStrategy();
const gen = new Gen(strategy);

const stream = fs.createReadStream(process.env.GEN_FILE);
strategy
  .read(stream)
  .then()
  .catch(e => console.log(e));

router.get('/find/:query', async (req, res) => {
  const query = req.params.query;

  if (query) {
    if (!gen.isGen(query)) { // the gen is not valid
      return res.send(400);
    }

    if (await gen.isExists(query)) {
      return res.send(200);
    }
  }

  res.send(404);
});

export default router;