'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';

// --- KONSTANTA HARGA ---
const SNACK_PRICE = 20000;
const MEAL_PRICE = 30000;

interface FormValues {
  unit: string;
  ruangMeeting: string;
  kapasitas: number;
  tanggalRapat: string;
  waktuMulai: string;
  waktuSelesai: string;
  jumlahPeserta: number;
  konsumsi: {
    snackSiang: boolean;
    makanSiang: boolean;
    snackSore: boolean;
  };
}
interface FormErrors {
  waktu: string;
  peserta: string;
}

const unitOptions = [
  { value: 'pilih', label: 'Pilih Unit' },
  { value: 'uid_jaya', label: 'UID JAYA' },
  { value: 'unit_a', label: 'Unit PLN A' },
];
const ruangOptions = [
  { value: 'pilih', label: 'Pilih Ruang Meeting' },
  { value: 'prambanan', label: 'Ruang Prambanan' },
  { value: 'cendana', label: 'Cendana' },
];
const waktuOptions = [
  { value: 'pilih', label: 'Pilih Waktu' },
  { value: '08:00', label: '08:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '14:00', label: '14:00' },
  { value: '16:00', label: '16:00' },
  { value: '18:00', label: '18:00' },
];

// --- FUNGSI UTAMA KOMPONEN ---

const PesanRuanganPage: React.FC = () => {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>({
    unit: 'uid_jaya',
    ruangMeeting: 'prambanan',
    kapasitas: 50,
    tanggalRapat: '2024-06-28',
    waktuMulai: '10:00',
    waktuSelesai: '16:00',
    jumlahPeserta: 10,
    konsumsi: {
      snackSiang: false,
      makanSiang: false,
      snackSore: false,
    },
  });
  const [errors, setErrors] = useState<FormErrors>({
    waktu: '',
    peserta: '',
  });

  const nominalKonsumsi = useMemo(() => {
    const { jumlahPeserta, konsumsi } = values;
    if (jumlahPeserta <= 0) return 0;

    let totalCostPerPerson = 0;
    if (konsumsi.snackSiang) totalCostPerPerson += SNACK_PRICE;
    if (konsumsi.makanSiang) totalCostPerPerson += MEAL_PRICE;
    if (konsumsi.snackSore) totalCostPerPerson += SNACK_PRICE;

    return totalCostPerPerson * jumlahPeserta;
  }, [values.jumlahPeserta, values.konsumsi]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Khusus untuk checkbox
    if (type === 'checkbox' && name.startsWith('konsumsi.')) {
      const konsumsiType = name.split('.')[1] as keyof FormValues['konsumsi'];
      setValues(prev => ({
        ...prev,
        konsumsi: {
          ...prev.konsumsi,
          [konsumsiType]: (e.target as HTMLInputElement).checked
        }
      }));
      return;
    }

    setValues(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));

    // Simulasi Kapasitas
    if (name === 'ruangMeeting') {
      const kapasitasBaru = value === 'prambanan' ? 50 : (value === 'cendana' ? 15 : 20);
      setValues(prev => ({ ...prev, kapasitas: kapasitasBaru }));
    }
  };

  useEffect(() => {
    const start = values.waktuMulai;
    const end = values.waktuSelesai;
    let waktuError = '';

    if (start !== 'pilih' && end !== 'pilih') {
      const startMinutes = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
      const endMinutes = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
      if (startMinutes >= endMinutes) {
        waktuError = 'Waktu selesai harus lebih besar dari waktu mulai.';
      }
    }
    setErrors(prev => ({ ...prev, waktu: waktuError }));
  }, [values.waktuMulai, values.waktuSelesai]);

  useEffect(() => {
    let pesertaError = '';
    if (values.jumlahPeserta > values.kapasitas && values.kapasitas > 0) {
      pesertaError = `Jumlah peserta (${values.jumlahPeserta}) melebihi kapasitas ruangan (${values.kapasitas}).`;
    }
    setErrors(prev => ({ ...prev, peserta: pesertaError }));
  }, [values.jumlahPeserta, values.kapasitas]);


  useEffect(() => {
    // Kriteria validasi yang harus dipenuhi (sesuai contoh Anda):
    const isValid = !errors.waktu && !errors.peserta && values.jumlahPeserta > 0 && values.waktuMulai !== 'pilih' && values.waktuSelesai !== 'pilih';

    // Jika valid, terapkan centang default (sesuai logika rules yang dulu kita buat)
    if (isValid) {
      const startHour = parseInt(values.waktuMulai.split(':')[0], 10);
      const endHour = parseInt(values.waktuSelesai.split(':')[0], 10);

      const newConsumsi = {
        snackSiang: startHour < 11, // Meeting mulai sebelum jam 11.00
        makanSiang: startHour < 14 && endHour >= 11, // Meeting irisan 11.00-14.00
        snackSore: endHour > 14, // Meeting irisan di atas jam 14.00
      };

      // Update state konsumsi hanya jika berbeda
      if (JSON.stringify(newConsumsi) !== JSON.stringify(values.konsumsi)) {
        setValues(prev => ({ ...prev, konsumsi: newConsumsi }));
      }
    } else {
      // Jika tidak valid, pastikan semua checkbox tidak dicentang (default)
      if (values.konsumsi.snackSiang || values.konsumsi.makanSiang || values.konsumsi.snackSore) {
        setValues(prev => ({
          ...prev,
          konsumsi: { snackSiang: false, makanSiang: false, snackSore: false }
        }));
      }
    }
  }, [errors.waktu, errors.peserta, values.jumlahPeserta, values.waktuMulai, values.waktuSelesai]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.waktu || errors.peserta || values.waktuMulai === 'pilih' || values.waktuSelesai === 'pilih') {
      alert('Terdapat kesalahan pada input atau validasi, mohon periksa kembali.');
      return;
    }

    console.log('Data Pemesanan:', values);
    console.log('Nominal Akhir:', nominalKonsumsi);
    alert('Pemesanan berhasil disimulasikan! Cek console.');
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <button
            onClick={() => router.back()}
            className="p-3 mr-3 rounded-lg bg-blue-2 hover:bg-blue-1 text-white transition-colors"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Pengajuan Perangkat</h1>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2 ml-16">
          <span className="cursor-pointer hover:text-blue-600">Pengajuan Perangkat</span>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-600" />
          <span className="font-semibold text-blue-600">Pengajuan Baru</span>
        </div>
      </div>
      {/* Form Card Dimulai Langsung Di Sini */}
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>

          {/* === BAGIAN 1: INFORMASI RUANG MEETING === */}
          <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">Informasi Ruang Meeting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Select
              label="Unit" name="unit" value={values.unit} onChange={handleChange} options={unitOptions} required
            />
            <Select
              label="Ruang Meeting" name="ruangMeeting" value={values.ruangMeeting} onChange={handleChange} options={ruangOptions} required
            />
          </div>

          <div className="mb-8 max-w-sm">
            <label className="text-sm font-medium text-gray-700 block mb-1">Kapasitas</label>
            <Input
              type="text" name="kapasitas" value={values.kapasitas.toString()} readOnly disabled
              className="bg-gray-100 cursor-not-allowed" placeholder="0"
            />
          </div>

          {/* === BAGIAN 2: INFORMASI RAPAT === */}
          <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">Informasi Rapat</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Input
              label="Tanggal Rapat*" type="date" name="tanggalRapat" value={values.tanggalRapat} onChange={handleChange} required
            />

            <div>
              <Select label="Waktu Mulai" name="waktuMulai" value={values.waktuMulai} onChange={handleChange} options={waktuOptions} required />
              {errors.waktu && <p className="text-red-500 text-xs mt-1">{errors.waktu}</p>}
            </div>

            <div>
              <Select label="Waktu Selesai" name="waktuSelesai" value={values.waktuSelesai} onChange={handleChange} options={waktuOptions} required />
              {errors.waktu && <p className="text-red-500 text-xs mt-1">{errors.waktu}</p>}
            </div>
          </div>

          <div className="mb-8 max-w-sm">
            <label className="text-sm font-medium text-gray-700 block mb-1">Jumlah Peserta</label>
            <Input
              type="number" name="jumlahPeserta" value={values.jumlahPeserta > 0 ? values.jumlahPeserta.toString() : ''}
              onChange={handleChange} placeholder="Masukkan Jumlah Peserta" min="1" max={values.kapasitas}
              className={errors.peserta ? 'border-red-500' : ''}
            />
            {errors.peserta && <p className="text-red-500 text-xs mt-1">{errors.peserta}</p>}
          </div>

          {/* === BAGIAN 3: KONSUMSI MANUAL & NOMINAL === */}
          <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">Konsumsi Rapat</h2>

          {/* Checkbox Konsumsi Manual */}
          <div className="flex flex-col gap-2 mb-8">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox" name="konsumsi.snackSiang"
                checked={values.konsumsi.snackSiang}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              Snack Siang
            </label>
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox" name="konsumsi.makanSiang"
                checked={values.konsumsi.makanSiang}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              Makan Siang
            </label>
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox" name="konsumsi.snackSore"
                checked={values.konsumsi.snackSore}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              Snack Sore
            </label>
          </div>

          {/* Nominal Konsumsi (Otomatis) */}
          <div className="mb-8 max-w-sm">
            <label className="text-sm font-medium text-gray-700 block mb-1">Nominal Konsumsi</label>
            <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
              <span className="pl-3 text-sm font-semibold text-gray-600">Rp.</span>
              <Input
                type="text" name="nominalKonsumsi" readOnly disabled
                value={nominalKonsumsi.toLocaleString('id-ID')}
                className="bg-gray-100 border-none px-3 py-2 cursor-not-allowed font-semibold"
                placeholder="0"
              />
            </div>
          </div>

          {/* --- BAGIAN TOMBOL AKSI --- */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!!errors.waktu || !!errors.peserta}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md shadow-md transition-colors 
                ${(errors.waktu || errors.peserta) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              `}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PesanRuanganPage;