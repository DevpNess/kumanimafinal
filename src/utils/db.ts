import prisma from "@/lib/prisma"

export async function getUserFromDb(email:string){
    const userFound = await prisma.user.findUnique({
        where: {
          email: email
        }
      })
      return userFound
}