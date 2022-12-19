import { SigninDto, SignupDto } from '../dto';

import { SignupAuth, SigninAuth } from '../entity';

export const authRepository = 'AuthRepository';

export interface AuthRepository {
  signup(signupDto: SignupDto, hash: string): Promise<SignupAuth>;

  signin(signinDto: SigninDto): Promise<SigninAuth>;
}
