const express = require('express');

const server = express();

const port = process.env.port || '8888';

//routing
const inventoryRouter = require('./inventory.router');

server.use('/shop/api/', inventoryRouter);

server.listen(port, () => {
    console.log(`Server running on  ${port}`);
});
