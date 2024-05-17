import ModelsSelector from "@/components/ModelsSelector"

const url = 'http://127.0.0.1:7860/sdapi/v1/sd-models'

const fetchModels = async () => {
  const response = await fetch(url)

  if(!response.ok){
    throw new Error('Failed to fetch SD models')
  }

  const data = await response.json()

  return data
}

const StableDiffusionPage = async () => {
  const data = await fetchModels()
  console.log(data)
  return (
    <div>
      <ModelsSelector models={data} />
    </div>
  )
}

export default StableDiffusionPage