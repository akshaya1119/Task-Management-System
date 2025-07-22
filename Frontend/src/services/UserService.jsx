import API from "./ApiService";

const UserService = {
      getUsers: async () => {
    try {
      const response = await API.get('/users/admin/users', {
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}

export default UserService;