import { Request, Response } from 'express';
import { AppError } from '../utils/App-error';
import z from 'zod';

class ProductsController {

  index(req: Request, res: Response) {
    const { page, limit } = req.query
    
    res.send(`Page: ${page}, Limit: ${limit}`)
  }

  create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string({ required_error: "Nome é obrigatório"})
        .trim()
        .min(6, { message: "Nome deve ter no mínimo 6 caracteres"}),
      price: z
        .number({ required_error: "Preço é obrigatório"})
        .positive({ message: "Preço deve ser maior que zero"})
    })

    const {name, price} = bodySchema.parse(req.body)

    // throw new Error("Erro ao tentar criar um produto")
    // throw new AppError("Erro ao tentar criar um produto!")
    
    res.status(201).json({name, price, user_id: req.user_id})
  }
}

export { ProductsController }