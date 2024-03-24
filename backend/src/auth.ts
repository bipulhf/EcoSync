
import { Request, RequestHandler, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response ) =>{
    const {
        first_name, 
        last_name,
        email, 
        password,
        profile_photo,
        mobile
    } = req.body 
    let user = await prisma.user.findFirst(
        {
            where: {email}
        }
    )

    if(user){
        throw Error("User already exist")
    }

    user = await prisma.user.create({
        data: {
            first_name: first_name,
            last_name: last_name, 
            username: email,
            email: email,
            password: hashSync(password, 10),
            profile_photo: profile_photo,
            mobile: mobile,
            role: { create: { name: "UNASSIGNED" } }
        }
    })
    res.json(user)
}