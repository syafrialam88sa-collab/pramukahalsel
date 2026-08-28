// ==========================================
// 1. STATE & DATABASE (Mock Data)
// ==========================================
let shbRegistrants = [
    { id: 1, name: 'Siti Aminah, S.Pd', nta: '3204.01.0022', pangkalan: 'SMA Negeri 1 Halmahera Selatan', level: 'KMD Penggalang', date: '27 Feb 2026' },
    { id: 2, name: 'Baharuddin, S.Pd.I', nta: '3204.02.0105', pangkalan: 'SMP Negeri 2 Labuha', level: 'KML Siaga', date: '25 Feb 2026' },
    { id: 3, name: 'Nurul Hidayah', nta: '3204.01.0341', pangkalan: 'SD Negeri 1 Bacan', level: 'KMD Siaga', date: '24 Feb 2026' }
];

let shlRegistrants = [
    { id: 1, name: 'Drs. H. M. Kasim', nta: '3204.PL.001', ranting: 'Kwartir Ranting Bacan', level: 'KPD (Kader Pelatih)', date: '26 Feb 2026' },
    { id: 2, name: 'Jamilah Abubakar, M.Pd', nta: '3204.PL.014', ranting: 'Kwartir Ranting Bacan Selatan', level: 'KPL (Pelatih Lanjutan)', date: '22 Feb 2026' }
];

let kegiatanList = [
    { id: 1, title: 'Musyawarah Cabang (Muscab) Gerakan Pramuka Halsel', date: '12 - 14 Maret 2026', location: 'Aula Kantor Bupati Halmahera Selatan', category: 'Andalan Cabang & Utusan Ranting', desc: 'Agenda lima tahunan evaluasi program kerja dan pemilihan Ketua Kwartir Cabang masa bakti berikutnya.' },
    { id: 2, title: 'Kursus Mahir Dasar (KMD) Penggalang', date: '20 - 25 Maret 2026', location: 'SMP Negeri 1 Labuha', category: 'Pembina Gugus Depan', desc: 'Pelatihan wajib bagi pembina pangkalan sekolah yang belum memiliki lisensi kepramukaan dasar.' },
    { id: 3, title: 'Perkemahan Hari Pramuka ke-65', date: '14 - 17 Agustus 2026', location: 'Bumi Perkemahan Saruma, Bacan', category: 'Semua Golongan', desc: 'Ajang pertemuan akbar pramuka penggalang dan penegak se-Halmahera Selatan.' }
];

// ==========================================
// 2. FUNGSI RENDER TAMPILAN (UI Rendering)
// ==========================================
window.renderRegistrantsTables = function() {
    // Render SHB Table
    const shbBody = document.getElementById('shbRegistrantsTableBody');
    if (shbBody) {
        if (shbRegistrants.length === 0) {
            shbBody.innerHTML = `<tr><td colspan="5" class="p-6 text-center text-gray-400 font-medium bg-gray-50/50">Belum ada data pengajuan SHB.</td></tr>`;
        } else {
            shbBody.innerHTML = shbRegistrants.map((item, index) => `
                <tr class="hover:bg-blue-50/30 transition-colors">
                    <td class="p-4 font-bold text-gray-400">${index + 1}</td>
                    <td class="p-4">
                        <div class="font-bold text-gray-800">${item.name}</div>
                        <div class="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-1"><i class="fa-regular fa-id-card text-pramukaGold mr-1"></i> NTA: ${item.nta}</div>
                    </td>
                    <td class="p-4 text-gray-600 font-medium"><i class="fa-solid fa-school text-gray-300 mr-2"></i>${item.pangkalan}</td>
                    <td class="p-4"><span class="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider border border-amber-200">${item.level}</span></td>
                    <td class="p-4 text-center space-x-1">
                        <button onclick="window.viewRegistrantDetail('shb', ${item.id})" title="Lihat Berkas" class="w-8 h-8 inline-flex items-center justify-center text-blue-600 hover:text-white hover:bg-blue-600 bg-blue-50 rounded-lg transition-all"><i class="fa-solid fa-eye"></i></button>
                        <button onclick="window.printRegistrantCard('shb', ${item.id})" title="Cetak Kartu" class="w-8 h-8 inline-flex items-center justify-center text-emerald-600 hover:text-white hover:bg-emerald-600 bg-emerald-50 rounded-lg transition-all"><i class="fa-solid fa-print"></i></button>
                        <button onclick="window.deleteRegistrant('shb', ${item.id})" title="Hapus" class="w-8 h-8 inline-flex items-center justify-center text-red-500 hover:text-white hover:bg-red-500 bg-red-50 rounded-lg transition-all"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            `).join('');
        }
    }

    // Render SHL Table
    const shlBody = document.getElementById('shlRegistrantsTableBody');
    if (shlBody) {
        if (shlRegistrants.length === 0) {
            shlBody.innerHTML = `<tr><td colspan="5" class="p-6 text-center text-gray-400 font-medium bg-gray-50/50">Belum ada data pengajuan SHL.</td></tr>`;
        } else {
            shlBody.innerHTML = shlRegistrants.map((item, index) => `
                <tr class="hover:bg-orange-50/30 transition-colors">
                    <td class="p-4 font-bold text-gray-400">${index + 1}</td>
                    <td class="p-4">
                        <div class="font-bold text-gray-800">${item.name}</div>
                        <div class="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-1"><i class="fa-regular fa-id-card text-pramukaGold mr-1"></i> NTA: ${item.nta}</div>
                    </td>
                    <td class="p-4 text-gray-600 font-medium"><i class="fa-solid fa-map-location-dot text-gray-300 mr-2"></i>${item.ranting}</td>
                    <td class="p-4"><span class="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider border border-orange-200">${item.level}</span></td>
                    <td class="p-4 text-center space-x-1">
                        <button onclick="window.viewRegistrantDetail('shl', ${item.id})" title="Lihat Berkas" class="w-8 h-8 inline-flex items-center justify-center text-blue-600 hover:text-white hover:bg-blue-600 bg-blue-50 rounded-lg transition-all"><i class="fa-solid fa-eye"></i></button>
                        <button onclick="window.printRegistrantCard('shl', ${item.id})" title="Cetak Kartu" class="w-8 h-8 inline-flex items-center justify-center text-emerald-600 hover:text-white hover:bg-emerald-600 bg-emerald-50 rounded-lg transition-all"><i class="fa-solid fa-print"></i></button>
                        <button onclick="window.deleteRegistrant('shl', ${item.id})" title="Hapus" class="w-8 h-8 inline-flex items-center justify-center text-red-500 hover:text-white hover:bg-red-500 bg-red-50 rounded-lg transition-all"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            `).join('');
        }
    }
    window.renderAdminKegiatanList();
};

window.renderAdminKegiatanList = function() {
    const tbody = document.getElementById('adminKegiatanTableBody');
    if (tbody) {
        if (kegiatanList.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" class="p-6 text-center text-gray-400 font-medium bg-gray-50/50">Belum ada jadwal kegiatan dipublikasikan.</td></tr>`;
        } else {
            tbody.innerHTML = kegiatanList.map((item, index) => `
                <tr class="hover:bg-pramukaGreen/5 transition-colors">
                    <td class="p-4 font-bold text-gray-400">${index + 1}</td>
                    <td class="p-4">
                        <div class="font-bold font-heading text-gray-800 text-sm mb-1">${item.title}</div>
                        <div class="text-[10px] font-medium text-gray-500 flex items-center gap-3">
                            <span><i class="fa-solid fa-calendar text-pramukaGreen mr-1"></i> ${item.date}</span>
                            <span><i class="fa-solid fa-location-dot text-red-400 mr-1"></i> ${item.location}</span>
                        </div>
                    </td>
                    <td class="p-4"><span class="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider">${item.category}</span></td>
                    <td class="p-4 text-center">
                        <button onclick="window.deleteKegiatan(${item.id})" title="Hapus Event" class="w-8 h-8 inline-flex items-center justify-center text-red-500 hover:text-white hover:bg-red-500 bg-red-50 rounded-lg transition-all"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            `).join('');
        }
    }
};

window.renderPublicKegiatan = function() {
    const container = document.getElementById('publicKegiatanContainer');
    if (container) {
        if (kegiatanList.length === 0) {
            container.innerHTML = `<div class="col-span-2 text-center text-gray-400 py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">Belum ada agenda kegiatan yang dijadwalkan saat ini.</div>`;
        } else {
            container.innerHTML = kegiatanList.map((item, index) => {
                const colorSet = index % 2 === 0 ? 'bg-pramukaGreen/5 border-pramukaGreen/20 text-pramukaGreen' : 'bg-pramukaGold/5 border-pramukaGold/20 text-pramukaGoldDark';
                return `
                <div class="bg-white border border-gray-100 rounded-3xl p-6 shadow-lg shadow-gray-200/40 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 ${colorSet.split(' ')[0]} rounded-bl-full -z-10 opacity-50"></div>
                    <div>
                        <div class="flex flex-wrap justify-between items-start gap-2 mb-4">
                            <span class="bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border border-gray-200"><i class="fa-regular fa-clock mr-1"></i> ${item.date}</span>
                            <span class="bg-pramukaGreen/10 text-pramukaGreen font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">${item.category}</span>
                        </div>
                        <h3 class="font-bold font-heading text-gray-800 text-xl mb-3 group-hover:text-pramukaGreen transition-colors leading-snug">${item.title}</h3>
                        <p class="text-sm text-gray-500 leading-relaxed font-light mb-6">${item.desc}</p>
                    </div>
                    <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span class="text-xs font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"><i class="fa-solid fa-map-pin text-red-500 mr-1.5"></i> ${item.location}</span>
                        <button onclick="alert('Membuka detail lengkap kegiatan: ${item.title}')" class="w-8 h-8 rounded-full bg-pramukaGreen text-white flex items-center justify-center hover:bg-pramukaGold hover:text-pramukaGreenDark transition-colors shadow-md group-hover:animate-bounce"><i class="fa-solid fa-arrow-right text-xs"></i></button>
                    </div>
                </div>
            `}).join('');
        }
    }
};

// ==========================================
// 3. FUNGSI AKSI & CRUD
// ==========================================
window.saveNewKegiatan = function(e) {
    e.preventDefault();
    const newKegiatan = {
        id: Date.now(),
        title: document.getElementById('kegiatanTitle').value,
        date: document.getElementById('kegiatanDate').value,
        location: document.getElementById('kegiatanLocation').value,
        category: document.getElementById('kegiatanCategory').value,
        desc: document.getElementById('kegiatanDesc').value
    };
    kegiatanList.unshift(newKegiatan);
    window.renderAdminKegiatanList();
    e.target.reset();
    alert('Event / Kegiatan baru berhasil dipublikasikan ke portal!');
};

window.deleteKegiatan = function(id) {
    if (confirm('Hapus jadwal kegiatan ini?')) {
        kegiatanList = kegiatanList.filter(x => x.id !== id);
        window.renderAdminKegiatanList();
    }
};

window.switchAdminSubTab = function(type) {
    const btnShb = document.getElementById('tab-sub-shb');
    const btnShl = document.getElementById('tab-sub-shl');
    const contentShb = document.getElementById('sub-content-shb');
    const contentShl = document.getElementById('sub-content-shl');

    if (type === 'shb') {
        btnShb.className = "flex-1 px-4 py-3 text-sm font-bold rounded-lg bg-white shadow-sm text-pramukaGreen transition-all";
        btnShl.className = "flex-1 px-4 py-3 text-sm font-medium rounded-lg text-gray-500 hover:text-gray-700 hover:bg-white/50 transition-all";
        contentShb.classList.remove('hidden');
        contentShl.classList.add('hidden');
    } else {
        btnShl.className = "flex-1 px-4 py-3 text-sm font-bold rounded-lg bg-white shadow-sm text-pramukaGreen transition-all";
        btnShb.className = "flex-1 px-4 py-3 text-sm font-medium rounded-lg text-gray-500 hover:text-gray-700 hover:bg-white/50 transition-all";
        contentShl.classList.remove('hidden');
        contentShb.classList.add('hidden');
    }
};

window.saveCardTemplate = function(type) {
    alert(`Template Desain [${type.toUpperCase()}] berhasil diunggah dan disimpan ke server!`);
};

window.viewRegistrantDetail = function(type, id) {
    const list = type === 'shb' ? shbRegistrants : shlRegistrants;
    const item = list.find(x => x.id === id);
    if (item) alert(`[Detail Berkas ${type.toUpperCase()}]\n\nNama: ${item.name}\nNTA: ${item.nta}\nUnit/Ranting: ${item.pangkalan || item.ranting}\nSertifikasi: ${item.level}\nTanggal: ${item.date}\nStatus: Terverifikasi Lengkap`);
};

window.printRegistrantCard = function(type, id) {
    const list = type === 'shb' ? shbRegistrants : shlRegistrants;
    const item = list.find(x => x.id === id);
    if (item) alert(`Mencetak Kartu Anggota ${type.toUpperCase()} (Tampak Depan & Belakang) untuk: ${item.name}. Menyiapkan koneksi Printer...`);
};

window.deleteRegistrant = function(type, id) {
    if (confirm('Hapus data registrasi ini dari database Kwarcab?')) {
        if (type === 'shb') shbRegistrants = shbRegistrants.filter(x => x.id !== id);
        else shlRegistrants = shlRegistrants.filter(x => x.id !== id);
        window.renderRegistrantsTables();
    }
};

// ==========================================
// 4. FUNGSI NAVIGASI & ROUTING (SPA Logic)
// ==========================================
window.navigateTo = function(route) {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    // Update Desktop Nav UI Styles
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active-nav-item');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes('admin-dashboard')) {
            link.classList.add('text-red-500', 'bg-red-50/30');
            link.classList.remove('bg-red-100');
        }
        
        if(link.getAttribute('onclick') && link.getAttribute('onclick').includes(`'${route}'`)) {
            if (route === 'admin-dashboard') {
                link.classList.add('bg-red-100');
            } else {
                link.classList.add('active-nav-item');
            }
        }
    });

    // Update Mobile Nav UI Styles
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('bg-gray-50', 'border-pramukaGreen', 'text-pramukaGreen');
        link.classList.add('border-transparent');
        
        if(link.getAttribute('onclick') && link.getAttribute('onclick').includes(`'${route}'`) && route !== 'admin-dashboard') {
             link.classList.add('bg-gray-50', 'border-pramukaGreen', 'text-pramukaGreen');
        }
    });
    
    const template = document.getElementById('template-' + route);
    if (template) {
        contentArea.classList.remove('fade-in-up');
        contentArea.innerHTML = template.innerHTML;
        void contentArea.offsetWidth;
        contentArea.classList.add('fade-in-up');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (route === 'admin-dashboard') setTimeout(window.renderRegistrantsTables, 100);
        else if (route === 'kegiatan') setTimeout(window.renderPublicKegiatan, 100);
    } else if (route !== 'home') {
        window.navigateTo('home');
    }
};

window.handleAdminLogin = function(e) {
    e.preventDefault();
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;
    if (user === 'admin' && pass === 'pramuka2026') {
        document.getElementById('admin-auth-container').classList.add('hidden');
        document.getElementById('admin-panel-content').classList.remove('hidden');
        window.renderRegistrantsTables();
    } else {
        alert('Akses Ditolak. Gunakan username/password demo: admin / pramuka2026');
    }
};

window.handleAdminLogout = function() {
    document.getElementById('admin-panel-content').classList.add('hidden');
    document.getElementById('admin-auth-container').classList.remove('hidden');
    document.getElementById('adminUser').value = '';
    document.getElementById('adminPass').value = '';
};

window.toggleMobileMenu = function() {
    const sidebar = document.getElementById('mobileSidebar');
    const content = document.getElementById('mobileSidebarContent');
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        setTimeout(() => {
            sidebar.classList.remove('opacity-0');
            content.classList.remove('-translate-x-full');
        }, 10);
    } else {
        sidebar.classList.add('opacity-0');
        content.classList.add('-translate-x-full');
        setTimeout(() => {
            sidebar.classList.add('hidden');
        }, 300);
    }
};

// ==========================================
// 5. INISIALISASI APLIKASI
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    window.navigateTo('home');

    const mobileBtn = document.getElementById('mobileMenuBtn');
    const closeBtn = document.getElementById('closeMobileMenuBtn');
    const sidebar = document.getElementById('mobileSidebar');

    if (mobileBtn) mobileBtn.addEventListener('click', window.toggleMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', window.toggleMobileMenu);
    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            if (e.target === sidebar) window.toggleMobileMenu();
        });
    }

    document.querySelectorAll('.mobile-accordion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sub = btn.nextElementSibling;
            const icon = btn.querySelector('.fa-chevron-down');
            sub.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });
});
