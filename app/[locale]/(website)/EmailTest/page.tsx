"use client"

const EmailTest = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button className='bg-purple text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-purple-dark'
        onClick={async () => {
          await fetch("/api/emails", { method: "POST" });
        }}>
        Send Email
      </button>
    </div>
  )
}

export default EmailTest