import ModelsSelector from "@/components/ModelsSelector"


const url = 'http://127.0.0.1:3000/api/sd/v1/sd-models'
// const url = 'http://127.0.0.1:7860/sdapi/v1/sd-models'


const fetchModels = async () => {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
  return data
}

const StableDiffusionPage = async () => {
  const data = await fetchModels()

  return (
    <div>
      <ModelsSelector models={data} />
    </div>
  )
}

export default StableDiffusionPage