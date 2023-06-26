import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { createServer } from 'http';
import jsxRender from './utils/jsxRender';
import indexRouter from './routes/render/indexRouter';
import apiRouter from './routes/api/apiRouter';
import resLocals from './middlewares/resLocals';
import sessionParser from './middlewares/sessionParser';
import { upgradeCb, wsServer } from './ws/wsServer';
import connectionCb from './ws/connection';

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionParser);
app.use(resLocals);

app.use('/', indexRouter);
app.use('/api', apiRouter);

const server = createServer(app);

server.on('upgrade', upgradeCb);
wsServer.on('connection', connectionCb);

server.listen(PORT, () => console.log(`App has started on port ${PORT}`));
