import {NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function main(){
    try{
        await prisma.$connect();
    }catch(err){
        return Error("DB接続に失敗しました");
    }
}

// Get ブログの全記事取得
export const GET = async (req: Request, res: NextResponse) =>{
    try{
        await main();
        const posts = await prisma.post.findMany({orderBy:{date:"asc"}});
        return NextResponse.json({message: "Success", posts}, {status: 200});
    }catch(err){
        return NextResponse.json({message: "Error", err}, {status: 500});
    }finally{
        await prisma.$disconnect();
    }
};

// post ブログの記事作成
export const POST = async (req: Request, res: NextResponse) =>{
    try{
        const {title, description} = await req.json();
        const post = await prisma.post.create({data:{title, description}});
        return NextResponse.json({message: "Success", post}, {status: 200});
    }catch(err){
        return NextResponse.json({message: "Error", err}, {status: 500});
    }finally{
        await prisma.$disconnect();
    }
};

