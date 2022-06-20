import React from 'react'
import { useState } from 'react'
import ApplyChallange from '../components/challenge-info/ApplyChallange'
import DataCheck from '../components/challenge-info/DataCheck'
import UploadBerkas from '../components/challenge-info/UploadBerkas'

function ChallengeInfo() {
  const [step, setStep] = useState(1)

  return (
    <>
      {step === 1 && <ApplyChallange changeStep={setStep} />}
      {step === 2 && <DataCheck changeStep={setStep} />}
      {step === 3 && <UploadBerkas changeStep={setStep} />}
    </>
  )
}

export default ChallengeInfo
