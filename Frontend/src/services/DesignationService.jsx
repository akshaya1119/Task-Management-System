import API from "./ApiService";


const DesignationService = {
    getDesignation: async () => {
        try {
            const response = await API.get('/designation/getAll')
            return response.data
        }
        catch (err) {
            throw err
        }
    },
}

export default DesignationService