import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
)

global.Response = jest.fn().mockImplementation((body, init) => ({
  ok: init?.status ? init.status >= 200 && init.status < 300 : true,
  status: init?.status || 200,
  statusText: init?.statusText || 'OK',
  headers: new Map(Object.entries(init?.headers || {})),
  json: () => Promise.resolve(JSON.parse(body || '{}')),
  text: () => Promise.resolve(body || ''),
  blob: () => Promise.resolve(new Blob([body || ''])),
}))

global.Request = jest.fn().mockImplementation((url, init) => ({
  url: url,
  method: init?.method || 'GET',
  headers: new Map(Object.entries(init?.headers || {})),
  body: init?.body,
}))

global.BroadcastChannel = jest.fn().mockImplementation(() => ({
  postMessage: jest.fn(),
  close: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}))

configure({
  testIdAttribute: 'data-testid',
})

import { server } from './src/mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('./src/lib/logger', () => {
  const mockLogger = {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  }

  return {
    logger: mockLogger,
    logError: jest.fn((message, error, metadata) => {
      mockLogger.error(`[ERROR] ${new Date().toISOString()} ${message}`, { error, ...metadata })
    }),
    logWarn: jest.fn((message, metadata) => {
      mockLogger.warn(`[WARN] ${new Date().toISOString()} ${message}`, metadata)
    }),
    logInfo: jest.fn((message, metadata) => {
      mockLogger.info(`[INFO] ${new Date().toISOString()} ${message}`, metadata)
    }),
    logDebug: jest.fn((message, metadata) => {
      const isDev = process.env.NODE_ENV === 'development'
      if (isDev) {
        mockLogger.debug(`[DEBUG] ${new Date().toISOString()} ${message}`, metadata)
      }
    }),
    logApiRequest: jest.fn((method, url, metadata) => {
      mockLogger.info(`[INFO] ${new Date().toISOString()} API Request: ${method} ${url}`, {
        type: 'api_request',
        method,
        url,
        ...metadata,
      })
    }),
    logApiResponse: jest.fn((method, url, status, duration, metadata) => {
      mockLogger.info(
        `[INFO] ${new Date().toISOString()} API Response: ${method} ${url} - ${status}`,
        {
          type: 'api_response',
          method,
          url,
          status,
          duration,
          ...metadata,
        }
      )
    }),
  }
})

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
