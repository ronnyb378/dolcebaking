export function actionSetError(text) {
    return {
        type: 'SET_ERROR',
        text
    }
}

export function actionClearAlerts() {
    return {
        type: 'CLEAR_ALERTS',
    }
}