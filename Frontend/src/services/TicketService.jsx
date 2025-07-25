import API from "./ApiService";

const TicketService = {
      getTickets: async (userId) => {
    try {
      const response = await API.get(`/ticket/getCounts/${userId}`, {
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getOpenAndDueTicket: async () => {
    try {
      const response = await API.get(`/ticket/getOpenAndDueTicket`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}

export default TicketService;