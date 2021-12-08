
export const existingCartItem = ({
    prevCartItems,
    nextCartItem
}) => {
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


    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            count: quantity
        }
    ]
}

export const handleDecrement = ({
    prevCartItems,
    nextCartItem
}) => {
    const quantity = 1

    prevCartItems.map((cartItem) => {
        if (cartItem.id === nextCartItem.id) {
            cartItem.count -= quantity;
            cartItem.total = cartItem.count * cartItem.price;
            return cartItem
        } else { return cartItem }
    })
    return [
        ...prevCartItems
    ]   
}