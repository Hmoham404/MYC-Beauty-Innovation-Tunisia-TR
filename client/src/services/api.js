import axios from 'axios';

// Auto-detect API base URL - works for both localhost and production
const API_BASE_URL = (() => {
  if (typeof window !== 'undefined' && window.location) {
    // In production (Vercel), use same domain
    // In development (localhost), use localhost:5000
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000/api/documents';
    }
    // Production - use relative path (same server)
    return '/api/documents';
  }
  return '/api/documents';
})();

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
