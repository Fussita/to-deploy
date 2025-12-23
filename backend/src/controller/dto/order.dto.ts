import { IsString, IsNumber, MaxLength, IsIn, Min, IsOptional, MinLength, IsArray, IsBoolean } from 'class-validator';

export class OrderInput {
  
  @IsString()
  @MinLength(3, { message: 'El userId debe tener al menos 3 caracteres'} ) 
  @MaxLength(100, { message: 'El userId no puede superar los 30 caracteres' })
  userId: string
  
  @IsString()
  @MinLength(3, { message: 'El clientId debe tener al menos 3 caracteres'} ) 
  @MaxLength(100, { message: 'El clientId no puede superar los 30 caracteres' })
  clientId: string
  
  @IsArray()
  details: {
    productId: string,
    quantity: number
  }[]

  @IsOptional()
  @IsBoolean()
  paid?: boolean

  @IsOptional()
  @IsNumber()
  total?: number
  
}
