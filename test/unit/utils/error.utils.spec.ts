import { ErrorUtils } from '../../../src/utils/error.utils';

describe('Test utils Errors - throwSpecificError(response: number)', () => {
  it('should be able return error 400.', () => {
    try {
      ErrorUtils.throwSpecificError(400);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should be able return error 403.', () => {
    try {
      ErrorUtils.throwSpecificError(403);
    } catch (error) {
      expect(error.status).toBe(403);
      expect(error.response).toBe('Client does not have permission.');
      expect(error.message).toBe('Client does not have permission.');
    }
  });

  it('should be able return error 404.', () => {
    try {
      ErrorUtils.throwSpecificError(404);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
      expect(error.message).toBe('The specified resource is not found.');
    }
  });

  it('should be able return error 500.', () => {
    try {
      ErrorUtils.throwSpecificError(500);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.response).toBe('Unknown server error. Typically a server bug.');
      expect(error.message).toBe('Unknown server error. Typically a server bug.');
    }
  });

  it('should be able return error 504.', () => {
    try {
      ErrorUtils.throwSpecificError(504);
    } catch (error) {
      expect(error.status).toBe(504);
      expect(error.response).toBe('Request timeout exceeded.');
      expect(error.message).toBe('Request timeout exceeded.');
    }
  });
});
