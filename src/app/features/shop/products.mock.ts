import ProductModel from "../../core/models/product.model"
import ProductRatingModel from "../../core/models/productRating.model"
import ProductBrandModel from "../../core/models/productBrand.model"
import ProductCollectionModel from "../../core/models/productCollection.model"
import ProductCategoryModel from "../../core/models/productCategory.model"
import ProductAttributCategoryModel from "../../core/models/productAttributCategory.model"
import ProductAttributModel from "../../core/models/productAttribut.model"

export const Products: ProductModel[] = [
	(new ProductModel()).load({
		id: 1,
		name: "product 1",
		price: 10.00,
		description: "lorem",
		weight: 0.12,
		isAvailable: true,
		quantity: 10,
		imageUrl: "assets/images/products/pull-1.png",
		isNew: false,
		productRating: [
			(new ProductRatingModel()).load({
				comment: "lorem",
				rating: 4.73
			}),
			(new ProductRatingModel()).load({
				comment: "lorem",
				rating: 3.12
			})
		],
		brand: (new ProductBrandModel()).load({ name: "Brand 1" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 1" }),
		category: (new ProductCategoryModel()).load({ name: "Category 1" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5555"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#55c2fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb55"
			})
		]
	}),
	(new ProductModel()).load({
		id: 2,
		name: "product 2",
		price: 10.01,
		description: "lorem",
		weight: 0.13,
		isAvailable: true,
		quantity: 11,
		imageUrl: "assets/images/products/pull-2.png",
		isNew: false,
		productRating: [(new ProductRatingModel()).load({
			comment: "lorem",
			rating: 3.13
		})],
		brand: (new ProductBrandModel()).load({ name: "Brand 2" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 2" }),
		category: (new ProductCategoryModel()).load({ name: "Category 2" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5556"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#56c3fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb56"
			})
		]
	}),
	(new ProductModel()).load({
		id: 3,
		name: "product 3",
		price: 10.02,
		description: "lorem",
		weight: 0.14,
		isAvailable: true,
		quantity: 12,
		imageUrl: "assets/images/products/pull-3.png",
		isNew: false,
		productRating: [(new ProductRatingModel()).load({
			comment: "lorem",
			rating: 3.14
		})],
		brand: (new ProductBrandModel()).load({ name: "Brand 3" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 3" }),
		category: (new ProductCategoryModel()).load({ name: "Category 3" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5557"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#57c4fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb57"
			})
		]
	}),
	(new ProductModel()).load({
		id: 4,
		name: "product 4",
		price: 10.03,
		description: "lorem",
		weight: 0.15,
		isAvailable: true,
		quantity: 13,
		imageUrl: "assets/images/products/pull-4.png",
		isNew: false,
		productRating: [(new ProductRatingModel()).load({
			comment: "lorem",
			rating: 3.15
		})],
		brand: (new ProductBrandModel()).load({ name: "Brand 4" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 4" }),
		category: (new ProductCategoryModel()).load({ name: "Category 4" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5558"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#58c5fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb58"
			})
		]
	}),
	(new ProductModel()).load({
		id: 5,
		name: "product 5",
		price: 10.04,
		description: "lorem",
		weight: 0.16,
		isAvailable: true,
		quantity: 14,
		imageUrl: "assets/images/products/shirt-1.png",
		isNew: false,
		productRating: [(new ProductRatingModel()).load({
			comment: "lorem",
			rating: 3.16
		})],
		brand: (new ProductBrandModel()).load({ name: "Brand 5" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 5" }),
		category: (new ProductCategoryModel()).load({ name: "Category 5" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5559"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#59c6fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb59"
			})
		]
	}),
	(new ProductModel()).load({
		id: 6,
		name: "product 6",
		price: 10.05,
		description: "lorem",
		weight: 0.17,
		isAvailable: true,
		quantity: 15,
		imageUrl: "assets/images/products/shirt-2.png",
		isNew: false,
		productRating: [(new ProductRatingModel()).load({
			comment: "lorem",
			rating: 3.17
		})],
		brand: (new ProductBrandModel()).load({ name: "Brand 6" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 6" }),
		category: (new ProductCategoryModel()).load({ name: "Category 6" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5560"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#60c7fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb60"
			})
		]
	}),
	(new ProductModel()).load({
		id: 7,
		name: "product 7",
		price: 10.06,
		description: "lorem",
		weight: 0.18,
		isAvailable: true,
		quantity: 16,
		imageUrl: "assets/images/products/shirt-3.png",
		isNew: false,
		productRating: [(new ProductRatingModel()).load({
			comment: "lorem",
			rating: 3.18
		})],
		brand: (new ProductBrandModel()).load({ name: "Brand 7" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 7" }),
		category: (new ProductCategoryModel()).load({ name: "Category 7" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5561"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#61c8fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb61"
			})
		]
	}),
	(new ProductModel()).load({
		id: 8,
		name: "product 8",
		price: 10.07,
		description: "lorem",
		weight: 0.19,
		isAvailable: true,
		quantity: 17,
		imageUrl: "assets/images/products/shirt-4.png",
		isNew: false,
		productRating: [(new ProductRatingModel()).load({
			comment: "lorem",
			rating: 3.19
		})],
		brand: (new ProductBrandModel()).load({ name: "Brand 8" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 8" }),
		category: (new ProductCategoryModel()).load({ name: "Category 8" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5562"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#62c9fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb62"
			})
		]
	}),
	(new ProductModel()).load({
		id: 9,
		name: "product 9",
		price: 10.08,
		description: "lorem",
		weight: 0.20,
		isAvailable: true,
		quantity: 18,
		imageUrl: "assets/images/products/pant-1.png",
		isNew: false,
		productRating: [(new ProductRatingModel()).load({
			comment: "lorem",
			rating: 3.20
		})],
		brand: (new ProductBrandModel()).load({ name: "Brand 9" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 9" }),
		category: (new ProductCategoryModel()).load({ name: "Category 9" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5563"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#63c10fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb63"
			})
		]
	}),
	(new ProductModel()).load({
		id: 10,
		name: "product 10",
		price: 10.09,
		description: "lorem",
		weight: 0.21,
		isAvailable: true,
		quantity: 19,
		imageUrl: "assets/images/products/pant-2.png",
		isNew: false,
		productRating: [(new ProductRatingModel()).load({
			comment: "lorem",
			rating: 3.21
		})],
		brand: (new ProductBrandModel()).load({ name: "Brand 10" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 10" }),
		category: (new ProductCategoryModel()).load({ name: "Category 10" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5564"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#64c11fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb64"
			})
		]
	}),
	(new ProductModel()).load({
		id: 11,
		name: "product 11",
		price: 10.10,
		description: "lorem",
		weight: 0.22,
		isAvailable: true,
		quantity: 20,
		imageUrl: "assets/images/products/pant-3.png",
		isNew: false,
		productRating: [(new ProductRatingModel()).load({
			comment: "lorem",
			rating: 3.22
		})],
		brand: (new ProductBrandModel()).load({ name: "Brand 11" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 11" }),
		category: (new ProductCategoryModel()).load({ name: "Category 11" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5565"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#65c12fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb65"
			})
		]
	}),
	(new ProductModel()).load({
		id: 12,
		name: "product 12",
		price: 10.11,
		description: "lorem",
		weight: 0.23,
		isAvailable: true,
		quantity: 21,
		imageUrl: "assets/images/products/pant-4.png",
		isNew: false,
		productRating: [(new ProductRatingModel()).load({
			comment: "lorem",
			rating: 3.23
		})],
		brand: (new ProductBrandModel()).load({ name: "Brand 12" }),
		collection: (new ProductCollectionModel()).load({ name: "Collection 12" }),
		category: (new ProductCategoryModel()).load({ name: "Category 12" }),
		productAttributs: [
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "S",
				value: "S"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "M",
				value: "M"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "L",
				value: "L"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XL",
				value: "XL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Taille"
				}),
				name: "XXL",
				value: "XXL"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Rouge",
				value: "#fd5566"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Bleu",
				value: "#66c13fd"
			}),
			(new ProductAttributModel()).load({
				productAttributCategory: (new ProductAttributCategoryModel()).load({
					name: "Couleur"
				}),
				name: "Jaune",
				value: "#fddb66"
			})
		]
	})
]