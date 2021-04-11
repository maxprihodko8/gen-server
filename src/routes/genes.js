import express from "express";
import Gen from 'gen/index.js';
import dotenv from 'dotenv';
import fs from 'fs';
import RedisStrategy from "gen/strategy/redis.js";

dotenv.config();
const router = express.Router();

const strategy = new RedisStrategy();
const gen = new Gen(strategy);

const stream = fs.createReadStream(process.env.GEN_FILE);
let hasLoaded = false;
strategy
  .read(stream)
  .then(() => {
    hasLoaded = true;
  })
  .catch(e => console.log(e));

/**
 * Find if the gen is located in the file
 */
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

router.get('/loading-check', (req, res) => {
  res.send({
    loaded: hasLoaded,
  });
});

export default router;