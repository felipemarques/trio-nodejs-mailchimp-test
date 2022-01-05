
const axios = require('axios');
const {ContactsService, CONTACTS_ENDPOINT} = require('../../src/services/ContactsService');

jest.mock('axios');

describe("Contacts api tests", () => {

  describe("when getAllContacts returns successfuly", () => {
    it("should return users list", async () => {

      // given
      const users = [
        { id: 1, firstName: "Johan", lastName: "Rau" },
        { id: 2, firstName: "Morgan", lastName: "Breitenberg" },
      ];
      axios.get.mockResolvedValueOnce(users);

      // // when
      const contactService = new ContactsService();
      const result = await contactService.getAllContacts();

      // // then
      expect(axios.get).toHaveBeenCalledWith(CONTACTS_ENDPOINT);
      expect(result).toEqual(users);
    });
  });

  describe("when getAllContacts API call fails", () => {
    it("should return empty users list", async () => {
      // given
      const message = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(message));

      // when
      const contactService = new ContactsService();
      const result = await contactService.getAllContacts();

      // then
      expect(axios.get).toHaveBeenCalledWith(CONTACTS_ENDPOINT);
      expect(result).toEqual([]);
    });
  });
});