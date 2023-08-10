export const removeBearer = async (authorization: string):
 Promise<string>=>{
   if (authorization && authorization.startsWith('Bearer')) {
      return authorization.split(' ')[1];
    }else{
      return authorization;
    }
 }