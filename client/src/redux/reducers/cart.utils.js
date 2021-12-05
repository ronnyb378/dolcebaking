export const existingCartItem = ({
    prevCartItems,
    nextCartItem
}) => {
    // console.log(prevCartItems)
    return prevCartItems.find(
        (cartItem) => cartItem.id === nextCartItem.id
    )
}

export const handleAddToCart = ({
    prevCartItems,
    nextCartItem
}) => {
    const quantity = 1
    const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });

    if (cartItemExists) {
        return prevCartItems.map((cartItem) => 
            cartItem.id === nextCartItem.id 
            ? 
            {
                ...cartItem,
                count: cartItem.count + quantity
            } : cartItem
        );
    }

    // console.log(prevCartItems)

    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            count: quantity
        }
    ]
}