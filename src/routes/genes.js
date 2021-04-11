import express from "express";
import Gen from 'gen';
import dotenv from 'dotenv';
import fs from 'fs';
import RedisStrategy from "gen/storage/redis";

dotenv.config();
const router = express.Router();

const stream = fs.createReadStream(process.env.GEN_FILE);
const strategy = new RedisStrategy(stream);
const gen = new Gen(strategy);
gen.read()
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