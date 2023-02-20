import crypto from 'crypto';

export const generateRandomid = (bytes: number) => {
    const randomBytes = crypto.randomBytes(bytes);
    const id = randomBytes.toString('hex');
    
    console.log(id, 'idran'); // Prints a random ID string of 32 characters;

    return {id}
}


