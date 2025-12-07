import React, { useEffect } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import { Formik } from 'formik'

import { Size } from '@/core/products/interfaces/productInterface'
import ProductImages from '@/presentation/products/components/ProductImages'
import { useOneProduct } from '@/presentation/products/hooks/useOneProduct'
import { ThemedView } from '@/presentation/theme/components/themed-view'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import ThemedButtonGroup from '@/presentation/theme/components/ThemedButtonGroup'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'

export default function ProductScreen() {

    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const { productQuery, productMutation } = useOneProduct(`${id}`)

    useEffect(() => {
        navigation.setOptions({ headerRight: () => (
            <Ionicons name='camera-outline' size={30} color={'gray'} />
        )}) 
    }, [])

    useEffect(() => {
        if ( productQuery.data ) {
            navigation.setOptions({
                title: productQuery.data.title
            })
        }
    }, [productQuery.data])
    

    if ( productQuery.isLoading ) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size={30} />
            </View>
        )
    }

    if ( !productQuery.data ) {
        return <Redirect href={'/(products-app)/(home)'} />
    }
    
    const product = productQuery.data!

    return (
        <Formik
            initialValues={product}
            onSubmit={prod => productMutation.mutate(prod)}
        >
            {
                ({ values, handleSubmit, handleChange, setFieldValue }) => (
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={80}
                    >
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            {/* Imagenes de los productos */}
                            <ProductImages images={values.images} />
            
                            {/* Inputs */}
                            <ThemedView style={{ marginHorizontal: 15, marginTop: 20 }}>
                                <ThemedTextInput 
                                    placeholder='Título del Producto'
                                    style={{ marginVertical: 5 }}
                                    icon='pricetag-outline'
                                    value={values.title}
                                    onChangeText={handleChange('title')}
                                />
                    
                                <ThemedTextInput 
                                    placeholder='Slug del Producto'
                                    style={{ marginVertical: 5 }}
                                    icon='trail-sign-outline'
                                    value={values.slug}
                                    onChangeText={handleChange('slug')}
                                />
                                    
                                <ThemedTextInput 
                                    placeholder='Descripción del Producto'
                                    style={{ marginVertical: 5 }}
                                    multiline
                                    numberOfLines={5}
                                    icon='list-outline'
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                />
                            </ThemedView>

                            {/* Precio e inventario */}
                            <ThemedView 
                                style={{
                                    marginHorizontal: 15,
                                    marginVertical: 5,
                                    flexDirection: 'row',
                                    gap: 10
                                }}
                            >
                                <ThemedTextInput 
                                    placeholder='Precio'
                                    style={{ flex: 1, height: 50 }}
                                    icon='wallet-outline'
                                    keyboardType='decimal-pad'
                                    value={values.price.toString()}
                                    onChangeText={handleChange('price')}
                                />
                                
                                <ThemedTextInput 
                                    placeholder='Inventario'
                                    style={{ flex: 1, height: 50 }}
                                    icon='calculator-outline'
                                    keyboardType='numeric'
                                    value={values.stock.toString()}
                                    onChangeText={handleChange('stock')}
                                />
                            </ThemedView>
            
                            {/* Botones de tallas y generos */}
                            <ThemedView
                                style={{
                                    marginHorizontal: 15
                                }}
                            >
                                <ThemedButtonGroup 
                                    options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                                    selectedOptions={values.sizes}
                                    onSelect={option => {
                                        const newSizes = values.sizes.includes(option as Size)
                                            ? values.sizes.filter(s => s !== option)
                                            : [ ...values.sizes, option]
                                        setFieldValue('sizes', newSizes)
                                    }}
                                    
                                />
                                
                                <ThemedButtonGroup 
                                    options={['kid', 'men', 'women', 'unisex']}
                                    selectedOptions={[values.gender]}
                                    onSelect={option => setFieldValue('gender', option)}
                                />
                            </ThemedView>
            
                            {/* Botón para guardar cambios */}
                            <View
                                style={{
                                    marginHorizontal: 15,
                                    marginBottom: 50,
                                    marginTop: 20
                                }}
                            >
                                <ThemedButton
                                    icon='cloud-upload-outline'
                                    onPress={() => handleSubmit()}
                                >
                                    Guardar
                                </ThemedButton>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>

                )
            }
        </Formik>
    )
}