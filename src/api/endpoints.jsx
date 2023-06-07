const NODE_SERVER = process.env.NEXT_PUBLIC_NODE_SERVER;

export const customersUrl = `${NODE_SERVER}/customers`;
export const cancelCustomerUrl = `${NODE_SERVER}/unsubscribeCustomers`;
export const servicesUrl = `${NODE_SERVER}/services`;
export const productsUrl = `${NODE_SERVER}/products`;
export const cancelProductsUrl = `${NODE_SERVER}/cancelproducts`;
export const revenuesUrl = `${NODE_SERVER}/revenues`;
export const expensesUrl = `${NODE_SERVER}/expenses`;
export const accountByDateUrl = `${NODE_SERVER}/accountsByDate`;
