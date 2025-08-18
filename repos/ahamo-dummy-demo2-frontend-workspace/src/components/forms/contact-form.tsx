import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { logInfo, logError } from '@/lib/logger'

const contactSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上で入力してください'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      logInfo('Contact form submitted', {
        name: data.name,
        email: data.email,
        messageLength: data.message.length,
      })

      await new Promise(resolve => setTimeout(resolve, 1000))

      logInfo('Contact form submission completed successfully')
      reset()
    } catch (error) {
      logError('Contact form submission failed', error, {
        name: data.name,
        email: data.email,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          名前
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          メールアドレス
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          メッセージ
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '送信中...' : '送信'}
      </Button>
    </form>
  )
}
