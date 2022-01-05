const { ContactsService } = require('../services/ContactsService');
const { MailchimpService } = require('../services/MailchimpService');

class ContactsController {

    async get(req, res) {
        const contactService = new ContactsService();
        const result = await contactService.getAllContacts();

        return res.status(200).json(result);
    }

    async createList(req,res) {
        const mailchimpService = new MailchimpService();
        const response = await mailchimpService.createList();

        return res.status(200).json(response);
    }

    async sync(req, res) {
        const mailchimpService = new MailchimpService();
        const response = await mailchimpService.sync();

        return res.status(200).json(response);
    }

}

module.exports = new ContactsController();