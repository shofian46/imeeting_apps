// Tipe serbaguna untuk item dropdown
export interface DropdownItem {
  id: string;
  nama: string;
  [key: string]: any;
}

// Tipe spesifik untuk Unit
export interface MasterOffice extends DropdownItem {
  nama: string;
}

// Tipe spesifik untuk Ruang Meeting
export interface MasterMeetingRoom extends DropdownItem {
  officeId: string;
  namaRuangan: string;
  kapasitas: number;
}

// Tipe spesifik untuk Jenis Konsumsi
// Penting: Memastikan 'jenis' selalu ada dan bertipe string.
export interface MasterKonsumsi {
  id: string;
  jenis: string; // e.g., "Snack Siang", "Makan Siang", "Snack Sore"
  maxPrice: number;
}

// Tipe data formulir utama
export interface MeetingData {
  unit: string;
  ruangMeeting: string;
  kapasitas: number;
  tanggalRapat: string; // YYYY-MM-DD
  waktuMulai: string; // HH:mm
  waktuSelesai: string; // HH:mm
  jumlahPeserta: number;
  // Key adalah nama jenis konsumsi (e.g., "Snack Siang"), value adalah boolean (checked/unchecked)
  konsumsi: { [key: string]: boolean };
  nominalKonsumsi: number;
}
