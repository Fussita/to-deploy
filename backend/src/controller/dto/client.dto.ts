import { IsString, MinLength, MaxLength, IsEmail, IsOptional } from "class-validator";

export class ClientInput {
  
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres'} ) 
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  name: string;
  
  @IsString()
  @IsEmail()
  @MinLength(3, { message: 'El email debe tener al menos 3 caracteres'} ) 
  @MaxLength(30, { message: 'El email no puede superar los 30 caracteres' })
  email: string;
  
  @IsString()
  @MinLength(11, { message: 'El telefono debe tener 11 caracteres'} ) 
  @MaxLength(12, { message: 'El telefono no puede superar los 11 caracteres' })
  phone: string;

  @IsString()
  @MinLength(4, { message: 'La dirección debe tener al menos 4 caracteres'} ) 
  @MaxLength(200, { message: 'La dirección no puede superar los 200 caracteres' })
  address: string;

  @IsString()
  @MinLength(1, { message: 'La cedula debe tener al menos 3 caracteres'} ) 
  @MaxLength(9, { message: 'La cedula no puede superar los 9 caracteres' })
  cedula: string;

}

export class ClientUpdate {
  
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres'} ) 
  @MaxLength(30, { message: 'El nombre no puede superar los 30 caracteres' })
  name?: string;
  
  @IsOptional()
  @IsString()
  @IsEmail()
  @MinLength(3, { message: 'El email debe tener al menos 3 caracteres'} ) 
  @MaxLength(30, { message: 'El email no puede superar los 30 caracteres' })
  email?: string;
  
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres'} ) 
  @MaxLength(50, { message: 'La dirección no puede superar los 30 caracteres' })
  address?: string;

  @IsOptional()
  @IsString()
  @MinLength(11, { message: 'El telefono debe tener 11 caracteres'} ) 
  @MaxLength(12, { message: 'El telefono no puede superar los 11 caracteres' })
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'La cedula debe tener al menos 3 caracteres'} ) 
  @MaxLength(9, { message: 'La cedula no puede superar los 9 caracteres' })
  cedula?: string;

}