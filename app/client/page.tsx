'use client'
import { use, useState } from "react"


const ClientPage = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1 className="text-7xl mb-8" >
        Client Side Page 
      
      </h1>

      <h1 className="text-7xl font-bold mb-4">{count}</h1>
      <button className="btn btn-primary text-2xl" onClick={()=>{
        setCount(count + 1)
      }}>
        Increase
      </button>

    </div>
  )
}

export default ClientPage

