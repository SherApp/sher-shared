import { AxiosInstance } from 'axios';

type AuthRequiredCallback = () => void;
type RefreshTokenFunc = () => Promise<any>;

export const AUTH_REQUIRED_MESSAGE = 'Auth required';

export const refreshTokenInterceptor = (
  retryInstance: AxiosInstance,
  onAuthRequired: AuthRequiredCallback,
  refreshTokenFunc: RefreshTokenFunc,
  refreshEndpoint: string
) => async (error: any) => {
  if (error.response.status !== 401) {
    return;
  }

  const isRefreshTokenRequest = error.config.url.endsWith(refreshEndpoint);

  if (isRefreshTokenRequest) {
    onAuthRequired();
    throw new Error(AUTH_REQUIRED_MESSAGE);
  }

  try {
    await refreshTokenFunc();
  } catch (e) {
    onAuthRequired();
    throw new Error(AUTH_REQUIRED_MESSAGE);
  }

  const originalRequest = error.config;
  return retryInstance(originalRequest);
};
