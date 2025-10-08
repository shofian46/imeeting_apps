import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Bell, ChevronDown, Volume2 } from 'lucide-react'

const Navbar = () => {
  return (
    // Mengubah background dari gradient menjadi warna solid (biru kehijauan)
    <nav className="fixed top-0 left-0 w-full z-10 flex items-center justify-between px-6 py-3 bg-[#2496a7] text-white shadow-md h-16">

      {/* Logo dan Brand iMeeting */}
      <div className="flex items-center gap-2">
        {/* Logo Icon Placeholder (Yellow Icon) */}
        <Link href='/' className='flex items-center gap-1 my-0'>
          <Image src="/icons/PLN.png" alt="iMeeting Logo" width={38} height={52} className='max-sm:size-10 flex items-center' />
          <p className='text-[18px] font-extrabold text-white max-sm:hidden'>iMeeting</p>
        </Link>
      </div>

      {/* Konten Sisi Kanan: Kontak Aduan, Notifikasi, dan Profil */}
      <div className="flex items-center gap-4">

        {/* Tombol Kontak Aduan */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors shadow-md">
          <Volume2 className="w-5 h-5" />
          <span className="font-medium text-sm">Kontak Aduan</span>
        </button>

        {/* Notifikasi Bell */}
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-200 transition-colors" />

        {/* Profil Pengguna */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-black/10 p-1 rounded-full transition-colors">
          {/* Avatar Pengguna */}
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar