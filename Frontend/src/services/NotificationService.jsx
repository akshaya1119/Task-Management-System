import API from "./ApiService";


const NotificationService = {

      getNotifications: async (userId) => {
    try {
      const response = await API.get(`/notification/getNotification/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  markAllAsRead : async(userId) =>{
    try{
        const response = await API.put(`/notification/mark-all-read/${userId}`);
        return response.data
    }
    catch(error){
        throw error
    }
  },

  markAsRead : async(notificationId) =>{
     try{
        const response = await API.put(`/notification/mark-as-read/${notificationId}`);
        return response.data
    }
    catch(error){
        throw error
    }
  }
}

export default NotificationService