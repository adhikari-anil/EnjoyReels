"use client"
import { LoaderPinwheel } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <LoaderPinwheel className='animate-spin'/>
    </div>
  )
}

export default Loading