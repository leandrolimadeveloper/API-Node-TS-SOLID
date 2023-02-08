import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUserCase";

const postgresUserRepository = new PostgresUsersRepository
const mailtrapMailProvider = new MailTrapMailProvider

const createUserUserCase = new CreateUserUseCase(
    postgresUserRepository,
    mailtrapMailProvider
)

const createUserController = new CreateUserController(
    createUserUserCase
)

export { createUserUserCase, createUserController}