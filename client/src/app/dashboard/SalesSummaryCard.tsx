import React, { useState } from 'react'
import Header from './Header'
import { useGetDashboardMetricsQuery } from '@/state/api'
import { TrendingUp } from 'lucide-react'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


const SalesSummaryCard = () => {
  const [timeLine, setTimeLine] = useState("Weekly")

    const { data, error, isLoading } = useGetDashboardMetricsQuery();
    const salesData = data?.salesSummary || []
    const totalValue = data?.salesSummary.reduce((acc, cur)=> acc + cur.totalValue, 0) || 0;
    const totalChangePercentage = data?.salesSummary.reduce((acc, cur, _, arr)=> acc + cur.changePercentage!/arr.length, 0) || 0;
    const formatedChangePercentage = `${totalChangePercentage.toLocaleString("en-us", {maximumFractionDigits: 2})}%`
    const HighestData = salesData.reduce((acc, curr)=> {
      return acc.totalValue >= curr.totalValue ? acc : curr;
    }, salesData[0] || {})
    const HighestValueDate = HighestData.date ? new Date(HighestData.date).toLocaleDateString('en-us', {
      year: "numeric",
      month:"numeric",
      day: "2-digit"
    }) : 'N/A'
  return (
    <div className='row-span-3 lg:row-span-6 bg-white shadow-md rounded-2xl pb-3 flex flex-col justify-between'>
        {error && <div className="m-5">failed to fetch products</div>}
      {isLoading ?(
        <div className="m-5">Loading...</div>
      ):(
        <>
          <div>
            <Header headerName='Sales Summary' />
            <hr />
          </div>
          
              <div className='flex justify-between items-center gap-0 px-5 mt-3 pb-2'>
                  {/* left side */}
                <div className='flex flex-col'>
                  <span className='text-[10px]'> value</span>
                  <div className='flex gap-2 items-center'>
                    <h4 className='font-bold text-md'>${(totalValue /1000000).toLocaleString("en-us",{maximumFractionDigits: 2})}M</h4>
                    <span className='text-green-500 flex items-center gap-1'>
                      <TrendingUp className='w-4 h-4' /> 
                      {formatedChangePercentage} 
                    </span>
                  </div>
                </div>
                    {/* right side */}
                  <select className='p-1 bg-white border text-gray-500 border-gray-400 shadow rounded-sm focus:outline-none font-semibold' name='timeline' id='timeline' onChange={(e)=> setTimeLine(e.target.value)}>
                    <option value='daily' >Daily</option>
                    <option value='weekly' >Weekly</option>
                    <option value='monthly' >Monthly</option>
                    <option value='yearly' >Yearly</option>
                  </select>
                
              </div>

                {/* chart */}
              <ResponsiveContainer width="100%" height={220} className='mx-2'>
                <BarChart width={730} height={250} data={salesData} margin={{
                top: 5,
                right: 5,
                left: -20,
                bottom: 0,
                }} >
                <CartesianGrid strokeDasharray="" vertical={false} />
                   <XAxis dataKey="date" tickFormatter={(value)=>{
                    const date = new Date(value)
                    // const actualDate = date.split(T)[0]
                    return `${date.getMonth() + 1}/${date.getDate()}`
                   }} />
                   <YAxis tickLine={false} axisLine={false} tickFormatter={(value)=>{
                    return `$${value/1000000}M`
                   }} tick={{fontSize:12, dx:-1}} />
                   <Tooltip formatter={(value:number)=>[
                    `${value.toLocaleString("en-us")}`
                   ]} labelFormatter={(label)=>{
                    const date = new Date(label);
                    return date.toLocaleDateString('en-us', {
                      year: "numeric",
                      month:"long",
                      day: "numeric"
                    })
                   }} />
                   <Bar dataKey="totalValue" fill="#3182ce" barSize={10} radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
                   {/* footer */}
              <div>
                <hr />
                <div className='flex justify-between mx-5 pt-2 items-center'>
                  <span>5 days</span>
                  <div className="flex items-center gap-1">
                    <h4>Highest sales Date:  </h4>
                    <span className='font-bold'>{HighestValueDate}</span>
                  </div>
                </div>
              </div>
        </>
      )}
    </div>
  )
}

export default SalesSummaryCard