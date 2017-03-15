import ImsRequest from '../src/ImsRequest.js';

test('header should be content-type json', () => {
  const {headers} = ImsRequest.buildRequest('GET', 'username', 'password');
  expect(headers).toHaveProperty('Content-Type', 'application/json');
});