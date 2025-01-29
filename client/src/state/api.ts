import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type User ={
    userId: string;
    name: string;
    email: string;
}
type Product = {
    productId: string;
    price: number;
    name: string;
    rating? : number;
    stockQuantity: number;
}
type NewProduct = {
    price: number;
    name: string;
    rating? : number;
    stockQuantity: number;
}

type SalesSummary ={
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
}
export type ExpenseByCategory ={
    expenseByCategoryId: string;
    expenseSummaryId: string; //chnaged from number to string
    category: string;
    amount: string;
    date: string;
}

type PurchaseSummary = {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}
type ExpenseSummary ={
    expenseSummaryId: string;
    totalExpenses: number;
    date: string;
}

type DashboardMetrics = {
    popularProduct: Product[];
    salesSummary: SalesSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategory[]
    purchaseSummary: PurchaseSummary[]
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    }),
    tagTypes: ["DashboardMetrics", "products", "users", "expenses"],
    endpoints: (build) =>({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
            query:()=> "/dashboard",
            providesTags: ["DashboardMetrics"]
        }),
        getProducts: build.query<Product[], string | void>({
            query: (search)=> ({
                url: "/products",
                params: search ? {search} : {}
            }),
            providesTags: ["products"]
        }),
        createProduct: build.mutation<Product, NewProduct>({
            query: (newProduct)=>({
                url: "/products",
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ['products']
        }),
        getUsers: build.query<User[], void>({
            query: ()=> "/users",
            providesTags: ['users']
        }),
        getExpenses: build.query<ExpenseByCategory[], void>({
            query: ()=> '/expenses',
            providesTags: ['expenses']
        })
    })
})
export const {useGetDashboardMetricsQuery, useGetProductsQuery, useGetUsersQuery, useGetExpensesQuery, useCreateProductMutation} = api;