export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  status: 'success' | 'error'
}

export type UserUpdateData = Partial<Omit<User, 'id'>>

export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface Campaign {
  id: string
  title: string
  description: string
  imageUrl?: string
  link: string
}

export interface NewsItem {
  id: string
  title: string
  date: string
  link: string
}

export interface AhamoPageProps {
  campaigns: Campaign[]
  news: NewsItem[]
}

export interface SmartphoneProduct {
  id: string
  name: string
  brand: string
  price: string
  imageUrl: string
  features: string[]
  link: string
  colorOptions?: ColorOption[]
  has5G?: boolean
  saleLabel?: string
  description?: string
  specifications?: string[]
}

export interface ColorOption {
  name: string
  colorCode: string
  imageUrl?: string
}

export interface SmartphoneSelectionOption {
  id: string
  title: string
  description?: string
  imageUrl: string
  link: string
  icon: string
  specialLabel?: React.ReactNode
}

export interface DataPlanOption {
  id: string
  title: string
  subtitle: string
  price: string
  description: string
}

export interface VoiceOption {
  id: string
  title: string
  description: string
  price: string
}

export interface OverseaCallingOption {
  id: string
  title: string
  description: string
  price: string
}

export interface SmartphoneOptions {
  dataPlans: DataPlanOption[]
  voiceOptions: VoiceOption[]
  overseaCallingOptions: OverseaCallingOption[]
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

export interface AuthUser {
  id: string
  email: string
  name?: string
}

export * from './signup.types'
