export function standarResponse<T>(success: boolean, data: T | null, error: string = '') {
    return {
      success,
      data,
      error,
    };
  }
  