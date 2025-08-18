'use client'

import React from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { SignupSelections, FlowResult } from '@/types/signup.types'
import { PhoneNumberSelection } from '@/components/forms/PhoneNumberSelection'
import { CarrierSelection } from '@/components/forms/CarrierSelection'
import { DeviceSelection } from '@/components/forms/DeviceSelection'
import { SimSelection } from '@/components/forms/SimSelection'
import { ResultMessage } from '@/components/forms/ResultMessage'
import { NavigationButtons } from '@/components/forms/NavigationButtons'

export default function SignupPage() {
  const [selections, setSelections] = useLocalStorage<SignupSelections>('ahamo-signup-selections', {
    phoneOption: null,
    carrierOption: null,
    deviceOption: null,
    simOption: null,
  })

  const handlePhoneOptionChange = (option: SignupSelections['phoneOption']) => {
    setSelections((prev: SignupSelections) => ({
      ...prev,
      phoneOption: option,
      carrierOption: null,
      deviceOption: null,
      simOption: null,
    }))
  }

  const handleCarrierOptionChange = (option: SignupSelections['carrierOption']) => {
    setSelections((prev: SignupSelections) => ({
      ...prev,
      carrierOption: option,
      deviceOption: null,
      simOption: null,
    }))
  }

  const handleDeviceOptionChange = (option: SignupSelections['deviceOption']) => {
    setSelections((prev: SignupSelections) => ({
      ...prev,
      deviceOption: option,
      simOption: null,
    }))
  }

  const handleSimOptionChange = (option: SignupSelections['simOption']) => {
    setSelections((prev: SignupSelections) => ({
      ...prev,
      simOption: option,
    }))
  }

  const getFlowResult = (): FlowResult => {
    const { phoneOption, carrierOption, deviceOption, simOption } = selections

    if (phoneOption === 'keep' && carrierOption === 'docomo') {
      return {
        message: 'プラン変更手続きに移行します',
        destination: '/d-account-verification',
        isComplete: true,
      }
    }

    if (phoneOption === 'keep' && carrierOption === 'other' && deviceOption === 'buy') {
      return {
        message: '乗り換え手続きを行います',
        destination: '/sim-check',
        isComplete: true,
      }
    }

    if (
      phoneOption === 'keep' &&
      carrierOption === 'other' &&
      deviceOption === 'no-buy' &&
      simOption
    ) {
      return {
        message: '乗り換え手続きを行います',
        destination: '/sim-check',
        isComplete: true,
      }
    }

    if (phoneOption === 'new' && deviceOption === 'buy') {
      return {
        message: '新規申し込みに移行します',
        destination: '/sim-check',
        isComplete: true,
      }
    }

    if (phoneOption === 'new' && deviceOption === 'no-buy' && simOption) {
      return {
        message: '新規申し込みに移行します',
        destination: '/sim-check',
        isComplete: true,
      }
    }

    return { message: '', destination: '', isComplete: false }
  }

  const flowResult = getFlowResult()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <SectionContainer className="py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
              ahamo お申し込み手続き
            </h1>

            <PhoneNumberSelection
              selectedOption={selections.phoneOption}
              onOptionChange={handlePhoneOptionChange}
            />

            {selections.phoneOption === 'keep' && (
              <CarrierSelection
                selectedOption={selections.carrierOption}
                onOptionChange={handleCarrierOptionChange}
              />
            )}

            {(selections.phoneOption === 'new' ||
              (selections.phoneOption === 'keep' && selections.carrierOption === 'other')) && (
              <DeviceSelection
                selectedOption={selections.deviceOption}
                onOptionChange={handleDeviceOptionChange}
              />
            )}

            {((selections.phoneOption === 'new' && selections.deviceOption === 'no-buy') ||
              (selections.phoneOption === 'keep' &&
                selections.carrierOption === 'other' &&
                selections.deviceOption === 'no-buy')) && (
              <SimSelection
                selectedOption={selections.simOption}
                onOptionChange={handleSimOptionChange}
              />
            )}

            <ResultMessage message={flowResult.message} />

            <NavigationButtons flowResult={flowResult} />
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
