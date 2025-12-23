import { BadRequestException, Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ClientInput, ClientUpdate } from './dto/client.dto'
import { Client, ClientSchema } from 'src/entity/client.entity'
import { Model, Mongoose } from 'mongoose'
import { JwtGuard } from './guard/jwt-guard'

@Controller('client')
@UseGuards(JwtGuard)
export class ClientController {
     
  private readonly clientRepo: Model<Client>;

  constructor( @Inject('NoSQL') mongoose: Mongoose ) {
      this.clientRepo = mongoose.model<Client>('Client', ClientSchema)
  }

  @Get()
  async findAll() {
    const find = await this.clientRepo.find()
          .populate('order') 
    return find
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientRepo.findById(id)
    if (!client) throw new NotFoundException('Cliente no registrado')
    return client
  }

  @Post()
  async create(@Body() data: ClientInput) {
    const cedula = await this.clientRepo.findOne({ cedula: data.cedula })
    if (cedula) throw new BadRequestException('Cedula ya registrada')
      
    const phone = await this.clientRepo.findOne({ phone: data.phone })
    if (phone) throw new BadRequestException('Telefono ya registrado')

    const email = await this.clientRepo.findOne({ email: data.email })
    if (email) throw new BadRequestException('Email ya registrado')
    
    const find = await this.clientRepo.findOne({ name: data.name, email: data.email, phone: data.phone })
    if (find) throw new BadRequestException('Cliente ya registrado')
    const client = new this.clientRepo(data) 
    return await this.clientRepo.create(client)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ClientUpdate) {
    if (data.name) {
      const find = await this.clientRepo.findOne({ name: data.name })
      if (find) throw new BadRequestException('Cliente ya registrado')
    }

    if (data.phone) {
      const phone = await this.clientRepo.findOne({ phone: data.phone })
      if (phone) throw new BadRequestException('Telefono ya registrado')
    }
    
    if (data.email) {
      const email = await this.clientRepo.findOne({ email: data.email })
      if (email) throw new BadRequestException('Email ya registrado')
    }

    if (data.cedula) {
      const cedula = await this.clientRepo.findOne({ cedula: data.cedula })
      if (cedula) throw new BadRequestException('Cedula ya registrada')
    }
    
    const item = await this.clientRepo.findById(id)
    if (!item) throw new NotFoundException('Cliente no registrado')
    Object.assign(item, data)
    item.save()
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.clientRepo.findByIdAndDelete(id)
  }

}
