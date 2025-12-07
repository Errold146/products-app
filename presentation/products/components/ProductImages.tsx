import { FlatList, Image, View } from 'react-native'

interface Props {
    images: string[]
}

export default function ProductImages({ images }: Props) {
    return (
        <>
            {
                (images.length === 0) ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image 
                            source={require('@/assets/images/no-product-image.png')} 
                            style={{ width: 300, height: 300 }}
                        />
                    </View>
                ) : (
                    <FlatList 
                        data={images}
                        keyExtractor={item => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
                            <Image 
                                source={{ uri: item }}
                                style={{
                                    width: 300,
                                    height: 300,
                                    marginHorizontal: 7,
                                    borderRadius: 5
                                }}
                            />
                        )}
                    />
                )
            }
        </>
    )
}