"use client"
import React from 'react'
import PopularProductCard from './PopularProductCard'
import SalesSummaryCard from './SalesSummaryCard'
import PurchaseSummaryCard from './PurchaseSummaryCard'
import ExpenseSummaryCard from './ExpenseSummaryCard'
import StatCard from './statCard'
import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";


const Dashboard = () => {
  return (
    <div className='md:mx-3 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:overflow-auto customised-grid-layout'>
      <PopularProductCard />
      <SalesSummaryCard />
      <PurchaseSummaryCard />
      <ExpenseSummaryCard />
      {/* <div className='row-span-3 lg:row-span-3 bg-gray-400'>4</div> */}
      <StatCard title='Customer & Expenses' dateRange='22-29 october 2023' primaryIcon={<Package className='w-6 h-6 text-blue-600' />} details={[
        {
          title: 'Customer Growth',
          amount: '131',
          changePercentage: 131,
          Icon: TrendingUp

        },
        {
          title: 'Expenses',
          amount: '10.00',
          changePercentage: -56,
          Icon: TrendingDown

        }
      ]}/>
      <StatCard title='Dues & Pending Order' dateRange='22-29 october 2023' primaryIcon={<CheckCircle className='w-6 h-6 text-blue-600' />} details={[
        {
          title: 'Dues',
          amount: '250.00',
          changePercentage: 131,
          Icon: TrendingUp

        },
        {
          title: 'Pending Orders',
          amount: '147',
          changePercentage: -56,
          Icon: TrendingDown

        }
      ]}/>
      <StatCard title='Sales & Discount' dateRange='22-29 october 2023' primaryIcon={<Tag className='w-6 h-6 text-blue-600' />} details={[
        {
          title: 'Sales',
          amount: '1000.00',
          changePercentage: 20,
          Icon: TrendingUp

        },
        {
          title: 'Discount',
          amount: '200.00',
          changePercentage: -10,
          Icon: TrendingDown

        }
      ]}/>
      {/* <div className='md:row-span-1 lg:row-span-2 bg-gray-400'>5</div> */}
      {/* <div className='md:row-span-1 lg:row-span-2 bg-gray-400'>6</div>
      <div className='md:row-span-1 lg:row-span-2 bg-gray-400'>7</div> */}
    </div>
  )
}

export default Dashboard
