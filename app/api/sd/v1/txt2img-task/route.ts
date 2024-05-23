import { NextRequest, NextResponse } from "next/server";
import { Task } from "./types";

  // 全局任务队列
let taskQueue: Task[] = [];


export async function POST(req: NextRequest) {
    const body = await req.json()
    const {taskId} = body

    const newTask:Task = {
        taskId,
        status: 'pending'
    }

    taskQueue.push(newTask)

    if(taskQueue.length === 1){
        taskQueue[0].status = 'processing'            
    }
    // console.log(taskQueue)
    return new Response(JSON.stringify({message: 'success', taskQueue}))  
}




export async function GET(req: NextRequest) {

    const taskId = req.nextUrl.searchParams.get('taskId')
    const status = req.nextUrl.searchParams.get('status')               

    if(status && status === 'completed'){
        console.log(taskQueue)
        for(let i = 0; i < taskQueue.length; i++){
            if(taskQueue[i].taskId === taskId){
                taskQueue.splice(i,1)

                console.log(taskQueue)


                if(taskQueue.length > 0){
                    taskQueue[0].status = 'processing'
                    return new Response(JSON.stringify({message: 'success'}))
                }
                
                return new Response(JSON.stringify({message: 'success'}))
            
            }
        }
        
        return new Response(JSON.stringify({message: 'not found'}))
    }else{
        for(let i = 0; i < taskQueue.length; i++){
            if(taskQueue[i].taskId === taskId){
                
                return new Response(JSON.stringify({
                    status: taskQueue[i].status,
                    message: 'success'
                }))

            }
        } 
        return new Response(JSON.stringify({
            message: 'task not found'
        }))
    }
}
        


