import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ProductInput, ProductUpdate } from './dto/product.dto'
import { Product, ProductSchema } from 'src/entity/product.entity'
import { Model, Mongoose } from 'mongoose'
import { JwtGuard } from './guard/jwt-guard';

@Controller('product')
@UseGuards(JwtGuard)
export class ProductController {
  
  private readonly productRepo: Model<Product>;

  constructor( @Inject('NoSQL') mongoose: Mongoose ) {
      this.productRepo = mongoose.model<Product>('Product', ProductSchema)
  }

  @Get()
  async findAll() {
    return await this.productRepo.find()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productRepo.findById(id)
    if (!product) throw new NotFoundException('Producto no registrado')
    return product
  }

  @Post()
  async create(@Body() data: ProductInput) {
    const find = await this.productRepo.findOne({ name: data.name, price: data.price })
    if (find) throw new NotFoundException('Producto ya registrado')
    const product = await new this.productRepo({ ...data, })
    return this.productRepo.create(product)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ProductUpdate) {
    const product = await this.productRepo.findById(id)
    if (!product) throw new NotFoundException('Producto no registrado')

    if ( data.name ) {
      const result = await this.productRepo.findOne({ name: data.name })
      if (result) throw new NotFoundException('Producto ya registrado')
    }
      
    Object.assign(product, data)
    product.save()
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productRepo.findByIdAndDelete(id)
  }

}
