import React from 'react'

{/* The notification component must take a tailwind class as a color prop */}
export default function Notification({children, color}) {

  return (
    <div className={`flex justify-center items-center shadow-2xl min-w-64 sm:w-80 px-2 mx-auto  rounded-lg mb-10 text-center py-3 ${color}`}>
        {children}
    </div>
  )
}
