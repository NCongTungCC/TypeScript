import bcrypt from "bcryptjs";

export const hashPassword = async (password : String) => {
    try {
        const hashedPassword = await bcrypt.hash(password as string, 10);
        return hashedPassword;
    } catch(err) {
        console.log('FAILED', err);
    }
}

export const comparePassword = async (password : String, hashedPassword : String) => {
    try { 
        const isMatch = await bcrypt.compare(password as string, hashedPassword as string);
        return isMatch;
    } catch(err) {
        console.log("FAILED", err);
    }
}