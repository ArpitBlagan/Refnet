'use client'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { RiCheckboxCircleLine } from '@remixicon/react'

const Feedback = ({ postData, userId }: { postData: any; userId: string }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const submitFeedback = async (value: string) => {
    //logic to submti feedback
    setSubmitLoading(true)
    try {
      await axios.post('/api/opinion', {
        postId: postData.id,
        userId,
        response: value
      })
      setFeedbackGiven(true)
      setFeedbackGiven(true)
    } catch (err) {
      toast.error('something went wrong while storing you feedback 👀.')
    } finally {
      setSubmitLoading(false)
    }
  }
  useEffect(() => {
    if (postData.type !== 'WORK') {
      setFeedbackGiven(true)
    } else {
      //check weather is already given or not.
      const present = postData.opinions.find((ele: any) => (ele.userId = userId))
      if (present) {
        setFeedbackGiven(true)
      }
    }
  }, [postData, userId])
  return (
    <div>
      {userId != postData.user.id && (
        <div>
          {feedbackGiven == false ? (
            <div className="p-2 border border-zinc-800 rounded-xl">
              <p className="text-lg text-center text-gray-400">
                Your impression about the project/work by considering everythink like its ui, idea,
                implementation etc.
              </p>
              <div className="flex items-center md:justify-around gap-3 flex-wrap my-10">
                {['Normal', 'Impressive', 'Excellent'].map((ele, index) => {
                  return (
                    <Button
                      onClick={(e) => {
                        e.preventDefault()

                        submitFeedback(ele.toUpperCase())
                      }}
                      disabled={submitLoading}
                      className="bg-green-600 hover:bg-green-700"
                      key={index}
                    >
                      {ele}
                    </Button>
                  )
                })}
              </div>
              <p className="text-gray-600 text-md text-center">
                Your feedback will help use to rate the user profile.
              </p>
            </div>
          ) : (
            <div className="p-2 rounded-xl border border-zinc-800 flex items-center justify-center flex-col">
              <RiCheckboxCircleLine className="text-green-600" />
              <p className="text-gray-600 text-md">
                Thank you for letting use know about your impression.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Feedback
