
export type Override_settings {
    sd_model_checkpoint?: string = 'SD1.5\少儿插画_v1.safetensors';
}

export type Txt2img {
    prompt: string = 'a cute cat';
    negative_prompt?: string;
    batchSize?: number = 1;
    n_iter?: number = 1;
    steps?: number = 20;
    cfg_scale?: number = 7;
    width?: number = 512;
    height?: number = 512;
    sampler_index?: string = "Euler a" //采样方法
    override_settings?: Override_settings;
   
  }
  