'use client'
import { ExpenseByCategory, useGetExpensesQuery } from '@/state/api'
import React, { useMemo, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type AggregatedDataItem = {
    name: string;
    color? : string;
    amount: number;
}
type AggregatedData ={
    [category: string]: AggregatedDataItem
}
const Expenses = () => {
   const [category, setCategory] = useState("All")
   const [activeIndex, setActiveIndex] = useState(0)
   const [startDate, setStartDate] = useState('')
   const [endDate, setEndDate] = useState('')
    const { data: expensesData, error, isLoading } = useGetExpensesQuery()
    const expenses = useMemo(()=> expensesData ?? [], [expensesData])
    const parseDate = (dateString: string)=>{
        const date = new Date(dateString)
        return date.toISOString().split("T")[0]
    }
    const aggregatedData:AggregatedDataItem[] = useMemo(()=>{
        const filteredArray:AggregatedData = expenses?.filter((item:ExpenseByCategory)=>{
            const matchesCategory = category === 'All' || item.category === category
            const matchesDate = !startDate || !endDate || (parseDate(item.date) >= startDate && parseDate(item.date) <= endDate)
            return matchesCategory && matchesDate
        }).reduce((acc: AggregatedData, curr:ExpenseByCategory)=>{
            const amount = parseInt(curr.amount)
            if(!acc[curr.category]){
                acc[curr.category] = {
                    name: curr.category, 
                    amount: 0
                }
                acc[curr.category].color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                acc[curr.category].amount += amount
            }
            return acc;
        }, {})
        return Object.values(filteredArray)
    }, [expenses, category, startDate, endDate])
    
    const labelcss ='block text-sm font-medium text-gray-700'
    const inputCss ='mt-1 block w-full pl-3 pr-10 py-2 text-gray-500 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
    if(isLoading){
        return <div className='py-4'>Loading...</div>
      }
      if(error || !expenses){
          return <div className='text-center text-red-500 py-4'> Failed to fetch expenses</div>
      }
  return (
    <div className='mx-3'>
        <h2 className="font-bold text-base py-2  text-gray-900">Expenses</h2>
        <p className='text-xs mt-0 text-gray-500'>A virtual representation over time</p>
        <div className='flex flex-col md:flex-row justify-between gap-4 mt-5'>
            <div className='w-full md:w-1/3 bg-white shadow rounded-lg p-6'>
                <label className={labelcss} htmlFor='cat'>Category</label>
                <select onChange={(e)=> setCategory(e.target.value)} className={inputCss} name="cat" id="cat">
                <option value="All">All</option>
                <option value="Office">Office</option>
                <option value="Professional">Professional</option>
                <option value="Salaries">Salaries</option>
                </select>
                <label className={labelcss} htmlFor='start'>Start Date</label>
                <input onChange={(e)=> setStartDate(e.target.value)} className={inputCss} type="date" name="start" id="start" />
                <label className={labelcss} htmlFor='end'>End Date</label>
                <input onChange={(e)=> setEndDate(e.target.value)} className={inputCss} type="date" name="end" id="end" />
            </div>
            <div className='flex-grow bg-white shadow rounded-lg p-4 md:p-6'>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie  label data={aggregatedData} dataKey='amount' nameKey="name" onMouseEnter={(_, index)=> setActiveIndex(index)} cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
                        {aggregatedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === activeIndex ? "rgb(29, 78, 216)" : entry.color} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}

export default Expenses