'use client'
import { useState, useEffect } from 'react';

type Model = {
  title: string;
  model_name: string;
  hash: string;
};

const ModelsSelector = ({ models, selectedModel, onModelChange }: { models: Model[],selectedModel: string, onModelChange: (model:string) => void}) => {
  return (
    <select 
    className="select select-primary w-full max-w-xs"
    value={selectedModel}
    onChange={(e)=>onModelChange(e.target.value)}
    name = "model"
    >
      {models.map((model, index) => {
        return (
          <option key={index} value={model.title}>
            {model.title}
          </option>
        );
      })}
    </select>
  );
};

const ModelSelectorWrapper = () => {
    const [models, setModels] = useState<Model[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');
  
    useEffect(() => {
      const fetchModels = async () => {
        const apiUrl = '/api/sd/v1/sd-models';
        const response = await fetch(apiUrl);
  
        if (!response.ok) {
          throw new Error('Failed to fetch SD models');
        }
  
        const data = await response.json();
        setModels(data);
      };
  
      fetchModels();
    }, []);
  

    const handleModelChange = (model:string) => {
        setSelectedModel(model)
        console.log('model', model)
        
    }

    return (
      <div className="mb-4 w-full">
        <label className="label">
          <span className="label-text">选择SD模型</span>
        </label>
        <ModelsSelector 
        models={models} 
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
        />
      </div>
    );
  };
  
  export default ModelSelectorWrapper;