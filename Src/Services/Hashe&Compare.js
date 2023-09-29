import bcrypt from "bcrypt"
export const hashing=(password)=>{

const hashedPass= bcrypt.hashSync(password,+process.env.NumHashed)
return hashedPass;
}

export const comparehashing=(password,hashedPassword)=>{

    const hashedPass= bcrypt.compareSync(password,hashedPassword)
    return hashedPass;
    }