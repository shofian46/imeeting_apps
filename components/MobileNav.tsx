"use client"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className='w-full max-w-[264px]'>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={25}
            height={25}
            alt="Menu"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-gray-50">
          <Link href='/' className='flex items-center gap-1 my-0'>
            <Image src="/icons/PLN.png" alt="iMeeting Logo" width={38} height={52} className='max-sm:size-10 flex items-center' />
            <p className='text-[18px] font-extrabolds'>iMeeting</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.route || pathname.startsWith(link.route + '/');
                  const baseClasses = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200';
                  const activeClasses = 'bg-blue-600 text-white shadow-md';
                  const inactiveClasses = 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700';

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link href={link.route} key={link.label} className={cn('flex items-center gap-4 p-4 rounded-lg w-full max-w-60', { [activeClasses]: isActive, [inactiveClasses]: !isActive })}>
                        <Image src={link.imgUrl} alt={link.label} width={20} height={20} className={cn('bg-transparent text-dark-2 ', {
                          'bg-transparent text-white': isActive,
                        })} />
                        <p className={cn('font-semibold')}>
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav