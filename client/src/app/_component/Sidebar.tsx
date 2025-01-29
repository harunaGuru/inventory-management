"use client"
import { useAppSelector, useAppDispatch } from '@/redux';
import { setIsCollapsibble } from '@/state';
import { Layout, LucideIcon, Archive, Clipboard, User, SlidersHorizontal, CircleDollarSign, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
type SideBarProps ={
  name: string;
  href: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

const SideBarLinks = ({name, href, icon: Icon, isCollapsed}: SideBarProps)=>{
  const pathname = usePathname()
  const activeLink = pathname === href
  return (
    <Link href={href} className={`flex gap-2 items-center py-3 px-4 mb-2 hover:bg-blue-100 ${activeLink ? "bg-blue-300" : ""}`}>
      <Icon className={`w-5 h-5 ${isCollapsed ? "hidden md:block" : "block"}`} />
      <span className={` ${isCollapsed ? 'hidden' : 'block'} `}>{name}</span>
    </Link>
  )
}
const Sidebar = () => {
  const isSidebarCollapsed = useAppSelector((state)=> state.global.isSideBarCollapsed)
  const dispatch = useAppDispatch()
 
  const handleToggle = ()=>{
    dispatch(setIsCollapsibble(!isSidebarCollapsed))
  }
 
  return (
    <div className={`z-10  text-gray-900 flex flex-col bg-white fixed h-full  ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} shadow-md `}>
      {/* header */}
      <div className='flex justify-between items-center py-7'>
      <div className={`${isSidebarCollapsed ? "hidden": "block"} flex items-center gap-1 px-4 py-4`}>
        <div>img</div>
        <h1 className=' font-bold text-sm'>HD Stock</h1>
      </div>
      <button onClick={handleToggle} className='md:hidden px-3 py-3 hover:bg-blue-100 rounded-full'>
        <Menu className='w-4 h-4 text-gray-500' />
      </button>
      </div>
      {/* content */}
      <div className='flex-grow'>
        <SideBarLinks name='Dashboard' href='/dashboard' icon={Layout}  isCollapsed={isSidebarCollapsed} />
        <SideBarLinks name='Inventory' href='/inventory' icon={Archive} isCollapsed={isSidebarCollapsed} />
        <SideBarLinks name='Products' href='/products' icon={Clipboard} isCollapsed={isSidebarCollapsed}/>
        <SideBarLinks name='User' href='/users' icon={User} isCollapsed={isSidebarCollapsed} />
        <SideBarLinks name='Settings' href='/settings' icon={SlidersHorizontal} isCollapsed={isSidebarCollapsed}/>
        <SideBarLinks name='Expenses' href='/expenses' icon={CircleDollarSign} isCollapsed={isSidebarCollapsed}/>
      </div>
      {/* footer */}
      <div className={`${isSidebarCollapsed ? "hidden" : "flex"} text-xs  justify-center items-center`}>
        <span>&copy;2024 HDStock</span>
      </div>
    </div>
  )
}

export default Sidebar