import React, { ReactNode } from 'react'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='relative'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <section className='flex min-h-screen flex-1 flex-col px-5 pb-5 pt-20 max-md:pb-14 sm:pt-14'>
          <div className='w-full'>
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}

export default HomeLayout