const axios = require('axios');
const CONTACTS_ENDPOINT = process.env.CONTACTS_ENDPOINT;

class ContactsService {

    constructor() {
        
    }

    async getAllContacts()
     {
        try {
            const response = await axios.get(`${CONTACTS_ENDPOINT}`);
            return response && response.data ? response.data : response;
        } catch (e) {
            return [];
        }
    }

}

module.exports = {
    ContactsService,
    CONTACTS_ENDPOINT
};