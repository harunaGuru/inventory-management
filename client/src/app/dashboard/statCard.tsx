import { LucideIcon } from 'lucide-react';
import React from 'react'
type StatDetails ={
  title: string;
  amount: string;
  changePercentage: number;
  Icon: LucideIcon;
}

type StatCardProps ={
    title: string;
    primaryIcon: JSX.Element;
    details: StatDetails[];
    dateRange: string;
}

const StatCard = ({title, primaryIcon, details, dateRange }: StatCardProps) => {
  const getColor = (index:number)=> index >= 0 ? "text-green-500" : "text-red-500";
  const formattedPercentage = (value: number)=>{
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed(2)}%`
  }

  return (
    <div className='md:row-span-1 lg:row-span-2 bg-white shadow-md rounded-2xl pb-2 flex flex-col justify-between'>
      <div>
        <div className='flex justify-between items-center px-5'>
          <h2 className="font-bold text-base py-2  text-gray-900">{title}</h2>
          <span className='text-xs text-gray-400'>{dateRange}</span>
        </div>
        <hr />
      </div>
      <div className='flex items-center justify-around gap-2 px-5'>
        <div className='p-3 rounded-full bg-blue-50 border-sky-300 border-[1px]'>
          {primaryIcon}
        </div>
        <div className='flex-1 '>
          {details.map((detail, index)=>(
            <React.Fragment key={index}>
              <div className='flex items-center justify-between my-2'>
                <span className='text-gray-500 text-sm'>{detail.title}</span>
                <span  className='text-gray-800 font-bold'>{detail.amount}</span>
                <div className='flex items-center'>
                <detail.Icon className={`w-4 h-4 mr-1 ${getColor(detail.changePercentage)}`} />
                <span className={`font-medium ${getColor(detail.changePercentage)}`}>
                {formattedPercentage(detail.changePercentage)}
                </span>
                </div>
              </div>
              {index < details.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatCard