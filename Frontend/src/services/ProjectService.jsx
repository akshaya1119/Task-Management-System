import API from "./ApiService";

const ProjectService = {
      getProjects: async () => {
    try {
      const response = await API.get('/project/getAll'
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}

export default ProjectService;