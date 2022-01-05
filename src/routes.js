const routes = require('express').Router();

const ContactsController = require('./controllers/ContactsController');

routes.get('/', ContactsController.get);
routes.get('/list/create', ContactsController.createList);
routes.get('/contacts/sync', ContactsController.sync);
routes.get("/status", (req, res) => {
    return res.status(200).send('ok');
});

module.exports = routes;