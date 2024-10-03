import Notification from './Notification'
const Rightbar = () => {
  return (
    <div className="lg:w-[400px] hidden right-0  fixed lg:flex flex-col items-start gap-7 px-3 my-7 min-h-full border-l border-zinc-800">
      <div className="px-7 w-full">
        <Notification postPerPage={5} userId={''} />
      </div>
    </div>
  )
}

export default Rightbar
