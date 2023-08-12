import { removeBearer } from '../bearer-remove';

describe('removeBearer', () => {

  it('should remove "Bearer " from a string', async () => {
    const authorization = 'Bearer abc123';
    const expected = 'abc123';

    const result = await removeBearer(authorization);

    expect(result).toBe(expected);
  });

  it('should return the original string if "Bearer " is not present', async () => {
    const authorization = 'abc123';
    
    const result = await removeBearer(authorization);

    expect(result).toBe(authorization);
  });

});