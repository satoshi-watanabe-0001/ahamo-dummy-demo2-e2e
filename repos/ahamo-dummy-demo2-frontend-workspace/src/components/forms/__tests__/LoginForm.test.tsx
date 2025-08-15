import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '../LoginForm'
import { useAuthStore } from '@/store/authStore'
import { SmartphoneApiService } from '@/services/api'

jest.mock('@/store/authStore')
jest.mock('@/services/api')
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      setAuth: jest.fn(),
    })
  })

  it('should render login form correctly', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument()
  })

  it('should show validation errors for invalid input', async () => {
    render(<LoginForm />)

    const submitButton = screen.getByRole('button', { name: 'ログイン' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('メールアドレスは必須です')).toBeInTheDocument()
      expect(screen.getByText('パスワードは6文字以上で入力してください')).toBeInTheDocument()
    })
  })

  it('should call login API on form submission', async () => {
    const mockLogin = jest.mocked(SmartphoneApiService.login)
    mockLogin.mockResolvedValue({
      data: { accessToken: 'token', refreshToken: 'refresh', tokenType: 'Bearer', expiresIn: 3600 },
      status: 'success',
    })

    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText('メールアドレス'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('パスワード'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  it('should show error message on login failure', async () => {
    const mockLogin = jest.mocked(SmartphoneApiService.login)
    mockLogin.mockResolvedValue({
      data: { accessToken: '', refreshToken: '', tokenType: '', expiresIn: 0 },
      status: 'error',
      message: 'Invalid credentials',
    })

    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText('メールアドレス'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('パスワード'), {
      target: { value: 'wrongpassword' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }))

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })
})
