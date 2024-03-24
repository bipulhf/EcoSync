
import e, { Request, RequestHandler, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import { mailTransporter } from './helpers/mailTransporter';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRATION_MINUTES = process.env.JWT_EXPIRATION_MINUTES
 

export const changePassword = async (req: Request, res: Response ) =>{

    const token = req.headers.authorization as string;

    if(!token) return res.status(401).json({message: "Unauthorized"});
    
    try {

        const decoded = jwt.verify(token, JWT_SECRET) as any;

    const userId = decoded.userId;

    const { oldPassword, newPassword } = req.body;

    const user = await prisma.user.findFirst({where:{id: userId}})

    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    if(!compareSync(oldPassword,user.password))
    {
       return res.status(401).json({message: "Invalid credentials"})
    }

    const hashedPassword = hashSync(newPassword, 10);

    await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword }
      });

    res.status(200).json({message: "Password updated successfully"})

        
    } catch (error) {
         res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const resetPassword = async (req: Request, res: Response ) =>{

    try {

        const { email } = req.body;
         const user = await prisma.user.findUnique({
          where: { email },
        });
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
         const resetToken = generateEmailToken();

         const expiration = new Date(Date.now() + 3600000);

     // Update the existing token or create a new one if it doesn't exist
    await prisma.token.upsert({
        where: { userId: user.id },
        update: { body: resetToken, expiration: expiration },
        create: { body: resetToken, expiration: expiration, userId: user.id }
      }); 

         await mailTransporter.sendMail({
          from: 'MS_eBR9qp@trial-yzkq340k2nxgd796.mlsender.net', // Sender address
          to: email,  
          subject: 'Password Reset Token',
          html: `<p>Your password reset token is: ${resetToken}</p>`,
        });
    
        res.status(200).json({ message: 'Password reset email sent successfully' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}

export const resetPasswordConfirm = async (req: Request, res: Response ) =>{
    const { email, token, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email }, include: { token: true } });

    if (!user) {
      return res.status(404).send('User not found');
    }

      // Check if the token matches the user's token and if it's still valid
      if (user.token && user.token.body === token && user.token.valid) {
        // Check if the token is still valid based on the expiration time
        const currentTime = new Date();
        if (currentTime < user.token.expiration) {
          
            const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword }
        });

        // Invalidate the token
        await prisma.token.update({
            where: { id: user.token.id },
            data: { valid: false }
          });

          return res.status(200).send('Password confirmed successfully');


        } else {
          return res.status(400).send('Token has expired');
        }
      } else {
        return res.status(400).send('Invalid token');
      }
    } catch (error) {
      console.error('Error confirming password:', error);
      return res.status(500).send('Internal Server Error');
    }

}

 
export const logout = async (req: Request, res: Response ) =>{

}

export const createUser = async (req: Request, res: Response ) =>{
    const token = req.headers.authorization as string;
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const roleType = decoded.role;

    if(roleType !== "SYSTEM_ADMIN"){
        return res.status(401).json({message: "Unauthorized, Only System Admin can create users"})
    }
    
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
        res.status(409).json({message: "User already exists"})
    }

    user = await prisma.user.create({
        data: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashSync(password, 10),
            profile_photo: profile_photo,
            mobile: mobile,
            role: "UNASSIGNED", 
        }
    })

    await mailTransporter.sendMail({
        from: 'MS_eBR9qp@trial-yzkq340k2nxgd796.mlsender.net', // Sender address
        to: email,  
        subject: 'Welcome to EcoSync',
        html: `
        <p>Hi ${first_name}!</p>
        <p>System Admin has created an account for you on EcoSync.</p>
        <p>Please login with the credientials below and reset the password right after you logging in.</p>
        <p>Email: ${user.email}</p>
        <p>Password: ${password}</p>
        `,
      });
  
    res.status(200).json({message: "User created successfully"})
}




export const login = async (req: Request, res: Response ) =>{
    try {
        
    const {
        email, 
        password
    } = req.body 
 

    let user = await prisma.user.findFirst(
        {
            where: {email}
        }
    )  

    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    if(!compareSync(password,user.password))
    {
       return res.status(401).json({message: "Invalid credentials"})
    }

    const payload = {
        userId: user.id,
        role: user.role
      };

    const token = jwt.sign( payload, JWT_SECRET, { expiresIn: `${JWT_EXPIRATION_MINUTES}m` });
     

    res.status(200).json(token)

    } catch (error) {
        return res.status(501).json({message: "Internal Error" })
    }
} 
 


export const authenticateToken = async (req: Request, res: Response) => {
    
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Invalid Token" });
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET) as any;
        const userId = decoded.userId;
        const user = await prisma.user.findFirst({where:{id: userId}})
        
        if(!user) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        return res.status(200).json({ user });
         
    } catch (error: any) {

        return res.status(403).json({ message: error.message });
    }

}


// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString()
  }