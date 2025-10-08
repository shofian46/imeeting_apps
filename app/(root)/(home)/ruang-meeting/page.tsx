'use client';
import React from 'react'
import { Button } from '@/components/ui/button';
import { File, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LinkButton from '@/components/ui/LinkButton';


const MeetingRoom = () => {

  return (
    <section className="flex size-full flex-col gap-10 text-dark-2 pt-4">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          {/* Judul Utama */}
          <h1 className="text-3xl font-extrabold text-gray-800">Ruang Meeting</h1>
          {/* Sub-judul/Breadcrumb */}
          <p className="text-gray-500 text-sm mt-1">Ruang Meeting</p>
        </div>

        {/* Tombol "Pesan Ruangan" */}
        <LinkButton href="/ruang-meeting/pesan-ruangan" className="shadow-lg rounded flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Pesan Ruang Meeting
        </LinkButton>
      </div>

    </section>
  )
}

export default MeetingRoom