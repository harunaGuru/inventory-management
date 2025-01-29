import React from 'react'
import Header from './Header'
import { useGetDashboardMetricsQuery } from '@/state/api'
import Rating from './../_component/Rating';
import { ShoppingBag } from 'lucide-react';

const PopularProductCard = () => {
    const { data: dashboardMetrics, error, isLoading } = useGetDashboardMetricsQuery();
    console.log(dashboardMetrics)
  return (
    <div className=' row-span-3 lg:row-span-6 bg-white shadow-md rounded-2xl pb-16 '>
      {error && <div className="m-5">failed to fetch products</div>}
      {isLoading ?(
        <div className="m-5">Loading...</div>
      ):(
        <>
          <Header headerName='Popular Products' />
          <hr />
          <div className="h-full overflow-auto">
          {dashboardMetrics?.popularProduct.map((product)=>(
            <div key={product?.productId} className={`flex justify-between items-center px-5 py-4`}>
              <div className="flex gap-3 items-center">
                <div className="w-9 h-9 rounded-lg bg-gray-200 text-center">img</div>
                <div className="flex flex-col gap-1 justify-normal ">
                  <h3 className='text-xs font-bold text-gray-900'>{product?.name}</h3>
                  <div className='flex items-center justify-start'>
                    <span className='text-blue-500 text-xs'>{`$${product.price}`}</span>
                    <span className='mx-2'> | </span>
                    <Rating rating={product.rating || 0} />
                  </div>
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <span className='p-2 bg-blue-100 rounded-full text-blue-500 '>
                <ShoppingBag size={12} />
                </span>
                <span className='text-xs'>{`${Math.round(product.stockQuantity / 1000)}K sold`}</span>
              </div>
            </div>
          ))}
          </div>
        </>
      )}

    </div>
  )
}

export default PopularProductCard