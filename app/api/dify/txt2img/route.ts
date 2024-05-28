import { NextRequest, NextResponse } from "next/server";
import {Txt2img} from "@/app/type/txt2img";

const routePath='/workflows/run'
const difyBaseUrl = 'http://192.168.99.18/v1'
const token = 'app-thCkodtm844l7T74plgMs1j0'

export async function POST(request: NextRequest) {
    
    const data = await request.formData()

    const prompt = data.get('prompt')?.toString() || ''

    const txt2imgRes = await fetch(difyBaseUrl + routePath,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        },
        body:JSON.stringify({
            "inputs":{
                "query": prompt
            },
            "response_mode": "blocking",
            "user":"Next.js"
        })
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
        status: 200,
        headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
        },
    });

}