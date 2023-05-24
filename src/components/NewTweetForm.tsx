import React from 'react'
import { Button } from './Button'
import { ProfileImage } from './ProfileImage'
import { useSession } from 'next-auth/react'

export function NewTweetForm() {
    const session = useSession();

    if(session.status !== "authenticated") return null

    console.log(session.data);

  return (
    <form className='flex flex-col gap-2 border-b px-4 py-2' action="">
        <div className='flex gap-4'>
            <ProfileImage src={session.data.user.image} />
            <textarea className='flex-grow resize-none overflow-hidden p-4 text-lg outline-none' placeholder="What's happenning?"/>
        </div>
        <Button className='self-end'>Tuit</Button>
    </form>
  )
}
