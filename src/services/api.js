import axios from 'axios';

/**
 * API service for communicating with the FastAPI backend
 */

// Get the API base URL from environment variables or use default
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for logging and adding auth headers if needed
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response received from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response interceptor error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.error(`API Error ${status}:`, data);
      
      // Create a more user-friendly error message
      const errorMessage = data?.detail || data?.message || `Server error (${status})`;
      error.userMessage = errorMessage;
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error - no response received:', error.request);
      error.userMessage = 'Network error - please check your connection and try again';
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
      error.userMessage = 'An unexpected error occurred';
    }
    
    return Promise.reject(error);
  }
);

/**
 * API service class with methods for different endpoints
 */
class ApiService {
  /**
   * Fetch the latest MQTT document from the backend
   * @returns {Promise<Object>} Latest MQTT document data
   * @throws {Error} API error with user-friendly message
   */
  static async getLatestMqttDocument() {
    try {
      const response = await apiClient.get('/api/v1/mqtt/latest-mqtt-document');
      
      // Validate response data structure
      const data = response.data;
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format from server');
      }
      
      // Ensure required fields are present
      if (!data.id || !data.payload || data.publish_received_at === undefined) {
        console.warn('Response missing expected fields:', data);
      }
      
      return data;
    } catch (error) {
      // Re-throw with user-friendly message
      const message = error.userMessage || 'Failed to fetch latest MQTT data';
      throw new Error(message);
    }
  }

  /**
   * Health check endpoint to verify API connectivity
   * @returns {Promise<boolean>} True if API is accessible
   */
  static async healthCheck() {
    try {
      // Try to make a simple request to check if the API is accessible
      await apiClient.get('/docs', { timeout: 5000 });
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  /**
   * Get API base URL for debugging purposes
   * @returns {string} Current API base URL
   */
  static getApiBaseUrl() {
    return API_BASE_URL;
  }
}

export default ApiService;

// Export individual methods for convenience
export const { 
  getLatestMqttDocument, 
  healthCheck, 
  getApiBaseUrl 
} = ApiService;
