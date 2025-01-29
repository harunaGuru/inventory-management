'use client'
import { PlusCircle, Search } from 'lucide-react'
import React, { useState } from 'react'
import { useCreateProductMutation, useGetProductsQuery } from '@/state/api';
import Rating from '../_component/Rating';
import Modal from './Modal';
import { useDebounce } from 'use-debounce';

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number
}

const Products = () => {
  const [isOpen, setisOpen] = useState<boolean>(false)
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value)
  }
  const [value] = useDebounce(search, 500);

  const { data: products, error, isLoading } = useGetProductsQuery(value);
  const [createProduct, {isLoading:loading, error:productError}] = useCreateProductMutation();
  const handleCreate = async (formData: ProductFormData)=>{
    try {
      await createProduct(formData).unwrap()
      console.log("user created successfully")
    } catch (error) {
      console.log(`error creating user: ${error}`)
    }
  }


  if(isLoading || loading){
    return <div className='py-4'>Loading...</div>
  }
  if(error || !products){
      return <div className='text-center text-red-500 py-4'> Failed to fetch products</div>
  }
  if(productError){
    return <div className='text-center text-red-500 py-4'> Failed to create product</div>
  }
  const openModal = ()=>setisOpen(true)
  return (
    <>
    <div className='flex flex-col mx-3'>
        <div className='w-full  mt-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-sm flex items-center'>
            <Search  className='w-4 h-4 mx-2'/>
            <input onChange={handleSearch} autoComplete='off' placeholder='Search product..' type="text" name="search" id="search" className='border-none bg-white w-full pl-4 pr-2 py-2 focus:outline-none' />
        </div>
        <div className='flex justify-between items-center mt-3'>
          {/* <Header headerName='Products' /> */}
          <h2 className="font-bold text-base py-2 text-gray-900">Products</h2>
          <button onClick={openModal} className='flex items-center rounded-sm text-gray-100 gap-2 cursor-pointer bg-blue-500 hover:bg-blue-300 px-2 py-1'>
            <PlusCircle className='w-4 h-4'/>
            <span className='text-sm'>Create Product</span>
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
          {products.map((product)=>(
            <div key={product.productId} className='flex flex-col gap-1 items-center justify-center py-3 border border-gray-200 bg-white text-gray-900 rounded-sm'>
              <div className='w-16 h-16 rounded ronded-lg bg-gray-200 text-center'>
                img
              </div>
              <h3 className=' font-bold'>{product.name}</h3>
              <span className='text-xs'>${product.price}</span>
              <span className='text-xs'>stock: {product.stockQuantity}</span>
              <span className='flex '><Rating rating={product.rating!} /></span>
            </div>
          ))}
        </div>
    <Modal open={isOpen} onClose={setisOpen} onCreate={handleCreate} />
    </div>
    </>
    
  )
}

export default Products