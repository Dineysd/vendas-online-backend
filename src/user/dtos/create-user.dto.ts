export class CreateUserDto{
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    password: string;
    type_user: number;
    createdAt: Date;
    updatedAt: Date;

}