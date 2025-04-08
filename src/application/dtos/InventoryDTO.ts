export class InventoryDTO {
    success: boolean;
    message: string;
    details?: any;

    constructor(success: boolean, message: string, details?: any) {
        this.success = success;
        this.message = message;
        this.details = details;
    }

    static createSuccess(message: string, details?: any): InventoryDTO {
        return new InventoryDTO(true, message, details);
    }

    static createError(message: string, details?: any): InventoryDTO {
        return new InventoryDTO(false, message, details);
    }
}