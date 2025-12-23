import { IsString, IsNumber, MaxLength, IsIn, Min, IsOptional, MinLength, IsBoolean } from 'class-validator';

export class ProductInput {

  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' }) 
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  name: string 
  
  @IsString()
  @MinLength(8, { message: 'La descripción debe tener al menos 8  caracteres' }) 
  @MaxLength(200, { message: 'La descripción no puede superar los 200 caracteres' })
  description: string 

  @IsNumber({}, { message: 'El precio debe ser un numero' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price: number 
  
  @IsNumber({}, { message: 'El stock debe ser un numero' })
  @Min(0, { message: 'El stock debe ser mayor o igual a 0' })
  stock: number

  @IsBoolean()
  iva: boolean
  
}

export class ProductUpdate {

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' }) 
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  name?: string 
  
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'La descripción debe tener al menos 8 caracteres' }) 
  @MaxLength(200, { message: 'La descripción no puede superar los 200 caracteres' })
  description?: string 

  @IsOptional()
  @IsNumber()
  price?: number 
  
  @IsOptional()
  @IsNumber()
  stock?: number

  @IsOptional()
  @IsBoolean()
  iva?: boolean

}
