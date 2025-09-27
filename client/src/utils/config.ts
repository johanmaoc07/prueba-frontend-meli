

interface Config {
    apiUrl: string;
    environment: string;
    captchaSiteKey: string;
    debug: boolean;
  }
  
  const config: Config = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    environment: process.env.REACT_APP_ENVIRONMENT || 'development',
    captchaSiteKey: process.env.REACT_APP_CAPTCHA_SITE_KEY || '',
    debug: process.env.REACT_APP_DEBUG === 'true',
  };
  
  export default config;