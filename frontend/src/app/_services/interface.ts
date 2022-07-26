

export interface UserModel {
    _id: string;
    email: string;
    username: string;
    phone:number;
   
  }
  export class count {
    user!: number;
  }
  export class User{
    _id!:string;
    username!:string;
    email!:string;
  }


  export interface TokenResponse {
    token: string;
  }
  
  export interface TokenPayload {
    email: string;
    password: string;
    username?: string;
  }
