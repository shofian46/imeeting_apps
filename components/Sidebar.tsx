'use client'

import React from 'react'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className='sticky left-0 flex top-0 h-screen w-fit flex-col justify-between bg-white p-6 pt-28 text-dark-2 max-sm:hidden lg:w-[264px] shadow-lg border-r border-gray-200'>
      <div className='flex flex-col gap-6 flex-1'>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
          const baseClasses = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200';
          const activeClasses = 'bg-blue-2 text-white shadow-lg rounded';
          const inactiveClasses = 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700';

          return (
            <Link href={link.route} key={link.label} className={cn('flex items-center gap-4 p-4 rounded-lg justify-start', { [activeClasses]: isActive, [inactiveClasses]: !isActive })}>
              <Image src={link.imgUrl} alt={link.label} width={20} height={20} className={cn('bg-transparent text-blue-2', {
                'bg-transparent text-white': isActive,
              })} />
              <p className={cn('text-sm font-medium max-lg:hidden')}>
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  )
}

export default Sidebar