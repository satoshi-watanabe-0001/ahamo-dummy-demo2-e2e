import { http, HttpResponse } from 'msw'
import { mockSmartphones } from '@/lib/mockData'
import type { SmartphoneProduct } from '@/types/index'
import type { ApiResponse, SmartphoneApiResponse } from '@/services/api'

const mockApiResponse = <T>(
  data: T,
  status: 'success' | 'error' = 'success',
  message?: string
): ApiResponse<T> => ({
  data,
  status,
  message: message || (status === 'error' ? 'API Error' : 'Success'),
})

export const mockGetSmartphones = (
  page = 1,
  limit = 10,
  brand?: string
): ApiResponse<SmartphoneApiResponse> => {
  let filteredSmartphones = mockSmartphones
  if (brand) {
    if (brand === 'iPhone') {
      filteredSmartphones = mockSmartphones.filter((s: SmartphoneProduct) => s.brand === 'Apple')
    } else if (brand === 'Android') {
      filteredSmartphones = mockSmartphones.filter((s: SmartphoneProduct) => s.brand !== 'Apple')
    }
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedSmartphones = filteredSmartphones.slice(startIndex, endIndex)

  return mockApiResponse<SmartphoneApiResponse>({
    smartphones: paginatedSmartphones,
    total: filteredSmartphones.length,
    page,
    limit,
  })
}

export const mockGetSmartphoneById = (id: string): ApiResponse<SmartphoneProduct | null> => {
  const smartphone = mockSmartphones.find((s: SmartphoneProduct) => s.id === id)

  if (smartphone) {
    return mockApiResponse<SmartphoneProduct>(smartphone)
  } else {
    return mockApiResponse<SmartphoneProduct | null>(null, 'error', 'Smartphone not found')
  }
}

export const mockErrorResponse = (): ApiResponse<SmartphoneApiResponse> =>
  mockApiResponse<SmartphoneApiResponse>(
    { smartphones: [], total: 0, page: 1, limit: 10 },
    'error',
    'Network error'
  )

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string }

    const failureCredentials = [
      { email: 'test@fail.com', password: 'failpass' },
      { email: 'error@ahamo.com', password: 'errorpass' },
      { email: 'ng@test.com', password: 'ngpass' },
    ]

    const shouldFail = failureCredentials.some(
      cred => cred.email === body.email && cred.password === body.password
    )

    if (shouldFail) {
      return HttpResponse.json(
        { message: 'メールアドレスまたはパスワードが正しくありません' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      tokenType: 'Bearer',
      expiresIn: 3600,
    })
  }),

  http.get('/api/smartphones', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const brand = url.searchParams.get('brand') || undefined

    const response = mockGetSmartphones(page, limit, brand)
    return HttpResponse.json(response)
  }),

  http.get('/api/smartphones/:id', ({ params }) => {
    const { id } = params
    const response = mockGetSmartphoneById(id as string)
    return HttpResponse.json(response)
  }),
]

export const errorHandlers = [
  http.get('/api/smartphones', () => {
    const response = mockErrorResponse()
    return HttpResponse.json(response, { status: 500 })
  }),

  http.get('/api/smartphones/:id', () => {
    const response = mockApiResponse<SmartphoneProduct | null>(null, 'error', 'Network error')
    return HttpResponse.json(response, { status: 500 })
  }),
]
