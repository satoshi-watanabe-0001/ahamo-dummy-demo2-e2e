export const setupMockRouter = () => ({
  push: jest.fn(),
  back: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
})

export const setupMockParams = (params: Record<string, string>) => ({
  ...params,
})

export const mockNextNavigation = () => {
  const mockRouter = setupMockRouter()

  jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => mockRouter),
    useParams: jest.fn(() => ({})),
  }))

  return { mockRouter }
}

export const mockApiService = () => {
  jest.mock('@/services/api', () => ({
    SmartphoneApiService: {
      getSmartphones: jest.fn(),
      getSmartphoneById: jest.fn(),
      getSmartphoneOptions: jest.fn(),
    },
  }))
}
