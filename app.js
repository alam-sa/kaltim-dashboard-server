const cors = require('cors');
const express = require('express');
const router = require('./routes');
const errorHandler = require('./middlewares/error_handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send(`
  <div style="display: flex; justify-content: center; align-items: center; background-color: black; color: pink; height: 100vh; width: 100vw">
    <h1><b> Welcome to KaltimNet API </b><h2><i> &ensp; You've successfully run this service! </i></h2></h1>
  </div>
`));

app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`service running at port ${port}`));