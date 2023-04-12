export class CustomError extends Error {
    constructor(
        public statusCode: number,
        public message: string
    ) {
        super(message)
    }
}

export class InvalidRequest extends CustomError{
    constructor(){
        super(400, "Fill in the fields correctly")
    }
}

export class InvalidName extends CustomError{
    constructor(){
        super(400, "Invalid name")
    }
}

export class InvalidQuantity extends CustomError{
    constructor(){
        super(400, "Invalid quantity")
    }
}

export class InvalidId extends CustomError{
    constructor(){
        super(400, "Invalid id")
    }
}