import React, { useState } from 'react'
import FormChallenge from '../components/post-challenge/FormChallenge'
import TimePeriod from '../components/post-challenge/TimePeriod'

function PostChallenge() {
  const [step, setStep] = useState(1)
  const [timePeriod, setTimePeriod] = useState({
    startDate: '',
    endDate: '',
  })

  return (
    <div className="container">
      <h1 className="font-semibold text-2xl">Tambahkan Challenge</h1>
      {step === 1 ? (
        <TimePeriod setTimePeriod={setTimePeriod} next={() => setStep(2)} timePeriod={timePeriod} />
      ) : (
        <FormChallenge previous={() => setStep(1)} timePeriod={timePeriod} />
      )}
    </div>
  )
}

export default PostChallenge
