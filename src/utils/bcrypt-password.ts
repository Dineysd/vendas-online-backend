import { compare, hash } from "bcrypt"

export const createPasswordHash = async(password: string):
 Promise<string> => {
    const saltOrRounds = 10
    return hash(password, saltOrRounds)
}

export const validatePassword = async (password: string, passwordHash: string):
 Promise<boolean>=>{
    return compare(password, passwordHash)
 }