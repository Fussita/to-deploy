import { IsString, IsNumber, MaxLength, IsIn, Min, IsOptional, MinLength } from 'class-validator';

export class InvoiceInput {
  @IsString()
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }) 
  @MaxLength(100, { message: 'El nombre de usuario no puede superar los 30 caracteres' })
  orderId: string 
}
