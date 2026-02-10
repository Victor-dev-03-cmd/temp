"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Stepper } from "@/components/ui/stepper"
import { TempleInfoForm } from "./forms/temple-info-form"
import { MobileVerificationForm } from "./forms/mobile-verification-form"
import { TermsAndConditionsForm } from "./forms/terms-and-conditions-form"
import countries from "@/config/countries-states-cities.json"

const steps = [
  { id: "01", name: "Temple Information" },
  { id: "02", name: "Mobile Verification" },
  { id: "03", name: "Submit Request" },
]

interface VendorRegistrationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VendorRegistrationModal({ open, onOpenChange }: VendorRegistrationModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<any>({})

  const handleNext = (data: any = {}) => {
    setFormData((prev) => ({ ...prev, ...data }))
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async (data: any = {}) => {
    const finalData = { ...formData, ...data }
    console.log("Submitting Vendor Registration Request:", finalData)
    alert("Your request has been submitted for admin approval. Thank you!")
    onOpenChange(false)
    setCurrentStep(0)
  }
  
  const getFullPhoneNumber = () => {
    const countryData = countries.find(c => c.iso2 === formData.country)
    const countryCode = countryData ? countryData.phone_code : ''
    const mobileNumber = formData.vendorMobile ? formData.vendorMobile.replace(/\D/g, '') : ''
    return `${countryCode}${mobileNumber}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Become a Vendor</DialogTitle>
          <DialogDescription>
            Complete the 3 steps below to register your temple with us.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        <div className="mt-8">
          {currentStep === 0 && <TempleInfoForm onNext={handleNext} />}
          {currentStep === 1 && <MobileVerificationForm phone={getFullPhoneNumber()} onNext={handleNext} onBack={handleBack} />}
          {currentStep === 2 && <TermsAndConditionsForm onSubmit={handleSubmit} onBack={handleBack} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
