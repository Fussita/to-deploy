import { IsString, IsNumber, MaxLength, IsIn, Min, IsOptional, MinLength } from 'class-validator';

export class UserInput {
  @IsString()
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }) 
  @MaxLength(30, { message: 'El nombre de usuario no puede superar los 30 caracteres' })
  username: string 
  
  @IsString()
  @MinLength(3, { message: 'La contraseña debe tener al menos 3 caracteres' }) 
  @MaxLength(30, { message: 'La contraseña no puede superar los 30 caracteres' })
  password: string 
  
  @IsString()
  role: string
}

export class UserUpdate {

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }) 
  @MaxLength(30, { message: 'El nombre de usuario no puede superar los 30 caracteres' })
  username?: string 
  
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'La contraseña debe tener al menos 3 caracteres' }) 
  @MaxLength(30, { message: 'La contraseña no puede superar los 30 caracteres' })
  password?: string 
  
  @IsOptional()
  @IsString()
  role?: string
}
