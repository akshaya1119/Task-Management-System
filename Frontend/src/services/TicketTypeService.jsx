import API from "./ApiService";

const TicketTypeService = {
      getTicketTypes: async () => {
    try {
      const response = await API.get('/tickettype/getAll');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}

export default TicketTypeService;