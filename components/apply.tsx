import { Button } from '@/components/ui/button'
import { RiCheckboxCircleLine } from '@remixicon/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Apply = ({ postData, userId }: { postData: any; userId: string }) => {
  const [applied, setApplied] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (postData.applications.includes(userId)) {
      setApplied(true)
    }
  }, [postData, userId])
  const handleApply = async () => {
    setLoading(true)
    try {
      await axios.post('/api/apply', {
        postId: postData.id,
        userId
      })
      setApplied(true)
    } catch (err) {
      toast.error('something went wrong not able to apply please try again later')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      {applied == false ? (
        <div className="flex flex-col gap-2 items-center justify-center">
          <Button
            onClick={(e) => {
              e.preventDefault()
              handleApply()
            }}
            className="bg-green-600 hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Applying...' : 'Apply'}
          </Button>
          <p className="text-gray-600 text-md text-center">
            Make sure your profile is complete because we will share your info to recrutier based on
            that.
          </p>
        </div>
      ) : (
        <div
          className="flex flex-col gap-2 items-center justify-center
    "
        >
          <RiCheckboxCircleLine className="text-green-600" />
          <p>You have applied Thank you.</p>
        </div>
      )}
    </div>
  )
}

export default Apply
