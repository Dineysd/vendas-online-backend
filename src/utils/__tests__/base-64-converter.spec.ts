import { authorizantionToLoginPayload } from '../base-64-converter';

describe('authorizantionToLoginPayload', () => {

  it('should return undefined if authorization is invalid', () => {
    const authorization = 'invalid';
    expect(authorizantionToLoginPayload(authorization)).toBeUndefined();
  });

  it('should return LoginPayload if authorization is valid', () => {
    const authorization = 'Bearer.validToken.signature';
    const expectedPayload = {
      sub: '123',
      name: 'John Doe'
    };

    jest.spyOn(Buffer, 'from').mockReturnValue({
      toString: () => JSON.stringify(expectedPayload)
    } as any);

    expect(authorizantionToLoginPayload(authorization)).toEqual(expectedPayload);
  });

});