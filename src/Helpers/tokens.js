export function generateToken(){
    const characters ='ADAFDSFKEKWROWEPFJFDskdfjdalfldfkL453343KFSD'
    const length=20;
    let token=' ';
    for (let i=0; i< length;i ++){
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token
}