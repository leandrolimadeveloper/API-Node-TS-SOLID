import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IMailProvider } from "../../providers/IMailProvider";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}
    
    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists) {
            throw new Error('User already exists')
        }
        
        const user = new User(data)

        await this.usersRepository.save(user)

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Rocketseat',
                email: 'rocketseat@suporte.com'
            },
            subject: 'Seja bem-vindo...',
            body: '<p>Parabéns! Você adquiriu...</p>'
        })
    }
}