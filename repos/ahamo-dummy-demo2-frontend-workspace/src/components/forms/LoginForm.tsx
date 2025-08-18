'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { GradientButton } from '@/components/ui/GradientButton'
import { logInfo, logError } from '@/lib/logger'
import { SmartphoneApiService } from '@/services/api'
import { useAuthStore } from '@/store/authStore'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const setAuth = useAuthStore(state => state.setAuth)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      logInfo('Login attempt', { email: data.email })

      const response = await SmartphoneApiService.login(data)

      if (response.status === 'error') {
        setError('root', { message: response.message || 'ログインに失敗しました' })
        return
      }

      const authData = response.data
      const user = {
        id: 'user-id',
        email: data.email,
      }

      setAuth(user, authData.accessToken, authData.refreshToken)
      logInfo('Login successful', { email: data.email })

      router.push('/')
    } catch (error) {
      logError('Login submission failed', error, { email: data.email })
      setError('root', { message: 'ログインに失敗しました' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          メールアドレス
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="example@ahamo.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          パスワード
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="パスワードを入力してください"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {errors.root && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{errors.root.message}</p>
        </div>
      )}

      <GradientButton type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting ? 'ログイン中...' : 'ログイン'}
      </GradientButton>
    </form>
  )
}
