// components/PesanRuanganButton.tsx

'use client'; // <-- WAJIB: Menandakan ini adalah Client Component

import React from 'react';
import { Button } from '@/components/ui/button'; // Asumsi ini adalah Client Component atau kompatibel
import { Plus } from 'lucide-react';

// Anda juga dapat menggunakan 'useRouter' dari next/navigation di sini jika perlu navigasi
// import { useRouter } from 'next/navigation';

const PesanRuanganButton: React.FC = () => {
  // const router = useRouter(); // Jika perlu navigasi

  const handlePesanRuangan = () => {
  };

  return (
    <Button
      className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1 shadow-md"
      onClick={handlePesanRuangan} // Event handler sekarang bisa bekerja
    >
      <Plus className="w-5 h-5" />
      Pesan Ruangan
    </Button>
  );
};

export default PesanRuanganButton;