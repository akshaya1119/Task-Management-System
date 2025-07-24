import API from "./ApiService";


const DepartmentService = {
    getDepartment: async () => {
        try {
            const response = await API.get('/department/getAll')
            return response.data
        }
        catch (err) {
            throw err
        }
    },
}

export default DepartmentService