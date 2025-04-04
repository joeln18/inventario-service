import {validationResult} from "express-validator";
import { Request, Response, NextFunction } from 'express';
import Ingredient from "../database/models/IngredientModel";

export const isExistIngredient = async (id: number) => {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
        console.log('ingreso a la validacion')
        throw new Error(`El ingrediente ${ id } no está registrado en la BD`);
    }
    return true;
}

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next();
}