

type Model = {
    title: string;
    model_name: string;
    hash: string;
}



const ModelsSelector = ({models}:{models:Model[]}) => {
  return (
    <select className="select select-primary w-full max-w-xs">
        {models.map((model) => {
            return(
                <option>{model.title}</option>
            )
        })}

    </select>
  )
}

export default ModelsSelector