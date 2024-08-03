"use client"
import { useSession } from 'next-auth/react'
import Image, { StaticImageData } from 'next/image'
import React, { ReactElement, ReactNode } from 'react'


type AvatarProps = {
  size: string,
  img : string | StaticImageData | ReactElement
  background : string
 
}

const Avatar = ({size, img, background} : AvatarProps) => {
  const session = useSession();

  return (
    <div className={`${size} ${background} flex justify-center`}>
      {
        (typeof img === 'string' || (typeof img === 'object' && 'src' in img)) ? 
        <Image src={img} alt='avatar' className='bg-center bg-cover border-2 rounded-full' width={64} height={64}/>
        : 
        <div className='flex items-center'>{img}</div>

      }
     
    </div>
  )
}

export default Avatar
