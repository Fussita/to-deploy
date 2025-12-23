import { BadRequestException, Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { InvoiceInput } from './dto/invoice.dto'
import { Order, OrderSchema } from 'src/entity/order.entity'
import { Model, Mongoose } from 'mongoose'
import { Invoice, InvoiceSchema } from 'src/entity/invoice.entity'
import { JwtGuard } from './guard/jwt-guard'

@Controller('invoice')
@UseGuards(JwtGuard)
export class InvoiceController {
       
  private readonly invoiceRepo: Model<Invoice>;
  private readonly orderRepo: Model<Order>;

  constructor( @Inject('NoSQL') mongoose: Mongoose ) {
      this.invoiceRepo = mongoose.model<Invoice>('Invoice', InvoiceSchema)
      this.orderRepo = mongoose.model<Order>('Order', OrderSchema)
  }

  @Get()
  async findAll() {
    return await this.invoiceRepo.find()
        .populate({
          path: 'order',
          populate: [
            { path: 'client' },
            { path: 'user' },
            { path: 'details.product' },
          ]
        });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const invoice = await this.invoiceRepo.findById(id)
    if (!invoice) throw new NotFoundException('Factura no registrada')
    return invoice
  }

  @Post()
  async create(@Body() data: InvoiceInput) {
    const result = await this.orderRepo.findById(data.orderId)
    if (!result) throw new NotFoundException('Pedido no registrado')

    if (result.paid != true) throw new BadRequestException('Pedido no pagado')
    let total = 0
    result.details.forEach( e => total += e.total )

    const invoice = await new this.invoiceRepo({ 
      total: total,
      date: new Date(),
      order: result._id,
      status: 'PAGADA'
    })  
    
    console.log(invoice)
    return await this.invoiceRepo.create(invoice)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const inv = await this.invoiceRepo.findById(id)
    if (!inv) throw new NotFoundException('Factura no registrada')
    inv.status = 'ANULADA'
    inv.save()

    /*const order = await this.orderRepo.findById(inv.order._id)
    if (!order) throw new NotFoundException('Pedido no registrado')
    order.paid = false
    order.save()*/
  }

}
