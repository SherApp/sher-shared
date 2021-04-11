import { AxiosInstance } from 'axios';

type AuthRequiredCallback = () => void;
type RefreshTokenFunc = () => Promise<void>;

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
    return;
  }

  await refreshTokenFunc();

  const originalRequest = error.config;
  return retryInstance(originalRequest);
};
