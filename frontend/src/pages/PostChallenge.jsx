import React, { useState } from 'react'
import FormChallenge from '../components/post-challenge/FormChallenge'
import TimePeriod from '../components/post-challenge/TimePeriod'

function PostChallenge() {
  return (
    <div className="container">
      <h1 className="font-semibold text-2xl">Tambahkan Challenge</h1>
      {/* <TimePeriod /> */}
      <FormChallenge />
    </div>
  )
}

export default PostChallenge
