export function actionUpdateCart(item) {
    return {
        type: 'ADD_ITEMS',
        item: item,
    }
}

export function actionClearCart() {
    return {
        type: 'CLEAR_CART'
    }
}

export function actionRemoveItem(item) {
    return {
        type: 'REMOVE_ITEM',
        item: item
    }
}

export function actionDecrementItem(item) {
    return {
        type: "DECREMENT_ITEM",
        item: item
    }
}