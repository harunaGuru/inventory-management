"use client"
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetProductsQuery } from '@/state/api';
// import { useAppSelector } from '@/redux';

import Header from '../dashboard/Header';

const Inventory = () => {
    const { data: products, error, isLoading } = useGetProductsQuery();
    // const isDarkMode = useAppSelector((state)=> state.global.isDarkMode)

    console.log("product", products)
    if(isLoading){
        return <div className='py-4'>Loading...</div>
    }
    if(error || !products){
        return <div className='text-center text-red-500 py-4'> Failed to fetch products</div>
    }
    const columns: GridColDef[] = [
        { field: 'productId', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Product Name',
            width: 200,
          },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 110,
            valueGetter: (value, row)=> `$${row.price}`,
          },
        {
            field: 'rating',
            headerName: 'Rating',
            type: 'number',
            width: 110,
            valueGetter: (value, row)=> row.rating ? row.rating : "N/A",
          },
        {
            field: 'stockQuantity',
            headerName: 'Stock Quantity',
            type: 'number',
            width: 150,
            
          },
    ]
  return (
    <div className='flex flex-col '>
        <Header headerName='Inventory' />
        <DataGrid 
        rows={products} 
        columns={columns} 
        checkboxSelection 
        getRowId={(row)=> row.productId} 
        className='!bg-white shadow rounded-lg border-gray-200 border !text-gray-800'
        sx={{
          "& .MuiDataGrid-virtualScroller": {
            overflow: "hidden"
          },
          // "& .MuiDataGrid-footerContainer ": {
          //   backgroundColor: `${isDarkMode ? "#0a0a0a" : "#ffff"}`,
          //   color: `${isDarkMode ? "#f2eded" : "#f2eded"}`,

          // },
         
          // "& .r MuiDataGrid-scrollbar--horizontal":{
          //   overflow: 'hidden'
          // }
        }}
        />
    </div>
  )
}   

export default Inventory