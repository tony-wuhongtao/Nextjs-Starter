import { NextRequest, NextResponse } from "next/server";
import { Stream } from "stream";


const routePath='/api/generate'
const aiModel = 'llama3:8b'

export async function POST(request: NextRequest) {
    const baseUrl = process.env.AI_API_URL || ''
    const port = process.env.AI_API_PORT ? `:${process.env.AI_API_PORT}` : ''


    const data = await request.formData()
    const cnString = data.get('cnprompt')?.toString() || ''

    const body = {
        model: aiModel,
        prompt: "Translate : the following Chinese into English, only reply to my translated English text:" + cnString,
        Stream: false
    }

    const cn2enResponse = await fetch(baseUrl + port + routePath,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    })

    const txt2imgResponseJson = await cn2enResponse.json();

    console.log("txt2imgResponseJson in api:", txt2imgResponseJson.response);

    return new Response(JSON.stringify(txt2imgResponseJson.response))

    // console.log("txt2imgResponseJson in api", txt2imgResponseJson);
    // if (txt2imgResponseJson.error) {
    //     return new Response(JSON.stringify(txt2imgResponseJson), {
    //     status: 500,
    //     headers: {
    //         "content-type": "application/json",
    //         "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    //     },
    //     });
    // }

    // return new Response(JSON.stringify(txt2imgResponseJson), {
    //     status: 200,
    //     headers: {
    //     "content-type": "application/json",
    //     "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    //     },
    // });

}