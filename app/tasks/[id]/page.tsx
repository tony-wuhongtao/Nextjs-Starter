import { getTask } from "@/utils/actions"
import Link from "next/link"
import EditForm from "@/components/EditForm"
import { Task } from "@prisma/client"

type TaskParams = {
    id: string
}

const SingleTaskPage = async ({params}:{params:TaskParams}) => {

    const task = await getTask(params.id)


    return (
    <>
    <div className="mb-16">
        <Link href="/tasks" className='btn btn-accent'>
            back to tasks
        </Link>
    </div>
    <EditForm task ={task as Task} />
    </>
    
  )
}

export default SingleTaskPage