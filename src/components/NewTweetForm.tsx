import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { ProfileImage } from './ProfileImage'
import { useSession } from 'next-auth/react'

function updateTextAreaSize(textArea?: HTMLTextAreaElement){
  if(textArea == null) return
  textArea.style.height = "4rem";
  textArea.style.height = `${textArea.scrollHeight}px`
}

export function NewTweetForm() {
    const session = useSession();
    const [inputValue, setInputValue] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>();
    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
      updateTextAreaSize(textArea)
      textAreaRef.current = textArea;
    }, [])


    useLayoutEffect(() => {
      updateTextAreaSize(textAreaRef.current)
    }, [inputValue])

    if(session.status !== "authenticated") return null

    console.log(session.data);
    

  return (
    <form className='flex flex-col gap-2 border-b px-4 py-2' action="">
        <div className='flex gap-4'>
            <ProfileImage src={session.data.user.image} />
            <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
             className='flex-grow resize-none overflow-hidden p-4 border-2 text-lg outline-none' placeholder="What's happenning?"/>
        </div>
        <Button className='self-end'>Tuit</Button>
    </form>
  )
}
