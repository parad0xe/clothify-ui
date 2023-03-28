export interface ProductAttributDto {
    category: { name: string },
    name: string,
    value: string
}

export interface ProductRatingDto {
    content: string,
    value: number
}

export default interface ProductDto {
    id: number,
    name: string,
    description: string,
    available: boolean,
    price: number,
    weight: number,
    imageUrl: string,
    isNew: boolean,
    rating: ProductRatingDto[],

    brand: {
        name: string
    },

    collection: {
        name: string
    },

    category: {
        name: string
    },

    productAttributs: ProductAttributDto[]
}