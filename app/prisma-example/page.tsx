import prisma from "@/utils/db"




const prismaHandlers = async () => {
  // await prisma.task.create({
  //   data: {
  //     content: 'wake up'
  //   }
  // })
  console.log('prisma example')
  const allTask = await prisma.task.findMany({
    orderBy:{
      createAt: 'desc'
    }
  })

  return allTask
}



const PrismaPage = async () => {

  const tasks = await prismaHandlers()
  if(tasks.length === 0){
    return (
        <h2 className="mt-8 font-medium text-lg">
            No tasks to show...
        </h2>
    )
  }

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