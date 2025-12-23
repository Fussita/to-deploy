import { BadRequestException, Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { Order, OrderDetail, OrderDetailSchema, OrderSchema } from 'src/entity/order.entity'
import { OrderInput } from './dto/order.dto'
import { User, UserSchema } from 'src/entity/user.entity'
import { Product, ProductSchema } from 'src/entity/product.entity'
import { Client, ClientSchema } from 'src/entity/client.entity'
import { Model, Mongoose } from 'mongoose'
import { JwtGuard } from './guard/jwt-guard'
import { Invoice, InvoiceSchema } from 'src/entity/invoice.entity'
import { ObjectId } from 'mongodb'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('order')
@UseGuards(JwtGuard)
export class OrderController {

  private readonly productRepo: Model<Product>
  private readonly orderRepo: Model<Order>
  private readonly orderDetailRepo: Model<OrderDetail>
  private readonly userRepo: Model<User>
  private readonly clientRepo: Model<Client>
  private readonly invoiceRepo: Model<Invoice>
  
  constructor( @Inject('NoSQL') mongoose: Mongoose ) {
    this.productRepo = mongoose.model<Product>('Product', ProductSchema)
    this.clientRepo = mongoose.model<Client>('Client', ClientSchema)
    this.orderRepo = mongoose.model<Order>('Order', OrderSchema)
    this.orderDetailRepo = mongoose.model<OrderDetail>('OrderDetail', OrderDetailSchema)
    this.userRepo = mongoose.model<User>('User', UserSchema)
    this.invoiceRepo = mongoose.model<Invoice>('Invoice', InvoiceSchema)
  }
  
  @Get()
  async findAll() {
    const find = await this.orderRepo.find()
      .populate('user')       // trae el documento User completo
      .populate('client')     // trae el documento Client completo
      .populate('details.product'); 
    return find
  }

  @Get('invoices')
  async findAllForInvoices() {
    const orders = await this.orderRepo.find({ paid: true }).populate('user').populate('client').populate('details.product'); 
    const invoices = await this.invoiceRepo.find({ status: 'PAGADA' })
        .populate({
          path: 'order',
          populate: [ { path: 'client' }, { path: 'user' }, { path: 'details.product' } ]
        })

    let ords = []
    for (let i of orders) {
      let n = true
      for (let j of invoices) {
        if ( i._id.toString() == j.order._id.toString() ) {
          n = false
          break
        }
      }
      if (n==true) ords.push(i)
    }
    return ords
  }

  @Get('no-paid')
  async findAllNoPaid() {
    const ordersWithInvoice = await this.invoiceRepo.distinct('order');
    const unpaidOrders = await this.orderRepo.find({ _id: { $nin: ordersWithInvoice }}); 
    return unpaidOrders
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.orderRepo.findById(id)
    if (!order) throw new NotFoundException('Pedido no registrado')
    return order
  }

  @Post()
  async create(@Body() data: OrderInput) {
    const findUser = await this.userRepo.findById(data.userId)
    if (!findUser) throw new NotFoundException('Usuario no registrado')
    
    const findClient = await this.clientRepo.findById(data.clientId)
    if (!findClient) throw new NotFoundException('Cliente no registrado')

    const idsProducts = []
    data.details.forEach( e => { idsProducts.push( e.productId ) } )
    const findProducts = await this.productRepo.find({ _id: { $in: idsProducts } });
    if (findProducts.length == 0) throw new NotFoundException('Productos no registrados')

    for (const item of findProducts) {
      const result = data.details.filter( e => e.productId == item._id.toString() )[0]
      if (item.stock < result.quantity) throw new BadRequestException(`Stock insuficiente para ${item.name}`)
      else item.stock -= result.quantity
    }

    const details = []
    let total = 0
    let iva = 0

    for ( let i of data.details ) {
      const p = findProducts.filter( e => (e._id.toString() == i.productId) )[0]
      const dt = new this.orderDetailRepo({
          product: p,
          quantity: i.quantity,
          total: i.quantity * p.price 
      })
      if (p.iva) {
        iva += i.quantity * p.price * 0.16
      }

      total += i.quantity * p.price
      details.push(dt)
    }

    const lastOrder = await this.orderRepo
      .findOne({}, { orderId: 1 })
      .sort({ orderId: -1 })
      .exec();

    const nextId = lastOrder ? lastOrder.orderId + 1 : 1;

    const order = new this.orderRepo({
      date: new Date(),
      details: details,
      user: findUser,
      client: findClient,
      total: total,
      paid: false,
      orderId: nextId,
      iva: iva
    })
    
    const orderNew = await this.orderRepo.create(order)

    for (let item of findProducts) {
      item.save()
    }
    
    return orderNew
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.invoiceRepo.findOneAndDelete({ order: new ObjectId(id) })
    await this.orderRepo.findByIdAndDelete(id)
  }

}

@Controller('order-image')
export class OrderImageController {

  private readonly orderRepo: Model<Order>
  private readonly invoiceRepo: Model<Invoice>
  
  constructor( @Inject('NoSQL') mongoose: Mongoose ) {
    this.orderRepo = mongoose.model<Order>('Order', OrderSchema)
    this.invoiceRepo = mongoose.model<Invoice>('Invoice', InvoiceSchema)
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update( 
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const order = await this.orderRepo.findById(id)
    if (!order) throw new NotFoundException('Pedido no registrado')
    const base64String = file.buffer.toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64String}`;  
    order.imageBase64 = dataUri
    order.paid = true
    order.save()

    /*let total = 0
    order.details.forEach( e => total += e.total )
    const invoice = await new this.invoiceRepo({ 
      total: total,
      date: new Date(),
      order: order._id,
      status: 'PAGADA'
    })  
    return await this.invoiceRepo.create(invoice)*/
  
  }
}
