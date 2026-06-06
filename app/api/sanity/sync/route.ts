// app/api/sanity/sync/route.ts
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log("Sanity sync body:", body)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log("Sanity sync error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}



//  Backup code for the sync API

// import { NextRequest, NextResponse } from "next/server"

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()

//     console.log(body)

//     return NextResponse.json({
//       success: true,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//       },
//       {
//         status: 500,
//       }
//     )
//   }
// }