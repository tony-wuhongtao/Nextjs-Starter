import prisma from "@/utils/db"




const prismaHandlers = async () => {
  await prisma.task.create({
    data: {
      content: 'wake up'
    }
  })
  const allTask = await prisma.task.findMany({
    orderBy:{
      createAt: 'desc'
    }
  })

  return allTask
}



const PrismaPage = async () => {

  const tasks = await prismaHandlers()

  return (
    <div>
      <h1 className="text-7xl">
        PrismaPage
      </h1>

      {tasks.map((task)=>{
        return ( 
        <h2 key={task.id} className="text-xl py-2" >
          😁{task.content}
        </h2>
        )
      })}
    </div>
  )
}

export default PrismaPage