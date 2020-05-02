export const appConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  socketServer: process.env.REACT_APP_SOCKET_SERVER || '',
  sentryDsn: process.env.REACT_APP_SENTRY_DSN,
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (...args: any[]): any => {};
