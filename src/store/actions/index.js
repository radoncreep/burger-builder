// Having one central file to which you can import and export

// exporting the functions from burgerBuilder actions to be used in other modules
// functions from the burgerBuilder actions file
export { addIngredient, removeIngredient, initIngredients } from './burgerBuilder';

// functions from the order actions file
export { purchaseBurger, purchaseInit, fetchOrders } from './order';

export { auth, logout, setAuthRedirectPath, authCheckState } from './auth';
