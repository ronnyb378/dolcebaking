export function actionLoggedIn(user) {
    return {
        type: 'LOGGED_IN',
        user
    }
}

export function actionLoggedOut() {
    return {
        type: 'LOGGED_OUT'
    }
}