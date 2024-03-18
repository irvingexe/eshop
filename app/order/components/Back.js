'use client'

import BackIcon from '@/app/assets/BackIcon'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Back() {
  const router = useRouter();

  return (
    <Button 
      className='absolute bottom-full mb-4 left-[-0.8em] pl-1' 
      color="primary" 
      variant="light"
      onPress={()=>{router.push(`/`)}}
    >
      <BackIcon onC/>
      Back to orders
    </Button>  
  )
}
