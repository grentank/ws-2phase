import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../../db/models';

require('dotenv').config();

const apiAuthRouter = express.Router();

apiAuthRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        phone,
        name,
        hashpass: await bcrypt.hash(password, 10),
      },
    });
    if (!created) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    req.session.user = { id: user.id, name: user.name, email: user.email };

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

apiAuthRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'no user full data' });
  }
  const currentUser = await User.findOne({
    where: { email },
  });
  if (!currentUser || !(await bcrypt.compare(password, currentUser.password))) {
    return res.status(401).json({ message: 'email not exists' });
  }
  req.session.user = {
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
  };
  res.sendStatus(200);
});

apiAuthRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie(process.env.COOKIE_NAME);
  res.sendStatus(200);
});

export default apiAuthRouter;
