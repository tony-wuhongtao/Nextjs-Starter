import { NextRequest,NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if(!file) { 
        return new NextRequest(JSON.stringify({ message: 'No file provided' }))
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const timestamp = (new Date()).valueOf()
    // const path = `/upload/${file_date}_${file.name}`
    const des_path = path.join(process.cwd(), '/public/upload')

    if(!existsSync(des_path)) {
        fs.mkdir(des_path, { recursive: true })
    }

    await fs.writeFile(
        path.join(des_path,timestamp+"_"+file.name),
        buffer
    )

    return new NextResponse(JSON.stringify({ 
        message: 'success',
        size: file.size,
        path: `/upload/${timestamp}_${file.name}`,
        base64: buffer.toString('base64'),
        name: file.name,
    }))
    
}