import React from 'react'
import Header from './Header'
import { ExpenseByCategory, useGetDashboardMetricsQuery } from '@/state/api'
import { TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type ExpenseBySum = {
  [category: string] : number
}

const ExpenseSummaryCard = () => {
    const { data, error, isLoading } = useGetDashboardMetricsQuery();
    const expensesSum = data?.expenseSummary[0]
    const expenseByCatSummary = data?.expenseByCategorySummary || []
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    
    const filteredSum = expenseByCatSummary.reduce((acc:ExpenseBySum, items:ExpenseByCategory)=>{
    const category = items.category + " Expenses"
    const amount =  parseInt(items.amount, 10)
    // eslint-disable-next-line
    const expenses: any = {};
    if(!expenses[category]) acc[category] = 0
    acc[category] += amount 
    return acc
  }, {})

const expensesCategory = Object.entries(filteredSum).map(([name, value])=>({
  name, 
  value
}))
const totalExpense = expensesCategory.reduce ((acc, curr:{value: number})=> acc + curr.value, 0)
const formattedValue = totalExpense.toFixed(2)
  return (
    <div className='row-span-3 lg:row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between'>
        {error && <div className="m-5">failed to fetch products</div>}
      {isLoading ?(
        <div className="m-5">Loading...</div>
      ):(
        <>
            <Header headerName='Expenses Summary' />
            <hr />
            <div className='lg:flex justify-between pr-5 gap-5'>
              <div className='relative basis-3/5'>
                <ResponsiveContainer width="100%" height={105} className='p-2'>
                  <PieChart>
                      <Pie data={expensesCategory} dataKey='value' nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={50} fill="#8884d8">
                      {expensesCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                      </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 text-center basis-2/5">
                  <span className='text-bold text-lg'>{formattedValue} </span>          
                </div>
              </div>
              <ul className='flex flex-col justify-around items-center lg:items-start py-5 gap-3'>
                {expensesCategory.map((entry, index) =>(
                  <li key={`legend-${index}`} className='flex items-center text-xs'>
                    <span className='mr-2 w-3 h-3 rounded-full' style={{backgroundColor: COLORS[index % COLORS.length]}}></span>
                    {entry.name}
                  </li>
                ))}
              </ul>
            </div>
            {/* footer */}
            <div>
              <hr />
              {expensesSum && 
                <div className='mx-5 flex justify-between mt-1 pb-4 items-center'>
                  <span >Average: {" "} 
                    <span className='font-bold'> ${expensesSum.totalExpenses.toFixed(2)} </span>
                  </span>
                  <span className='flex items-center'> 
                    <TrendingUp className='w-4 h-4 text-green-500 mr-1'  />
                    30%
                  </span>
                </div>
              }
            </div>
        </>
      )}
    </div>

  )
}

export default ExpenseSummaryCard