import { createTask } from "@/utils/actions"


const TaskForm = () => {
  return (
    <form action={createTask}>
        <div className="join w-full">
            <input type="text" 
            className="input input-boadered join-item w-full shadow-lg" 
            placeholder="type here"
            name="content"
            required 
        />
        <button 
            type='submit'
            className="btn btn-primary join-item shadow-lg">
                create task
        </button>
        </div>
    </form>

    
  )
}

export default TaskForm