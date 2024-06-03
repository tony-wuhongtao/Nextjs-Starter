'use client'

import { createTaskCustom } from "@/utils/actions"
import { useEffect } from "react"
import { useFormStatus, useFormState } from "react-dom"
import toast from "react-hot-toast"


const SubmitBtn = () =>{

  const {pending} = useFormStatus()

  return (
    <button 
            type='submit'
            className="btn btn-primary join-item shadow-lg"
            disabled={pending}>
              {pending? 'please wait...': 'create task'}  
        </button>
  )
}

const initialState = {
  message: ''
}

const TaskForm = () => {
  const [state, formAction] = useFormState(createTaskCustom, initialState)
  useEffect(() => {
    if(state.message === 'error'){
      toast.error('something went wrong')
      return
    }
    if(state.message === 'success'){
      toast.success('task created successfully')
    }

  } , [state])

  return (
    <form action={formAction}>
      {/* {state.message ? <p className='mb-2'>{state.message}</p> : null} */}
        <div className="join w-full">
            <input type="text" 
            className="input input-boadered join-item w-full shadow-lg" 
            placeholder="type here"
            name="content"
            required 
        />
        <SubmitBtn/>
        </div>
    </form>

    
  )
}

export default TaskForm