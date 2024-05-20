import { NextRequest, NextResponse } from "next/server";

const routePath='/sdapi/v1/progress?skip_current_image=false'

export async function GET() {
    // return NextResponse.json({ message: "sd-models api get" });
    const baseUrl = process.env.SD_API_URL || ''
    const port = process.env.SD_API_PORT ? `:${process.env.SD_API_PORT}` : ''

    const response = await fetch(baseUrl + port + routePath,{cache: 'no-store'})


    if(!response.ok){
        throw new Error('Failed to fetch progress')
    }

    return NextResponse.json(await response.json())
  
}