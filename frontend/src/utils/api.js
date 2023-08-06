import axios from 'axios';
import jwtDecode from 'jwt-decode';

const TOKEN_STORAGE_KEY = 'token';
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';
const apiKey = process.env.NODE_ENV === 'production'
  ? process.env.VUE_APP_BACKEND_PRODUCTION_URL
  : process.env.VUE_APP_BACKEND_LOCAL_URL;


// Create a variable to track if token refresh is in progress
let isRefreshing = false;

// Create a queue to hold the pending requests during token refresh
let refreshQueue = [];

const api = axios.create({
  baseURL: apiKey,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});


const saveTokens = (token, refreshToken) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken)
}

const getAccessToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
}

const clearTokens = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
}

const decodeToken = (token) => {
  try {
    const decodedToken = jwtDecode(token)
    return decodedToken
  }
  catch(error) {
    return null
  }
}

const isAccessTokenExpired = () => {

  const token = getAccessToken()
  if (!token) {
    return true
  }
  
  const decodedToken = decodeToken(token)
  if (!decodedToken || !decodedToken.exp) {
    return true
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;

}

const refreshToken = async() => {
  const storedRefreshToken = getRefreshToken();

  try {
    const res = await api.post('/token/refresh', {
      refreshToken: storedRefreshToken
    })

    const { token, refreshToken } = res.data;

    saveTokens(token, refreshToken)

    return token

  }
  catch (error) {
    // Handle token refresh error
    console.error(error);
    clearTokens()
    throw new Error('Failed to refresh access token');
  }
}

// Function to handle token refresh and return a new access token
const getNewAccessToken = async() => {
  if (isAccessTokenExpired()) {
      if (!isRefreshing) {

        isRefreshing = true;
        
        try {
          const newAccessToken = await refreshToken();
  
          processRefreshQueue(newAccessToken);
  
          return newAccessToken
        }
        catch (error) {
          // Handle token refresh error, e.g., redirect to login page
          clearTokens()
        } finally {
          // Set isRefreshing back to false after refresh is done
          isRefreshing = false;
        }

      }
  } else {
    return getAccessToken();
  }
}

// Function to process the pending requests in the refresh queue
function processRefreshQueue(accessToken) {
  // Resolve all the pending promises in the refresh queue
  refreshQueue.forEach((resolve) => {
    resolve(accessToken);
  });

  // Clear the refresh queue
  refreshQueue = [];
}

api.interceptors.request.use(
  async (config) => {
    const storedToken = await getAccessToken()
    
    //Validate token only after user logged in
    if (storedToken) {
      const token = await getNewAccessToken();
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default api;
