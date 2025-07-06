// API service utility for Vercel deployment
const API_BASE = '/api';

export const api = {
  // Authentication endpoints
  auth: {
    signup: async (userData) => {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || 'Signup failed');
      }
      
      return response.json();
    },
    
    signin: async (credentials) => {
      const response = await fetch(`${API_BASE}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || 'Signin failed');
      }
      
      return response.json();
    },
  },
  
  // Test authentication endpoints (no database required)
  testAuth: {
    signup: async (userData) => {
      const response = await fetch(`${API_BASE}/test-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || 'Test signup failed');
      }
      
      return response.json();
    },
    
    signin: async (credentials) => {
      const response = await fetch(`${API_BASE}/test-signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || 'Test signin failed');
      }
      
      return response.json();
    },
  },
  
  // Profile endpoints
  profile: {
    get: async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || 'Profile fetch failed');
      }
      
      return response.json();
    },
  },
  
  // Health check
  health: async () => {
    const response = await fetch(`${API_BASE}/health`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Health check failed');
    }
    
    return response.json();
  },
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}; 