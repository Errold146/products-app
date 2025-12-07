import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { Alert } from "react-native"

import { createUpdateProduct } from "@/core/products/actions/createUpdateProductAction"
import { getProductsById } from "@/core/products/actions/getProductByIdAction"
import { Product } from "@/core/products/interfaces/productInterface"

export const useOneProduct = (productId: string) => {

    const queryClient = useQueryClient()
    const productIdRef = useRef(productId)
    
    const productQuery = useQuery({
        queryKey: ['products', productId],
        queryFn: () => getProductsById(productId),
        staleTime: 1000 * 60 * 60
    })

    // Mutation
    const productMutation = useMutation({
        mutationFn: async (data: Product) => createUpdateProduct({
            ...data,
            id: productIdRef.current
        }),
        onSuccess: (data: Product) =>  {

            productIdRef.current = data.id

            queryClient.invalidateQueries({
                queryKey: ['products', 'infinite']
            })
            queryClient.invalidateQueries({
                queryKey: ['products', data.id]
            })
            Alert.alert('Operación exitosa', `El Producto: ${data.title} se guardo exitosamente`)
        }
    })

    return {
        productQuery,
        productMutation
    }
}
