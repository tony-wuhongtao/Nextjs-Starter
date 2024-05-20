import { NextRequest, NextResponse } from "next/server";
import {Txt2img} from "@/app/type/txt2img";

const routePath='/sdapi/v1/txt2img'

export async function POST(request: NextRequest) {
    const baseUrl = process.env.SD_API_URL || ''
    const port = process.env.SD_API_PORT ? `:${process.env.SD_API_PORT}` : ''


    const data = await request.formData()
    const prompt = data.get('prompt')

    const body : Txt2img = {
        prompt: prompt as string
    }

    const txt2imgRes = await fetch(baseUrl + port + routePath,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    })

    const txt2imgResponseJson = await txt2imgRes.json();

    // console.log("txt2imgResponseJson in api", txt2imgResponseJson);
    if (txt2imgResponseJson.error) {
        return new Response(JSON.stringify(txt2imgResponseJson), {
        status: 500,
        headers: {
            "content-type": "application/json",
            "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
        },
        });
    }

    return new Response(JSON.stringify(txt2imgResponseJson), {
        // status: 200,
        // headers: {
        // "content-type": "application/json",
        // "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
        // },
    });

}