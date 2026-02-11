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
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)

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
    setSubmissionError(null)
    setSubmissionSuccess(false)

    console.log("Submitting Vendor Registration Request:", finalData);

    try {
      // --- THIS IS THE FIX ---
      const response = await fetch('/api/vendor/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit vendor request.");
      }

      setSubmissionSuccess(true);
      setTimeout(() => {
        onOpenChange(false);
        setCurrentStep(0);
        setFormData({});
        setSubmissionSuccess(false); // Reset for next time
      }, 2000);

    } catch (error: any) {
      setSubmissionError(error.message);
    }
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
          {submissionSuccess ? (
            <div className="text-center space-y-4">
              <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium">Request Submitted!</h3>
              <p className="text-muted-foreground">Your request has been sent for admin approval. We will notify you once it's reviewed.</p>
            </div>
          ) : (
            <>
              {submissionError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Error:</strong>
                  <span className="block sm:inline"> {submissionError}</span>
                </div>
              )}
              {currentStep === 0 && <TempleInfoForm onNext={handleNext} />}
              {currentStep === 1 && <MobileVerificationForm phone={getFullPhoneNumber()} onNext={handleNext} onBack={handleBack} />}
              {currentStep === 2 && <TermsAndConditionsForm onSubmit={handleSubmit} onBack={handleBack} />}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
