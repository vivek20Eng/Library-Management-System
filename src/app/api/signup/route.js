import { NextResponse } from "next/server";

console.log("apiii")
export async function POST(req,res){
  const data  =await req.json()
  console.log(data)

  return NextResponse.json(data)
}