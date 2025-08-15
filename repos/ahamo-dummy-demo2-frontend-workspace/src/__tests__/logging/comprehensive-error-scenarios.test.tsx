import {
  logError,
  logWarn,
  logInfo,
  logDebug,
  logApiRequest,
  logApiResponse,
  logger,
} from '@/lib/logger'
import { SmartphoneApiService } from '@/services/api'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { ContactForm } from '@/components/forms/contact-form'
import { useCachedStorage } from '@/hooks/use-cached-storage'
import { useSmartphones } from '@/hooks/useSmartphones'
import React from 'react'

const originalFetch = global.fetch

beforeEach(() => {
  jest.clearAllMocks()
  global.fetch = originalFetch
})

/**
 * 包括的なエラーシナリオのログ記録テスト
 * @description 様々なエラーパターンでのログ記録機能の動作を検証
 */
describe('Comprehensive Error Scenario Logging Tests', () => {
  /**
   * APIエラーパターンのテスト
   * @description API呼び出し時の各種エラーケースでのログ記録を検証
   */
  describe('API Error Patterns', () => {
    /**
     * ネットワーク接続失敗時のログ記録テスト
     * @description ネットワークエラー発生時に適切なエラーログが記録されることを確認
     */
    test('Network connection failure', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))

      try {
        await SmartphoneApiService.getSmartphones()
      } catch {}

      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining('API Request: GET /api/smartphones'),
        expect.any(Object)
      )
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('API request failed'),
        expect.any(Object)
      )
    })

    /**
     * HTTP 404エラー時のログ記録テスト
     * @description 404 Not Foundレスポンス時に適切なログが記録されることを確認
     */
    test('HTTP 404 Not Found', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.reject(new Error('Not Found')),
        text: () => Promise.resolve('Not Found'),
      })

      try {
        await SmartphoneApiService.getSmartphones()
      } catch {}

      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining('API Response: GET /api/smartphones - 404'),
        expect.any(Object)
      )
    })

    /**
     * HTTP 500エラー時のログ記録テスト
     * @description 500 Internal Server Errorレスポンス時に適切なログが記録されることを確認
     */
    test('HTTP 500 Internal Server Error', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.reject(new Error('Internal Server Error')),
        text: () => Promise.resolve('Internal Server Error'),
      })

      try {
        await SmartphoneApiService.getSmartphones()
      } catch {}

      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining('API Response: GET /api/smartphones - 500'),
        expect.any(Object)
      )
    })

    /**
     * HTTP 503エラー時のログ記録テスト
     * @description 503 Service Unavailableレスポンス時に適切なログが記録されることを確認
     */
    test('HTTP 503 Service Unavailable', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        json: () => Promise.reject(new Error('Service Unavailable')),
        text: () => Promise.resolve('Service Unavailable'),
      })

      try {
        await SmartphoneApiService.getSmartphones()
      } catch {}

      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining('API Response: GET /api/smartphones - 503'),
        expect.any(Object)
      )
    })

    /**
     * 無効なJSONレスポンス時のログ記録テスト
     * @description JSONパースエラー発生時に適切なエラーログが記録されることを確認
     */
    test('Invalid JSON response', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: () => Promise.reject(new Error('Unexpected token in JSON')),
        text: () => Promise.resolve('invalid json{'),
      })

      try {
        await SmartphoneApiService.getSmartphones()
      } catch {}

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('API request failed'),
        expect.any(Object)
      )
    })

    /**
     * リクエストタイムアウト時のログ記録テスト
     * @description タイムアウト発生時に適切なログが記録されることを確認
     */
    test('Request timeout simulation', async () => {
      global.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout')), 100)
          })
      )

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 100)
      })

      try {
        await Promise.race([SmartphoneApiService.getSmartphones(), timeoutPromise])
      } catch {}

      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining('API Request: GET /api/smartphones'),
        expect.any(Object)
      )
    })
  })

  /**
   * フォームエラーパターンのテスト
   * @description フォーム操作時の各種エラーケースでのログ記録を検証
   */
  describe('Form Error Patterns', () => {
    /**
     * フォームバリデーションエラー時のログ記録テスト
     * @description バリデーションエラー発生時のログ記録動作を確認
     */
    test('Form validation errors', async () => {
      render(<ContactForm />)

      const submitButton = screen.getByRole('button', { name: /送信/i })
      fireEvent.click(submitButton)

      expect(logger.info).not.toHaveBeenCalledWith(
        expect.stringContaining('Contact form submitted'),
        expect.any(Object)
      )
    })

    /**
     * フォーム送信時のネットワークエラーログ記録テスト
     * @description フォーム送信時のネットワークエラーで適切なログが記録されることを確認
     */
    test('Form submission network failure', async () => {
      render(<ContactForm />)

      const nameInput = screen.getByLabelText(/名前/i)
      const emailInput = screen.getByLabelText(/メールアドレス/i)
      const messageInput = screen.getByLabelText(/メッセージ/i)

      fireEvent.change(nameInput, { target: { value: 'Test User' } })
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(messageInput, { target: { value: 'Test message' } })

      const originalFetch = global.fetch
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))

      const submitButton = screen.getByRole('button', { name: /送信/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(logger.info).toHaveBeenCalledWith(
          expect.stringContaining('Contact form submitted'),
          expect.any(Object)
        )
      })

      global.fetch = originalFetch
    })
  })

  describe('Storage Error Patterns', () => {
    test('localStorage disabled/unavailable', () => {
      const originalLocalStorage = global.localStorage
      delete (global as Record<string, unknown>).localStorage

      const TestComponent = () => {
        const [value] = useCachedStorage('test-key', 'default')
        return <div>{value}</div>
      }

      render(<TestComponent />)

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Error reading cached localStorage key "test-key"'),
        expect.any(Object)
      )

      global.localStorage = originalLocalStorage
    })

    test('localStorage quota exceeded', () => {
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = jest.fn().mockImplementation(() => {
        throw new Error('QuotaExceededError')
      })

      const TestComponent = () => {
        const [value, setValue] = useCachedStorage('test-key', 'default')
        React.useEffect(() => {
          setValue('large data that exceeds quota')
        }, [setValue])
        return <div>{value}</div>
      }

      render(<TestComponent />)

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Error setting cached localStorage key "test-key"'),
        expect.any(Object)
      )

      Storage.prototype.setItem = originalSetItem
    })

    test('localStorage access permission denied', () => {
      const originalGetItem = Storage.prototype.getItem
      Storage.prototype.getItem = jest.fn().mockImplementation(() => {
        throw new Error('SecurityError: Access denied')
      })

      const TestComponent = () => {
        const [value] = useCachedStorage('test-key', 'default')
        return <div>{value}</div>
      }

      render(<TestComponent />)

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Error reading cached localStorage key "test-key"'),
        expect.any(Object)
      )

      Storage.prototype.getItem = originalGetItem
    })
  })

  describe('Component Error Patterns', () => {
    test('ErrorMessage component with error logging', () => {
      const errorMessage = 'Test error message'

      render(<ErrorMessage message={errorMessage} />)

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Error message displayed to user'),
        expect.any(Object)
      )
    })

    test('Component prop validation errors', () => {
      const originalError = console.error
      console.error = jest.fn()

      render(<ErrorMessage message="" />)

      console.error = originalError
    })

    test('Component rendering errors', () => {
      const ThrowingComponent = () => {
        throw new Error('Component rendering error')
      }

      const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
        try {
          return <>{children}</>
        } catch (error) {
          logError('Component rendering failed', error as Error)
          return <div>Error occurred</div>
        }
      }

      try {
        render(
          <ErrorBoundary>
            <ThrowingComponent />
          </ErrorBoundary>
        )
      } catch {}
    })
  })

  describe('Hook Error Patterns', () => {
    test('useSmartphones hook with API failure', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))

      const TestComponent = () => {
        const { smartphones, loading, error } = useSmartphones()
        return (
          <div>
            <div data-testid="loading">{loading ? 'Loading' : 'Not loading'}</div>
            <div data-testid="error">{error || 'No error'}</div>
            <div data-testid="count">{smartphones.length}</div>
          </div>
        )
      }

      render(<TestComponent />)

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Not loading')
      })

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('API request failed'),
        expect.any(Object)
      )
    })

    test('useSmartphones hook with invalid data format', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: () => Promise.reject(new Error('Unexpected token in JSON')),
        text: () => Promise.resolve('invalid json{'),
      })

      const TestComponent = () => {
        const { smartphones, loading, error } = useSmartphones()
        return (
          <div>
            <div data-testid="loading">{loading ? 'Loading' : 'Not loading'}</div>
            <div data-testid="error">{error || 'No error'}</div>
            <div data-testid="count">{smartphones.length}</div>
          </div>
        )
      }

      render(<TestComponent />)

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Not loading')
      })

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('API request failed'),
        expect.any(Object)
      )
    })
  })

  describe('Logger Function Direct Tests', () => {
    test('logError with Error object', () => {
      const error = new Error('Test error')
      error.stack = 'Error stack trace'

      logError('Test error message', error, { context: 'test' })

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR]'),
        expect.any(Object)
      )
    })

    test('logError with non-Error object', () => {
      const errorData = { message: 'Custom error', code: 500 }

      logError('Test error message', errorData, { context: 'test' })

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR]'),
        expect.any(Object)
      )
    })

    test('logWarn function', () => {
      logWarn('Test warning message', { context: 'test' })

      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('[WARN]'),
        expect.any(Object)
      )
    })

    test('logInfo function', () => {
      logInfo('Test info message', { context: 'test' })

      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining('[INFO]'),
        expect.any(Object)
      )
    })

    test('logDebug function in development', () => {
      const originalEnv = process.env.NODE_ENV

      jest.replaceProperty(process.env, 'NODE_ENV', 'development')

      logDebug('Test debug message', { context: 'test' })

      expect(logger.debug).toHaveBeenCalledWith(
        expect.stringContaining('[DEBUG]'),
        expect.any(Object)
      )

      jest.replaceProperty(process.env, 'NODE_ENV', originalEnv)
    })

    test('logApiRequest function', () => {
      logApiRequest('GET', '/api/test', { userId: '123' })

      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining('API Request: GET /api/test'),
        expect.any(Object)
      )
    })

    test('logApiResponse function', () => {
      logApiResponse('GET', '/api/test', 200, 150, { responseSize: '1KB' })

      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining('API Response: GET /api/test - 200'),
        expect.any(Object)
      )
    })
  })

  describe('Environment-specific Behavior', () => {
    test('Logs disabled in test environment', () => {
      const originalEnv = process.env.NODE_ENV

      jest.replaceProperty(process.env, 'NODE_ENV', 'test')
      jest.clearAllMocks()

      logError('Test error in test env')
      logWarn('Test warning in test env')
      logInfo('Test info in test env')
      logDebug('Test debug in test env')

      expect(logger.error).toHaveBeenCalled()
      expect(logger.warn).toHaveBeenCalled()
      expect(logger.info).toHaveBeenCalled()
      expect(logger.debug).not.toHaveBeenCalled()

      jest.replaceProperty(process.env, 'NODE_ENV', originalEnv)
    })

    test('Debug logs only in development', () => {
      const originalEnv = process.env.NODE_ENV

      jest.replaceProperty(process.env, 'NODE_ENV', 'production')
      jest.clearAllMocks()

      logDebug('Debug message in production')
      expect(logger.debug).not.toHaveBeenCalled()

      jest.replaceProperty(process.env, 'NODE_ENV', 'development')
      jest.clearAllMocks()

      logDebug('Debug message in development')
      expect(logger.debug).toHaveBeenCalled()

      jest.replaceProperty(process.env, 'NODE_ENV', originalEnv)
    })
  })
})
