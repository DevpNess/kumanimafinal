import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: { json: () => any; }) {
    try {
        const data = await request.json()

        const userFound = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (userFound) {
            return NextResponse.json(
                {
                    message: "Email already exists",
                },
                {
                    status: 400,
                }
            );
        }
        const nickNameFound = await prisma.user.findUnique({
            where: {
                nickName: data.nickName
            }
        })
        if (nickNameFound) {
            return NextResponse.json(
                {
                    message: "nickName already exists",
                },
                {
                    status: 400,
                }
            );
        }

        const newUser = await prisma.user.create({
            data: {
                password: data.password,
                email: data.email,
                name: data.name,
                lastName: data.lastName,
                nickName: data.nickName
            }
        })
        //const { password: _, ...user } = newUser

        return NextResponse.json(newUser);
    } catch (error) {
return NextResponse.json(
    {
        message: (error as Error).message ?? "An unexpected error occurred",
    },
    {
        status: 500,
    }
);



    }
}