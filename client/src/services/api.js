import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/documents';

const api = {
    upload: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    process: async (data) => {
        const response = await axios.post(`${API_BASE_URL}/process`, data);
        return response.data;
    },

    getDownloadUrl: (filename) => `${API_BASE_URL}/download/${filename}`,
    getViewUrl: (filename) => `${API_BASE_URL}/view/${filename}`
};

export default api;
