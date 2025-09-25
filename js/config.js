// Production configuration for Vercel deployment
const config = {
    // API endpoints (using Vercel serverless functions)
    endpoints: {
        example: '/api/example',
        news: '/api/news'
    },
    
    // App settings
    app: {
        name: 'Glancer',
        version: '1.0.0',
        environment: 'production'
    }
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { config, apiCall };
} else {
    window.config = config;
    window.apiCall = apiCall;
}