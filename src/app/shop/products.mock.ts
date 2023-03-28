import ProductDto from "./productDto"

export const Products: ProductDto[] = [
    {
        id: 1,
        name: "product 1",
        price: 10,
        description: "lorem",
        weight: 0.12,
        available: true,
        imageUrl: "assets/images/products/pull-1.png",
        isNew: false,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 1" },
        collection: { name: "Collection 1" },
        category: { name: "Category 1" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 1",
                value: "Taille::value 1"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 2",
                value: "Taille::value 2"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 3",
                value: "Taille::value 3"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 1",
                value: "Couleur::value 1"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 2",
                value: "Couleur::value 2"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 3",
                value: "Couleur::value 3"
            },
        ]
    },{
        id: 2,
        name: "product 2",
        price: 11,
        description: "lorem",
        weight: 0.13,
        available: true,
        imageUrl: "assets/images/products/shirt-1.png",
        isNew: true,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 2" },
        collection: { name: "Collection 2" },
        category: { name: "Category 2" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 2",
                value: "Taille::value 2"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 3",
                value: "Taille::value 3"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 4",
                value: "Taille::value 4"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 2",
                value: "Couleur::value 2"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 3",
                value: "Couleur::value 3"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 4",
                value: "Couleur::value 4"
            },
        ]
    },{
        id: 3,
        name: "product 3",
        price: 12,
        description: "lorem",
        weight: 0.14,
        available: true,
        imageUrl: "assets/images/products/pant-1.png",
        isNew: false,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 3" },
        collection: { name: "Collection 3" },
        category: { name: "Category 3" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 3",
                value: "Taille::value 3"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 4",
                value: "Taille::value 4"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 5",
                value: "Taille::value 5"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 3",
                value: "Couleur::value 3"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 4",
                value: "Couleur::value 4"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 5",
                value: "Couleur::value 5"
            },
        ]
    },{
        id: 4,
        name: "product 4",
        price: 13,
        description: "lorem",
        weight: 0.15,
        available: true,
        imageUrl: "assets/images/products/pull-2.png",
        isNew: false,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 4" },
        collection: { name: "Collection 4" },
        category: { name: "Category 4" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 4",
                value: "Taille::value 4"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 5",
                value: "Taille::value 5"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 6",
                value: "Taille::value 6"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 4",
                value: "Couleur::value 4"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 5",
                value: "Couleur::value 5"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 6",
                value: "Couleur::value 6"
            },
        ]
    },{
        id: 5,
        name: "product 5",
        price: 14,
        description: "lorem",
        weight: 0.16,
        available: true,
        imageUrl: "assets/images/products/shirt-2.png",
        isNew: true,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 5" },
        collection: { name: "Collection 5" },
        category: { name: "Category 5" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 5",
                value: "Taille::value 5"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 6",
                value: "Taille::value 6"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 7",
                value: "Taille::value 7"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 5",
                value: "Couleur::value 5"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 6",
                value: "Couleur::value 6"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 7",
                value: "Couleur::value 7"
            },
        ]
    },{
        id: 6,
        name: "product 6",
        price: 15,
        description: "lorem",
        weight: 0.17,
        available: true,
        imageUrl: "assets/images/products/pant-2.png",
        isNew: false,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 6" },
        collection: { name: "Collection 6" },
        category: { name: "Category 6" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 6",
                value: "Taille::value 6"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 7",
                value: "Taille::value 7"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 8",
                value: "Taille::value 8"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 6",
                value: "Couleur::value 6"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 7",
                value: "Couleur::value 7"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 8",
                value: "Couleur::value 8"
            },
        ]
    },{
        id: 7,
        name: "product 7",
        price: 16,
        description: "lorem",
        weight: 0.18,
        available: true,
        imageUrl: "assets/images/products/pull-3.png",
        isNew: false,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 7" },
        collection: { name: "Collection 7" },
        category: { name: "Category 7" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 7",
                value: "Taille::value 7"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 8",
                value: "Taille::value 8"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 9",
                value: "Taille::value 9"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 7",
                value: "Couleur::value 7"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 8",
                value: "Couleur::value 8"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 9",
                value: "Couleur::value 9"
            },
        ]
    },{
        id: 8,
        name: "product 8",
        price: 17,
        description: "lorem",
        weight: 0.19,
        available: true,
        imageUrl: "assets/images/products/shirt-3.png",
        isNew: false,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 8" },
        collection: { name: "Collection 8" },
        category: { name: "Category 8" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 8",
                value: "Taille::value 8"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 9",
                value: "Taille::value 9"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 10",
                value: "Taille::value 10"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 8",
                value: "Couleur::value 8"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 9",
                value: "Couleur::value 9"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 10",
                value: "Couleur::value 10"
            },
        ]
    },{
        id: 9,
        name: "product 9",
        price: 18,
        description: "lorem",
        weight: 0.20,
        available: true,
        imageUrl: "assets/images/products/pant-3.png",
        isNew: false,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 9" },
        collection: { name: "Collection 9" },
        category: { name: "Category 9" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 9",
                value: "Taille::value 9"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 10",
                value: "Taille::value 10"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 11",
                value: "Taille::value 11"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 9",
                value: "Couleur::value 9"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 10",
                value: "Couleur::value 10"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 11",
                value: "Couleur::value 11"
            },
        ]
    },{
        id: 10,
        name: "product 10",
        price: 19,
        description: "lorem",
        weight: 0.21,
        available: true,
        imageUrl: "assets/images/products/pull-4.png",
        isNew: false,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 10" },
        collection: { name: "Collection 10" },
        category: { name: "Category 10" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 10",
                value: "Taille::value 10"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 11",
                value: "Taille::value 11"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 12",
                value: "Taille::value 12"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 10",
                value: "Couleur::value 10"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 11",
                value: "Couleur::value 11"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 12",
                value: "Couleur::value 12"
            },
        ]
    },{
        id: 11,
        name: "product 11",
        price: 20,
        description: "lorem",
        weight: 0.22,
        available: true,
        imageUrl: "assets/images/products/shirt-4.png",
        isNew: false,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 11" },
        collection: { name: "Collection 11" },
        category: { name: "Category 11" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 11",
                value: "Taille::value 11"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 12",
                value: "Taille::value 12"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 13",
                value: "Taille::value 13"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 11",
                value: "Couleur::value 11"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 12",
                value: "Couleur::value 12"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 13",
                value: "Couleur::value 13"
            },
        ]
    },{
        id: 12,
        name: "product 12",
        price: 21,
        description: "lorem",
        weight: 0.23,
        available: true,
        imageUrl: "assets/images/products/pant-4.png",
        isNew: false,
        rating: [{
            content: "lorem",
            value: 3.12
        }],
        brand: { name: "Brand 12" },
        collection: { name: "Collection 12" },
        category: { name: "Category 12" },
        productAttributs: [
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 12",
                value: "Taille::value 12"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 13",
                value: "Taille::value 13"
            },
            {
                category: {
                    name: "Taille"
                },
                name: "Taille::name 14",
                value: "Taille::value 14"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 12",
                value: "Couleur::value 12"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 13",
                value: "Couleur::value 13"
            },
            {
                category: {
                    name: "Couleur"
                },
                name: "Couleur::name 14",
                value: "Couleur::value 14"
            },
        ]
    },
]