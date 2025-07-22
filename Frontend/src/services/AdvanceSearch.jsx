import API from "./ApiService";

const SearchService = {
    getSearchResults: async (keyword, filters = {}) => {
        try {
            const filteredParams = Object.fromEntries(
                Object.entries(filters).filter(([key, value]) => value)
            );
              const params = new URLSearchParams({ keyword, ...filteredParams }).toString();
            const response = await API.get(`/ticket/AdvancedSearch?${params}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default SearchService;