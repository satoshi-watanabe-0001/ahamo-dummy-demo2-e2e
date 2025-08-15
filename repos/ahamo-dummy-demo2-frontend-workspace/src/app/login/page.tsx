import { SectionContainer } from '@/components/ui/SectionContainer'
import { LoginForm } from '@/components/forms/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <SectionContainer className="py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">ログイン</h1>
              <p className="text-slate-600">ahamoアカウントにログインしてください</p>
            </div>

            <LoginForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                アカウントをお持ちでない場合は{' '}
                <a href="/signup" className="text-orange-600 hover:text-orange-700 font-medium">
                  新規登録
                </a>
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
