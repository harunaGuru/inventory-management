import React from 'react'
import Header from './Header'
import { useGetDashboardMetricsQuery } from '@/state/api'
import { TrendingDown } from 'lucide-react'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PurchaseSummaryCard = () => {
    const { data, error, isLoading } = useGetDashboardMetricsQuery();
    const purchaseData = data?.purchaseSummary || []
    const totalPurchased = data?.purchaseSummary.reduce((acc, cur)=> acc + cur.totalPurchased, 0) || 0;
     const totalChangePercentageAverage = data?.purchaseSummary.reduce((acc, cur, _, arr)=> acc + cur.changePercentage!/arr.length, 0) || 0;
    const formatedChangePercentage = `${totalChangePercentageAverage.toLocaleString("en-us", {maximumFractionDigits: 2})}%`

  return (
    <div className='row-span-2 md:col-span-2 lg:row-span-3 lg:col-span-1 bg-white shadow-md rounded-2xl pb-16'>
      {error && <div className="m-5">failed to fetch products</div>}
      {isLoading ?(
        <div className="m-5">Loading...</div>
      ):(
        <>
        <Header headerName='Puchase Summary' />
        <hr />
        <div className='mx-5'>
        <span className='text-[10px] mt-3 mb-0'>Purchased</span>
        <div className='flex gap-1'>
            <h3 className='font-bold text-xs'>${(totalPurchased /1000000).toLocaleString("en-us",{maximumFractionDigits: 2})}M</h3>
            <span className='text-red-500 flex items-center gap-1'>
                <TrendingDown className='w-4 h-4' /> 
                {formatedChangePercentage} 
            </span>
        </div>
        </div>
        <ResponsiveContainer width="90%" height={100} className='p-1'>
        <AreaChart
          width={220}
          height={60}
          data={purchaseData}
          margin={{
            top: 5,
            right: 0,
            left: 5,
            bottom: 10,
          }}
        >
          <XAxis dataKey="date" tick={false} axisLine={false} />
          
            <Tooltip formatter={(value:number)=> [`$${value.toLocaleString("en-us")}`]} labelFormatter={(label)=>{
                    const date = new Date(label);
                    return date.toLocaleDateString('en-us', {
                      year: "numeric",
                      month:"long",
                      day: "numeric"
                    })
                   }} />
             <Area dot={true}  type="linear" dataKey="totalPurchased" stroke="#8884d8" fill="#8884d8" fillOpacity={1}/>
        </AreaChart>
        </ResponsiveContainer>
        </>
      )}
    </div>

  )
}

export default PurchaseSummaryCard