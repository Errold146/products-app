import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interfaces/productInterface";

export const getProducts = async (limit = 20, offset = 0) => {
    try {
        const { data } = await productsApi.get<Product[]>('/products', { params: { limit, offset }})
        return data.map(prod => ({
            ...prod,
            images: prod.images.map(img => `${API_URL}/files/product/${img}`)
        }))

    } catch (error) {
        console.log(error)
        throw new Error('Error al cargar los productos')
    }
}