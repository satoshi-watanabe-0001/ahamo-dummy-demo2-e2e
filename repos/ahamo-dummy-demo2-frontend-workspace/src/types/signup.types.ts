export type PhoneOption = 'keep' | 'new' | null
export type CarrierOption = 'docomo' | 'other' | null
export type DeviceOption = 'buy' | 'no-buy' | null
export type SimOption = 'esim' | 'sim-card' | null

export interface SignupSelections {
  phoneOption: PhoneOption
  carrierOption: CarrierOption
  deviceOption: DeviceOption
  simOption: SimOption
}

export interface FlowResult {
  message: string
  destination: string
  isComplete: boolean
}

export interface SelectionStepProps {
  title: string
  children: React.ReactNode
  className?: string
}

export interface SelectionOptionProps {
  title: string
  description: string
  isSelected: boolean
  onClick: () => void
  className?: string
}

export interface PhoneNumberSelectionProps {
  selectedOption: PhoneOption
  onOptionChange: (option: PhoneOption) => void
}

export interface CarrierSelectionProps {
  selectedOption: CarrierOption
  onOptionChange: (option: CarrierOption) => void
}

export interface DeviceSelectionProps {
  selectedOption: DeviceOption
  onOptionChange: (option: DeviceOption) => void
}

export interface SimSelectionProps {
  selectedOption: SimOption
  onOptionChange: (option: SimOption) => void
}

export interface ResultMessageProps {
  message: string
}

export interface NavigationButtonsProps {
  flowResult: FlowResult
}

export interface InfoCardProps {
  variant: 'blue' | 'green' | 'purple' | 'amber'
  title: string
  children: React.ReactNode
  className?: string
}

export interface DocumentCardProps {
  title: string
  subtitle: string
  documentName: string
  variant: 'blue' | 'green' | 'orange'
  className?: string
}
