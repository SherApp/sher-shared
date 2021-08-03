import axios from 'axios';
import {
  AUTH_REQUIRED_MESSAGE,
  refreshTokenInterceptor
} from './refreshTokenInterceptor';

jest.mock('axios', () => jest.fn());

it('throws an error on refresh token 401 result', async () => {
  const refreshEndpoint = '/refresh';
  const authRequiredHandler = jest.fn();

  const promise = refreshTokenInterceptor(
    axios,
    authRequiredHandler,
    jest.fn(),
    refreshEndpoint
  )({
    // @ts-ignore
    response: {
      status: 401
    },
    config: {
      url: `https://api${refreshEndpoint}`
    }
  });

  expect(authRequiredHandler).toHaveBeenCalled();
  await expect(promise).rejects.toThrowError(AUTH_REQUIRED_MESSAGE);
});

it('throws an error on failed refresh', async () => {
  const refreshFn = jest.fn().mockRejectedValue(new Error());
  const authRequiredHandler = jest.fn();

  const promise = refreshTokenInterceptor(
    axios,
    authRequiredHandler,
    refreshFn,
    '/refresh'
  )({
    // @ts-ignore
    response: {
      status: 401
    },
    config: {
      url: 'https://api/someEndpoint'
    }
  });

  expect(refreshFn).toHaveBeenCalled();
  await expect(promise).rejects.toThrowError(AUTH_REQUIRED_MESSAGE);
  expect(authRequiredHandler).toHaveBeenCalledWith();
});

it('retries on successful token refresh', async () => {
  const config = {
    url: 'https://api/someEndpoint'
  };

  await refreshTokenInterceptor(
    axios,
    jest.fn(),
    jest.fn(),
    '/refresh'
  )({
    // @ts-ignore
    response: {
      status: 401
    },
    config
  });

  expect(axios).toHaveBeenCalledWith(config);
});
