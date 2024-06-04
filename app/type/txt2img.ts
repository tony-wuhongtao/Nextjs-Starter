
// export type Override_settings  {
//     sd_model_checkpoint?: string = 'SD1.5\少儿插画_v1.safetensors';
// }

// export type Txt2img  {
//     prompt: string = 'a cute cat';
//     negative_prompt?: string;
//     batchSize?: number = 1;
//     n_iter?: number = 1;
//     steps?: number = 20;
//     cfg_scale?: number = 7;
//     width?: number = 512;
//     height?: number = 512;
//     sampler_index?: string = "Euler a" //采样方法
//     override_settings?: Override_settings;
   
//   }

  // 定义类型，不带默认值
export type Override_settings = {
    sd_model_checkpoint?: string;
};

export type Txt2img = {
    prompt?: string;
    negative_prompt?: string;
    batchSize?: number;
    n_iter?: number;
    steps?: number;
    cfg_scale?: number;
    width?: number;
    height?: number;
    sampler_index?: string;
    override_settings?: Override_settings;
};


// 创建一个带有默认值的函数，用于生成Txt2img类型的对象
export function createTxt2img(options: Partial<Txt2img> = {}): Txt2img {
    return {
        prompt: options.prompt ?? 'a cute cat', // 使用 ?? 运算符设置默认值
        negative_prompt: options.negative_prompt,
        batchSize: options.batchSize ?? 1,
        n_iter: options.n_iter ?? 1,
        steps: options.steps ?? 20,
        cfg_scale: options.cfg_scale ?? 7,
        width: options.width ?? 512,
        height: options.height ?? 512,
        sampler_index: options.sampler_index ?? "Euler a",
        override_settings: options.override_settings
    };
}