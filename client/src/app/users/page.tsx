"use client"
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from '../dashboard/Header';
import { useGetUsersQuery } from '@/state/api';


const UsersPage = () => {
    const { data: users, error, isLoading } = useGetUsersQuery()

    const columns: GridColDef[] = [
        { field: 'userId', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
        
          },
        {
            field: 'email',
            headerName: 'Email',
            type: 'number',
            width: 110,
        
          }
    ]
    if(isLoading){
        return <div className='py-4'>Loading...</div>
    }
    if(error || !users){
        return <div className='text-center text-red-500 py-4'> Failed to fetch products</div>
    }
  return (
    <div className='flex flex-col w-full !bg-white'>
        <Header headerName='Users'/>
        <DataGrid
        checkboxSelection
        rows={users}
        columns={columns}
        getRowId={(row)=> row.userId}
        className='bg-white !text-gray-700  shadow rounded-lg border-gray-200 border' />
        
    </div>
  )
}

export default UsersPage