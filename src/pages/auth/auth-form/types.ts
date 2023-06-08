import { CreateUserDto } from '../../../services/api';

export type FormDataType = CreateUserDto & { confirmPassword: string };
