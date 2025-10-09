import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Bell, ChevronDown, Volume2 } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full px-6 py-4 lg:px-10 text-white shadow-md h-16" style={{
        background: 'linear-gradient(to left, #00778C 0%, #00A6BF 100%)',
      }}>

      {/* Logo dan Brand iMeeting */}
      <div className="flex items-center gap-2">
        <Link href='/' className='flex items-center gap-1 my-0'>
          <Image src="/icons/PLN.png" alt="iMeeting Logo" width={38} height={52} className='max-sm:size-10 flex items-center' />
          <p className='text-[18px] font-extrabold text-white max-sm:hidden'>iMeeting</p>
        </Link>
      </div>

      {/* Konten Sisi Kanan: Kontak Aduan, Notifikasi, dan Profil */}
      <div className="flex items-center gap-4">

        {/* Tombol Kontak Aduan */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors shadow-md max-sm:hidden">
          <Volume2 className="w-5 h-5" />
          <span className="font-medium text-sm">Kontak Aduan</span>
        </button>

        {/* Notifikasi Bell */}
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-200 transition-colors" />

        {/* Profil Pengguna */}
        <div className="flex-between gap-5">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <MobileNav />
        </div>
      </div>
    </nav>
  )
}

export default Navbar