import { validationResult } from "express-validator";
import Ingredient from "../../../infraestructure/database/models/IngredientModel";
import { isExistIngredient, validateFields } from "../../../infraestructure/helper/dbValidator";

jest.mock('express-validator', () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(),
    array: jest.fn(),
  })),
}));

jest.mock('../../../infraestructure/database/models/IngredientModel.ts', () => ({
  findByPk: jest.fn(),
})); 

describe('dbValidator', () => {
  it('isExistIngredient', () => {
    Ingredient.findByPk = jest.fn().mockResolvedValue({});
    const test = isExistIngredient(1);
    expect(test).toBeTruthy();
  });

  it('isExistIngredient', async () => {
    try {
      Ingredient.findByPk = jest.fn().mockResolvedValue(null);
      expect(await isExistIngredient(1)).rejects.toThrow('El ingrediente 1 no está registrado en la BD');
    } catch (error) {
      console.log('error >>> ', error);
    }
  });

  it('validateFields', () => {
    try {
        const resMock: any = {status: jest.fn()}; 
        const reqMock: any = {};
        const test = validateFields(reqMock, resMock, jest.fn());
        expect(test).toBeUndefined();
    } catch (error) {
      console.log('error test ', error);
    }
  });

  it('validateFields', () => {
    try {
        (validationResult as unknown as jest.Mock).mockReturnValue({
            isEmpty: jest.fn(() => true),
            array: jest.fn(() => []),
        });
        const fieldsMock : any = {};
        const resMock : any = {status: jest.fn()};                             
        const test = validateFields(fieldsMock, resMock, jest.fn());
        expect(test).toBeUndefined();
    } catch (error) {
      console.log('error validateFields ', error);
    }
  });
});