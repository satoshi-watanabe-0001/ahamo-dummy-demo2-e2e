export interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}

export interface SmartphoneApiResponse {
  smartphones: unknown[]
  total: number
  page: number
  limit: number
}

export function createMockApiResponse<T>(
  data: T,
  status: 'success' | 'error' = 'success',
  message?: string
): ApiResponse<T> {
  return {
    data,
    status,
    message: message || (status === 'error' ? 'API Error' : 'Success'),
  }
}

export const mockApiRouter = {
  push: jest.fn(),
  back: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
}

export const mockSmartphoneApiService = {
  getSmartphones: jest.fn(),
  getSmartphoneById: jest.fn(),
  getSmartphoneOptions: jest.fn(),
}

export const createMockSmartphoneApiResponse = (
  smartphones: unknown[],
  page: number = 1,
  limit: number = 10
): SmartphoneApiResponse => ({
  smartphones,
  total: smartphones.length,
  page,
  limit,
})
