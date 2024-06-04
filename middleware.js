import { NextResponse } from "next/server"

export function middleware(request, response){
    // console.log('middleware')
    // return Response.json({
    //     msg: 'hello from middleware'
    // })
    return NextResponse.redirect(new URL('/', request.url))
    // return Response.redirect(new URL('/', request.url))
}

// export const config = {
//     matcher: ['/about']
// }

export const config = {
    matcher: ['/about/:path*']
}
