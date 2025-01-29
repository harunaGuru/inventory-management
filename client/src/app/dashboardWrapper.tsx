"use client"
import React from 'react'
import Sidebar from './_component/Sidebar';
import Navbar from './_component/Navbar';
import StoreProvider, { useAppSelector } from '@/redux';

// StoreProvider
const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const isSidebarCollapsed = useAppSelector((state)=> state.global.isSideBarCollapsed)
    const darkMode = useAppSelector((state)=> state.global.isDarkMode)
  // const isSidebarCollapsed = true
  return (
    <div className={`${darkMode ? "dark" : "light"} flex text-gray-900 bg-gray-50 w-full min-h-screen`}>
        <Sidebar />
        <main className={`py-4 px-9 w-full h-full bg-gray-50 rounded shadow flex flex-col  ${isSidebarCollapsed ? "md:pl-20" : "md:pl-64"}`}>
        <Navbar />
        {children}
        </main>
    </div>
  )
}

const DashboardWrapper = ({children}: {children: React.ReactNode})=>{
  return(
    <StoreProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper