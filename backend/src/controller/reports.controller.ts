import { BadRequestException, Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { Order, OrderDetail, OrderDetailSchema, OrderSchema } from 'src/entity/order.entity'
import { User, UserSchema } from 'src/entity/user.entity'
import { Product, ProductSchema } from 'src/entity/product.entity'
import { Client, ClientSchema } from 'src/entity/client.entity'
import { Model, Mongoose } from 'mongoose'
import { JwtGuard } from './guard/jwt-guard'
import { Invoice, InvoiceSchema } from 'src/entity/invoice.entity'
import { ObjectId } from 'mongodb'

@Controller('reports')
@UseGuards(JwtGuard)
export class ReportsController {

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
  
  async getTopClientByRevenuePaid() {
    const result = await this.orderRepo.aggregate([
      { $match: { paid: true } },
      { 
        $group: { _id: "$client", totalGastado: { $sum: "$total" } }
      },
      { $sort: { totalGastado: -1 } },
      { $limit: 1 },
      {
        $lookup: {                 // traemos los datos del cliente
          from: "client",          // nombre de la colección
          localField: "_id",
          foreignField: "_id",
          as: "cliente"
        }
      },
      { $unwind: "$cliente" },
      {
        $project: {                // seleccionamos los campos que queremos mostrar
        _id: 0,
        cliente: "$cliente.name",
        cedula: "$cliente.cedula",
        email: "$cliente.email",
        totalGastado: 1
        }
      }
    ])
    return result
  }
  
  async getTopSellers() {
    const result = await this.orderRepo.aggregate([
      { $match: { paid: true } },
      { $group: { _id: "$user", cantidadOrdenes: { $sum: 1 } } },
      { $sort: { cantidadOrdenes: -1 } },
      { $limit: 3 },
      {
        $lookup: {                   // traemos los datos del usuario
          from: "user",              // nombre de la colección
          localField: "_id",
          foreignField: "_id",
          as: "usuario"
        }
      },
    { $unwind: "$usuario" },
    {
      $project: {                  // seleccionamos los campos que queremos mostrar
        _id: 0,
        usuario: "$usuario.username",
        role: "$usuario.role",
        cantidadOrdenes: 1
      }
    }
    ])
    return result
  }

  @Get('products')
  async getTopProductByRevenuePaid() {
    const result = await this.orderRepo.aggregate([
      { $match: { paid: true } },
      { $unwind: "$details" },
      { $group: { _id: "$details.product", ganancias: { $sum: "$details.total" } } },
      { $sort: { ganancias: -1 } },
      { $limit: 1 },
      {
        $lookup: {                       // traemos los datos del producto
          from: "product",               // nombre de la colección
          localField: "_id",
          foreignField: "_id",
          as: "producto"
        }
      },
      { $unwind: "$producto" },
      {
        $project: {                      // seleccionamos los campos que queremos mostrar
          _id: 0,
          producto: "$producto.name",
          precio: "$producto.price",
          ganancias: 1
        }
      }
    ])
    const fin = {
      sellers: await this.getTopSellers(),
      client: await this.getTopClientByRevenuePaid(), 
      product: result[0],
    }
    return fin
  }

  @Get('count')
  async countsBy() {
    const clients = await this.clientRepo.countDocuments()
    const products = await this.productRepo.countDocuments()
    const result = await this.orderRepo.find({ paid: true })
    let amount = 0

    for (let i of result) {
      amount += i.total
    }

    return {
      clients: clients,
      invoices: result.length,
      products: products,
      totalAmount: amount
    }
  }

  @Get('monthly')
  async getMonthlyIncome() {
    return this.orderRepo.aggregate([
      { $match: { paid: true } },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          totalIncome: { $sum: '$total' },
          orderCount: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 } // Orden cronológico
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          totalIncome: 1,
          orderCount: 1
        }
      }
    ]).exec();
  }

  @Get('no-paid')
  async findAllNoPaid() {
    const ordersWithInvoice = await this.invoiceRepo.distinct('order');
    const unpaidOrders = await this.orderRepo.find({ _id: { $nin: ordersWithInvoice }}); 
    return unpaidOrders
  }

}
