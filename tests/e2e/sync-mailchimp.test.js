
const axios = require('axios');
const {MailchimpService} = require('../../src/services/MailchimpService');

jest.mock('axios');

describe("Mailchimp api tests", () => {

  describe("when sync works", () => {
    it("should return result from synced contacts", async () => {

      // given
      const response =  {
          "syncedContacts": 0,
          "contacts": []
      };;
      axios.get.mockResolvedValueOnce(response);

      // // when
      const mailchipService = new MailchimpService();
      const result = await mailchipService.sync();

      // // then
      expect(result).toEqual(response);
    });
  });

});