import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, type Product } from "../interfaces/productInterface";

const emptyProduct: Product = {
    id: '',
    title: '',
    description: '',
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Unisex,
    sizes: [],
    stock: 0,
    tags: []
}

export const getProductsById = async (id: string): Promise<Product> => {

    if ( id === 'new' ) return emptyProduct;

    try {
        const { data } = await productsApi.get<Product>(`/products/${id}`)
        return {
            ...data,
            images: data.images.map(img => `${API_URL}/files/product/${img}`)
        }
        
    } catch (error) {
        console.log(error)
        throw new Error('No se puede encontrar el producto')
    }
}