import { BadRequestException, Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { User, UserSchema } from 'src/entity/user.entity'
import { UserInput, UserUpdate } from './dto/user.dto'
import { Model, Mongoose } from 'mongoose';
import { JwtGuard } from './guard/jwt-guard';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  
  private readonly userRepo: Model<User>;

  constructor( @Inject('NoSQL') mongoose: Mongoose ) {
      this.userRepo = mongoose.model<User>('User', UserSchema)
  }

  @Get()
  async findAll() {
    const find = await this.userRepo.find()
      .populate('order')       
    return find
  
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userRepo.findById(id)
    if (!user) throw new NotFoundException('User no registrado')
    return user
  }

  @Post()
  async create(@Body() data: UserInput) {
    if (data.role != 'Admin' && data.role != 'Vendedor') throw new BadRequestException('Rol no válido')
    const result = await this.userRepo.findOne({ username: data.username })
    if (result) throw new BadRequestException('Username ya registrado')
    const user = await new this.userRepo({ ...data, })
    return await this.userRepo.create(user)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UserUpdate) {
    const user = await this.userRepo.findById(id)
    if (!user) throw new NotFoundException('User no registrado')

    if ( data.username ) {
      const result = await this.userRepo.findOne({ username: data.username })
      if (result) throw new BadRequestException('Username ya registrado')
    }
    Object.assign(user, data)
    user.save()
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userRepo.findByIdAndDelete(id)
  }

}
