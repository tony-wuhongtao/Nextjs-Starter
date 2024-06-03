'use server'

import prisma from "@/utils/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {z} from "zod"


export const getAllTasks = async () => {
    return await prisma.task.findMany({
        orderBy:{
            createAt: 'desc'
        }
    })
}

export const createTask = async ( formData:FormData) => {

    const content = formData.get('content')
    await prisma.task.create({
      data: {
        content: content as string
      }
    })
    revalidatePath('/tasks')
    

}

export const createTaskCustom = async (prevState:any,formData:FormData) => {

    // await new Promise(resolve => setTimeout(resolve, 2000))

    const content = formData.get('content')

    const Task = z.object({
        content: z.string().min(4).max(50)
    })

    try {
        Task.parse({content})

        await prisma.task.create({
          data: {
            content: content as string
          }
        })
        revalidatePath('/tasks')
        return {message: 'success'}

    } catch (error) {
        console.log(error)
        return {message: 'error'}

    }


    

}

export const deleteTask = async (formData:FormData) => {
    await prisma.task.delete({
        where: {
            id: formData.get('id') as string
        }
    })
    revalidatePath('/tasks')
}

export const getTask = async (id:string) => {
    return await prisma.task.findUnique({
        where: {
            id: id
        }
    })
}

export const editTask = async (formData:FormData) => {
    const id = formData.get('id') as string
    const content = formData.get('content') as string
    const completed = formData.get('completed') as string

    await prisma.task.update({
        where: {
            id: id
        },
        data:{
            content,
            completed: completed === 'on' ? true : false
        }

    })
    redirect('/tasks')

}

