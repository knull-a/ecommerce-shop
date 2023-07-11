import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ecommerce.shop',
  appName: 'ecommerce-shop',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
