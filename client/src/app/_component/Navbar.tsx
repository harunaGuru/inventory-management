"üse client"
import { useAppSelector, useAppDispatch } from '@/redux';
import { setIsCollapsibble, setIsDarkMOde } from '@/state';
import { BellIcon, Menu, Moon, Settings, Sun } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const Navbar = () => {
  const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector((state)=> state.global.isSideBarCollapsed)
  const isDarkMode = useAppSelector((state)=> state.global.isDarkMode)


  const handleDarkMode = ()=>{
    dispatch(setIsDarkMOde(!isDarkMode))
  }
  const handleToggle = ()=>{
    dispatch(setIsCollapsibble(!isSidebarCollapsed))
  }
  return (
    <div className='flex justify-between items-center mb-1 '>
      {/* left-side */}
      <div className='flex gap-2 items-center '>
        <button onClick={handleToggle} className='hidden md:block py-3 px-3 hover:bg-blue-100 rounded-full'>
          <Menu className="w-4 h-4" />
        </button>
        <div className="relative ">
          <input autoCapitalize='off' type="text" name="search" id="search" placeholder='start type to search product' className='border-2 border-gray-300 bg-white w-50 md:w-60 rounded-lg pr-4 pl-10 py-1 focus:outline-none focus:border-blue-500' />
          <div  className="absolute inset-y-0 left-0 pl-3 items-center flex pointer-event-none">
          <BellIcon className='text-gray-500' size={16} />
          </div>
        </div>
      </div>
      {/* right-side */}
      <div className='gap-2 items-center flex'>
        <button>
        {isDarkMode ? (
          <Sun onClick={handleDarkMode} size={18} className='text-gray-500 cursor-pointer' /> ) :(
          <Moon onClick={handleDarkMode} size={18} className='text-gray-500 cursor-pointer' />
        )}
        </button>
        <div className='relative'>
        <BellIcon size={24} className='text-gray-500 cursor-pointer' />
        <span className='absolute h-4 w-4 bg-red-400 -top-1 left-3 text-red-800 flex items-center justify-center p-1 rounded-full  font-bold'>3</span>
        </div>
      <hr className='w-0 h-7 border border-solid border-1  border-gray-300 mx-3' />
      <div className='flex gap-2 items-center'>
        <div className='h-6 w-6 bg-gray-400 rounded-full'></div>
        <span className=' font-semibold'>HD Olads</span>
        <Link href='/settings'>
        <Settings size={18} className='text-gray-500 cursor-pointer'/>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default Navbar