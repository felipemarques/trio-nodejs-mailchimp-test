const mailchimp = require("@mailchimp/mailchimp_marketing");
const { ContactsService } = require("./ContactsService");

class MailchimpService {

    constructor() {
        
        mailchimp.setConfig({
            apiKey: process.env.MAILCHIMP_API_KEY,
            server: process.env.MAILCHIMP_API_REGION,
        });

    }

    async createList() {

        try {
            const response = await mailchimp.lists.createList({
                name: "Felipe Marques",
                permission_reminder: "permission_reminder",
                email_type_option: true,
                contact: {
                company: "company",
                address1: "address1",
                city: "city",
                country: "country",
                },
                campaign_defaults: {
                from_name: "Felipe Marques",
                from_email: "contato@felipemarques.com.br",
                subject: "My Campaign",
                language: "en-us",
                },
            });
            
            return response;

        } catch (e) {
            return [];
        }
    }

    async ping() {
        const response = await mailchimp.ping.get();
        return response;
    }

    async sync() {

        const contactsService = new ContactsService();
        let allContacts = await contactsService.getAllContacts();
          
        allContacts = allContacts.map(function(obj) {
            return {
                'email_address': obj.email,
                'status': 'subscribed',
                'merge_fields': {
                    'FNAME': obj.firstName,
                    'LNAME': obj.lastName
                }
            }
        });

        const response = await mailchimp.lists.batchListMembers(process.env.MAILCHIMP_LIST_ID, {
            members: allContacts,
        });

        const syncedContacts = response.new_members.map(function(obj) {
            return {
                'firstName': obj.merge_fields.FNAME,
                'lastName': obj.merge_fields.LNAME,
                'email': obj.email_address,
            }
        });

        return {
            "syncedContacts": response.total_created,
            "contacts": syncedContacts
        };
    }

}

module.exports = { 
    MailchimpService 
};