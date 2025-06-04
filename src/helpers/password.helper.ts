import bcrypt from "bcryptjs";

export const hashPassword = async (password : string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch(err) {
        console.log('Failed', err);                                                                                                                                                                 
    }
}

export const comparePassword = async (password : string, hashedPassword : string) => {
    try { 
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch(err) {
        console.log("Failed", err);
    }
}                   