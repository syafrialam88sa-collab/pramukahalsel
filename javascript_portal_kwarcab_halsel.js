/**
 * SISTEM INFORMASI & PORTAL LAYANAN TERPADU
 * Kwartir Cabang Gerakan Pramuka Halmahera Selatan
 * File: function.js
 */

// Global State Variables
window.CURRENT_PAGE = 'home';
window.CURRENT_ADMIN_TAB = 'gudep';
window.SKU_SESSION_GOLONGAN = '';
window.SKU_CURRENT_QUESTION = '';
window.SLIDESHOW_INTERVAL_ID = null;
window.SLIDESHOW_ACTIVE_INDEX = 0;

// Daftar Resmi 30 Kwartir Ranting / Kecamatan Kabupaten Halmahera Selatan
window.KECAMATAN_HALSEL = [
    "Bacan", "Bacan Selatan", "Bacan Barat", "Bacan Barat Utara", "Bacan Timur",
    "Bacan Timur Tengah", "Bacan Timur Selatan", "Kayoa", "Kayoa Barat", "Kayoa Selatan",
    "Kayoa Utara", "Makian", "Makian Barat", "Pulau Makian", "Gane Barat",
    "Gane Barat Utara", "Gane Barat Selatan", "Gane Timur", "Gane Timur Tengah",
    "Gane Timur Selatan", "Obi", "Obi Barat", "Obi Timur", "Obi Selatan",
    "Obi Utara", "Mandioli Selatan", "Mandioli Utara", "Kasiruta Barat",
    "Kasiruta Timur", "Kepulauan Botang Lomang"
];

/**
 * Utility Function: Membaca berkas sebagai Base64 / Data URL untuk ketahanan penyimpanan lokal
 */
window.readFileAsDataURL = function(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
};

/**
 * Inisialisasi Data Default (Seeding LocalStorage) jika belum pernah diisi
 */
(function seedLocalStorageDefaults() {
    if (!localStorage.getItem('scout_sejarah')) {
        localStorage.setItem('scout_sejarah', "Gerakan Pramuka Kwartir Cabang Halmahera Selatan dibentuk resmi sejalan dengan pemekaran wilayah Kabupaten Halmahera Selatan pada tahun 2003. Berpusat di Labuha, Kwarcab ini mengoordinasikan pembinaan kepanduan di 30 Kwartir Ranting (Kecamatan) guna membentuk karakter generasi muda yang berjiwa tangguh, mandiri, patriotik, berlandaskan Dasa Darma demi kemajuan pembangunan Bumi Saruma.");
    }
    if (!localStorage.getItem('scout_visimisi')) {
        localStorage.setItem('scout_visimisi', "VISI:\n\"Terwujudnya Pramuka Halmahera Selatan yang Berkarakter, Unggul, Mandiri, dan Berjiwa Pengabdian Nyata bagi Masyarakat Bumi Saruma.\"\n\nMISI:\n1. Memperkokoh kualitas pembinaan kepanduan pada Gugus Depan.\n2. Melatih ketangkasan, kreativitas, dan kepemimpinan berwibawa.\n3. Menggalakkan aksi bakti sosial peduli kemasyarakatan.");
    }
    if (!localStorage.getItem('scout_chiefs')) {
        localStorage.setItem('scout_chiefs', JSON.stringify([
            { id: "1", nama: "Kak H. Hasan Ali Bassam Kasuba", periode: "2024 - 2029", url: "https://placehold.co/150x200/7b1113/ffffff?text=Ketua+Kwarcab" }
        ]));
    }
    if (!localStorage.getItem('scout_pengurus')) {
        localStorage.setItem('scout_pengurus', JSON.stringify([
            { id: "1", nama: "Kak H. Hasan Ali Bassam Kasuba", jabatan: "Ketua Kwarcab", tipe: "Ketua", url: "https://placehold.co/150x200/7b1113/ffffff?text=Ketua" },
            { id: "2", nama: "Kak Drs. Safiun Radjilan", jabatan: "Wakil Ketua Binawasa", tipe: "Wakil", url: "https://placehold.co/120x150/f1b434/333333?text=Waka+Binawasa" },
            { id: "3", nama: "Kak Rais, S.Pd.", jabatan: "Sekretaris Cabang", tipe: "Sekretaris", url: "https://placehold.co/120x150/f1b434/333333?text=Sekretaris" },
            { id: "4", nama: "Kak Rahmawati, S.E.", jabatan: "Bendahara Cabang", tipe: "Bendahara", url: "https://placehold.co/120x150/f1b434/333333?text=Bendahara" },
            { id: "5", nama: "Kak Muhammad, S.H.", jabatan: "Andalan Cabang Humas", tipe: "Andalan", url: "https://placehold.co/120x150/333333/ffffff?text=Andalan+1" }
        ]));
    }
    if (!localStorage.getItem('scout_memoriam')) {
        localStorage.setItem('scout_memoriam', JSON.stringify([
            { 
                id: "1",
                nama: "Kak H. Ahmad Yusuf", 
                ttl: "Labuha, 10 Mei 1952", 
                alamat: "Bacan, Halsel", 
                jabatan_terakhir: "Andalan Bidang Binawasa", 
                riwayat_pengabdian: "Mengabdi selama 30 tahun melatih pembina muda di Bumi Saruma, dianugerahi Lencana Melati.", 
                waktu_kematian: "RSUD Labuha, 14 Februari 2023",
                url: "https://placehold.co/150x200/333333/ffffff?text=Alm.+Kak+Ahmad"
            }
        ]));
    }
    if (!localStorage.getItem('scout_buku')) {
        localStorage.setItem('scout_buku', JSON.stringify([
            { nama: "Buku Panduan SKU Siaga", url: "https://placehold.co/150x200/7b1113/ffffff?text=Panduan+Siaga" },
            { nama: "Buku Boyman Pramuka Jilid I", url: "https://placehold.co/150x200/7b1113/ffffff?text=Boyman+I" }
        ]));
    }
    if (!localStorage.getItem('scout_kelengkapan')) {
        localStorage.setItem('scout_kelengkapan', JSON.stringify([
            { nama: "Formulir Pendaftaran Gugus Depan", url: "https://placehold.co/150x200/f1b434/333333?text=Formulir+Gudep" }
        ]));
    }
    if (!localStorage.getItem('scout_putusan')) {
        localStorage.setItem('scout_putusan', JSON.stringify([
            { nama: "Surat Keputusan Pelaksana Kemah Saruma 2026", url: "https://placehold.co/150x200/1e1b18/ffffff?text=SK+Kemah+2026" }
        ]));
    }
    if (!localStorage.getItem('scout_slideshow')) {
        localStorage.setItem('scout_slideshow', JSON.stringify([
            { id: "1", title: "Latihan Gabungan Tingkat Cabang", url: "https://placehold.co/1200x500/7b1113/ffffff?text=Latihan+Gabungan" },
            { id: "2", title: "Aksi Bakti Lingkungan Saruma", url: "https://placehold.co/1200x500/1e1b18/ffffff?text=Bakti+Sosial" }
        ]));
    }
    if (!localStorage.getItem('scout_kegiatan')) {
        localStorage.setItem('scout_kegiatan', JSON.stringify([
            { id: "1", title: "Perkemahan Bakti Saruma 2026", date: "25 - 28 Mei 2026", desc: "Perkemahan pengabdian masyarakat bertempat di bumi perkemahan Labuha.", link: "#" },
            { id: "2", title: "Workshop Pembina KMD Gelombang II", date: "05 Juni 2026", desc: "Pelatihan KMD khusus pembina pangkalan SD/SMP se-Kwarcab Halsel.", link: "#" }
        ]));
    }
    if (!localStorage.getItem('scout_awards_proposals')) localStorage.setItem('scout_awards_proposals', JSON.stringify([]));
    if (!localStorage.getItem('scout_database')) localStorage.setItem('scout_database', JSON.stringify([]));
    if (!localStorage.getItem('scout_gudep')) localStorage.setItem('scout_gudep', JSON.stringify([]));
    if (!localStorage.getItem('scout_saka')) localStorage.setItem('scout_saka', JSON.stringify([]));
    if (!localStorage.getItem('scout_sertifikasi')) localStorage.setItem('scout_sertifikasi', JSON.stringify([]));
    if (!localStorage.getItem('scout_laporan_data')) localStorage.setItem('scout_laporan_data', JSON.stringify([]));
})();

/**
 * Mengisi Dropdown Kecamatan / Kwartir Ranting
 */
window.populateKecamatanDropdown = function(elementId) {
    const select = document.getElementById(elementId);
    if (!select) return;
    let options = '<option value="" disabled selected>-- Pilih Kwartir Ranting --</option>';
    window.KECAMATAN_HALSEL.forEach(kec => {
        options += `<option value="${kec}">${kec}</option>`;
    });
    select.innerHTML = options;
};

/**
 * Mengisi Dropdown Angka (0 - 100/500)
 */
window.populate0100Dropdowns = function() {
    window.populateKecamatanDropdown('gudep_ranting');
    const numSelects = ['gudep_putera', 'gudep_puteri', 'gudep_pembina_kmd', 'gudep_pembina_kml', 'gudep_pembina_belum'];
    numSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            let html = '';
            const max = (id.includes('putera') || id.includes('puteri')) ? 500 : 100;
            for (let i = 0; i <= max; i++) {
                html += `<option value="${i}">${i}</option>`;
            }
            select.innerHTML = html;
        }
    });
};

/**
 * Mengisi Dropdown Angka Form Saka
 */
window.populateSakaDropdowns = function() {
    const numSelects = ['saka_didik_putera', 'saka_didik_puteri', 'saka_instruktur_putera', 'saka_instruktur_puteri', 'saka_pamong_putera', 'saka_pamong_puteri'];
    numSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            let html = '';
            const max = (id.includes('didik')) ? 200 : 100;
            for (let i = 0; i <= max; i++) {
                html += `<option value="${i}">${i}</option>`;
            }
            select.innerHTML = html;
        }
    });
};

/**
 * Meng-update Opsi Dropdown Tingkat berdasarkan Kategori Kepramukaan
 */
window.updateTingkatDropdown = function(kategoriId, tingkatId) {
    const katSelect = document.getElementById(kategoriId);
    const tingSelect = document.getElementById(tingkatId);
    if (!katSelect || !tingSelect) return;
    const val = katSelect.value;
    let options = [];
    if (val === 'Siaga') options = ['Mula', 'Bantu', 'Tata', 'Garuda'];
    else if (val === 'Penggalang') options = ['Ramu', 'Rakit', 'Terap', 'Garuda'];
    else if (val === 'Penegak') options = ['Bantara', 'Laksana', 'Garuda'];
    else if (val === 'Pandega') options = ['Pandega', 'Garuda'];
    else if (val === 'Pembina') options = ['KMD', 'KML', 'Pelatih KPD', 'Pelatih KPL'];
    
    tingSelect.innerHTML = options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
};

/**
 * Router Navigasi Utama
 */
window.navigateTo = function(pageId) {
    if (pageId === 'admin-dashboard') {
        if (localStorage.getItem('admin_logged_in') !== 'true') {
            pageId = 'admin-login';
        }
    }

    const contentArea = document.getElementById('content-area');
    const targetTemplate = document.getElementById('template-' + pageId);

    if (targetTemplate && contentArea) {
        window.location.hash = pageId;
        contentArea.innerHTML = targetTemplate.innerHTML;
        window.updateActiveNav(pageId);

        // Eksekusi pemanggil khusus per halaman
        if (pageId === 'home') {
            window.renderSlideshowCarousel();
            window.renderHomeKegiatan();
            window.updateHomepageStats();
        } else if (pageId === 'usul-gudep') {
            window.populate0100Dropdowns();
        } else if (pageId === 'usul-saka') {
            window.populateSakaDropdowns();
        } else if (pageId === 'usul-awards') {
            window.populateKecamatanDropdown('award_pengusul');
        } else if (pageId === 'cek-status') {
            const resultArea = document.getElementById('status_result_area');
            if (resultArea) resultArea.innerHTML = '<div class="text-center py-8 text-gray-400 text-xs">Silakan masukkan kata kunci pencarian di atas untuk melacak status usulan.</div>';
        } else if (pageId === 'database') {
            window.renderDatabaseTable();
        } else if (pageId === 'database-ranting') {
            window.renderDatabaseRantingTable();
        } else if (pageId === 'admin-dashboard') {
            window.renderAdminTab(window.CURRENT_ADMIN_TAB);
        } else if (pageId === 'reg-anggota') {
            window.updateTingkatDropdown('reg_kategori', 'reg_tingkat_jenjang');
            window.populateKecamatanDropdown('reg_alamat_kec');
            window.populateKecamatanDropdown('reg_ranting');
        } else if (pageId === 'hak-bina') {
            window.populateKecamatanDropdown('shb_alamat_kec');
        } else if (pageId === 'hak-latih') {
            window.populateKecamatanDropdown('shl_alamat_kec');
        } else if (pageId === 'laporan-berkala') {
            window.populateKecamatanDropdown('lap_ranting');
        } else if (pageId === 'sejarah') {
            const container = document.getElementById('pub-sejarah-container');
            if (container) container.innerText = localStorage.getItem('scout_sejarah');
        } else if (pageId === 'visi-misi') {
            const container = document.getElementById('pub-visimisi-container');
            if (container) container.innerText = localStorage.getItem('scout_visimisi');
        } else if (pageId === 'chief') {
            window.renderPublicChiefs();
        } else if (pageId === 'pengurus') {
            window.renderPublicPengurus();
        } else if (pageId === 'in-memoriam') {
            window.renderPublicMemoriam();
        } else if (pageId === 'unduh-buku') {
            window.renderPublicBuku();
        } else if (pageId === 'unduh-kelengkapan') {
            window.renderPublicKelengkapan();
        } else if (pageId === 'unduh-putusan') {
            window.renderPublicPutusan();
        }
    }
};

/**
 * Memperbarui Indikator Navigasi Aktif
 */
window.updateActiveNav = function(pageId) {
    document.querySelectorAll('nav ul li a').forEach(function(link) {
        link.classList.remove('active-nav-item');
        const onClickAttr = link.getAttribute('onclick');
        if (onClickAttr && onClickAttr.indexOf(pageId) !== -1) {
            link.classList.add('active-nav-item');
        }
    });
};

/**
 * Update Angka Statistik SIK di Halaman Utama
 */
window.updateHomepageStats = function() {
    const list = JSON.parse(localStorage.getItem('scout_database')) || [];
    const el = document.getElementById('stats-total-anggota');
    if (el) {
        el.innerText = list.length + " Anggota";
    }
};

/**
 * Render Slideshow Gambar Beranda
 */
window.renderSlideshowCarousel = function() {
    const container = document.getElementById('slideshow-container');
    const indicatorWrap = document.getElementById('slideshow-indicators');
    if (!container || !indicatorWrap) return;

    const slides = JSON.parse(localStorage.getItem('scout_slideshow')) || [];
    if (slides.length === 0) {
        container.innerHTML = `<div class="absolute inset-0 flex items-center justify-center text-white/50 text-xs italic">Slideshow kosong. Tambahkan gambar melalui Dapur Admin.</div>`;
        indicatorWrap.innerHTML = '';
        return;
    }

    let slidesHtml = '';
    let indicatorsHtml = '';
    slides.forEach((slide, idx) => {
        slidesHtml += `
            <div class="slideshow-item absolute inset-0 transition-opacity duration-1000 ${idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}">
                <img src="${slide.url}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/1200x500/7b1113/ffffff?text=Error+Loading+Image'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10"></div>
                <div class="absolute bottom-6 left-6 right-6 z-20 text-left text-white max-w-2xl">
                    <span class="bg-pramukaGold text-scoutDark font-extrabold text-[9px] px-2.5 py-0.5 rounded uppercase tracking-wider mb-2 inline-block shadow">Pramuka Saruma</span>
                    <h3 class="text-xl sm:text-2xl font-bold font-poppins text-white leading-tight drop-shadow">${slide.title}</h3>
                </div>
            </div>
        `;
        indicatorsHtml += `
            <button onclick="window.setSlideshowIndex(${idx})" class="slideshow-indicator-dot w-2 h-2 rounded-full bg-white/40 transition-all ${idx === 0 ? 'bg-pramukaGold w-5' : ''}"></button>
        `;
    });

    container.innerHTML = slidesHtml;
    indicatorWrap.innerHTML = indicatorsHtml;
    window.SLIDESHOW_ACTIVE_INDEX = 0;

    if (window.SLIDESHOW_INTERVAL_ID) clearInterval(window.SLIDESHOW_INTERVAL_ID);
    window.SLIDESHOW_INTERVAL_ID = setInterval(() => {
        let nextIdx = window.SLIDESHOW_ACTIVE_INDEX + 1;
        if (nextIdx >= slides.length) nextIdx = 0;
        window.setSlideshowIndex(nextIdx);
    }, 5000);
};

/**
 * Menyetel Indeks Slide Aktif
 */
window.setSlideshowIndex = function(targetIdx) {
    const items = document.querySelectorAll('.slideshow-item');
    const dots = document.querySelectorAll('.slideshow-indicator-dot');
    if (items.length === 0) return;

    window.SLIDESHOW_ACTIVE_INDEX = targetIdx;
    items.forEach((item, idx) => {
        if (idx === targetIdx) {
            item.classList.replace('opacity-0', 'opacity-100');
            item.classList.replace('z-0', 'z-10');
        } else {
            item.classList.replace('opacity-100', 'opacity-0');
            item.classList.replace('z-10', 'z-0');
        }
    });

    dots.forEach((dot, idx) => {
        if (idx === targetIdx) {
            dot.className = 'slideshow-indicator-dot w-2 h-2 rounded-full bg-pramukaGold w-5 transition-all';
        } else {
            dot.className = 'slideshow-indicator-dot w-2 h-2 rounded-full bg-white/40 transition-all';
        }
    });
};

/**
 * Render Kartu Info Kegiatan Terkini di Beranda
 */
window.renderHomeKegiatan = function() {
    const container = document.getElementById('home-kegiatan-container');
    if (!container) return;
    const items = JSON.parse(localStorage.getItem('scout_kegiatan')) || [];
    if (items.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-6 text-gray-500 text-xs italic">Belum ada agenda kegiatan kepramukaan saat ini.</div>`;
        return;
    }

    container.innerHTML = items.map(act => `
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition flex flex-col justify-between">
            <div>
                <div class="text-[10px] text-pramukaMaroon font-bold mb-2 uppercase tracking-wider"><i class="fa-regular fa-clock mr-1"></i>${act.date}</div>
                <h4 class="font-bold text-gray-800 text-xs mb-2 uppercase">${act.title}</h4>
                <p class="text-[11px] text-gray-500 leading-relaxed mb-4">${act.desc}</p>
            </div>
            <a href="${act.link || '#'}" class="text-[10px] font-bold text-pramukaMaroon hover:text-pramukaGold transition self-start underline uppercase">Detail Agenda →</a>
        </div>
    `).join('');
};

/**
 * Render Chief / Ketua dari Masa ke Masa
 */
window.renderPublicChiefs = function() {
    const container = document.getElementById('pub-chief-container');
    if (!container) return;
    const items = JSON.parse(localStorage.getItem('scout_chiefs')) || [];
    container.innerHTML = items.map(c => `
        <div class="bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition text-center p-4">
            <img src="${c.url}" class="w-24 h-32 object-cover rounded-lg mx-auto mb-3 shadow" onerror="this.src='https://placehold.co/150x200/7b1113/ffffff?text=Chief'">
            <h4 class="font-bold text-xs text-gray-800 line-clamp-2">${c.nama}</h4>
            <span class="text-[9px] text-gray-400 font-bold block mt-1 uppercase font-mono">${c.periode}</span>
        </div>
    `).join('');
};

/**
 * Render Bagan Pengurus Cabang Publik
 */
window.renderPublicPengurus = function() {
    const rowKetua = document.getElementById('pub-pengurus-ketua');
    const rowInti = document.getElementById('pub-pengurus-inti');
    const rowAndalan = document.getElementById('pub-pengurus-andalan');

    if (!rowKetua || !rowInti || !rowAndalan) return;

    const items = JSON.parse(localStorage.getItem('scout_pengurus')) || [];

    const ketua = items.filter(x => x.tipe === 'Ketua');
    const pimpinan_harian = items.filter(x => ['Wakil', 'Sekretaris', 'Bendahara'].includes(x.tipe));
    const andalan = items.filter(x => x.tipe === 'Andalan');

    const cardHtml = (item, isLarge = false) => `
        <div class="bg-white rounded-xl overflow-hidden border shadow-sm p-4 text-center flex flex-col items-center justify-between">
            <img src="${item.url}" class="${isLarge ? 'w-28 h-36' : 'w-20 h-24'} object-cover rounded-lg mb-2 shadow" onerror="this.src='https://placehold.co/120x150/f1b434/333333?text=Pengurus'">
            <h4 class="font-bold text-[11px] text-gray-800 line-clamp-1 leading-none">${item.nama}</h4>
            <span class="text-[9px] text-gray-400 block mt-1 uppercase tracking-wider">${item.jabatan}</span>
        </div>
    `;

    rowKetua.innerHTML = ketua.map(x => cardHtml(x, true)).join('');
    rowInti.innerHTML = pimpinan_harian.map(x => cardHtml(x, false)).join('');
    rowAndalan.innerHTML = andalan.map(x => cardHtml(x, false)).join('');
};

/**
 * Render In Memoriam Tokoh Pramuka
 */
window.renderPublicMemoriam = function() {
    const container = document.getElementById('pub-memoriam-container');
    if (!container) return;
    const items = JSON.parse(localStorage.getItem('scout_memoriam')) || [];
    container.innerHTML = items.map(m => `
        <div class="bg-white rounded-xl border p-4 shadow-sm flex gap-4 hover:shadow-md transition">
            <img src="${m.url}" class="w-20 h-28 object-cover rounded shadow shrink-0" onerror="this.src='https://placehold.co/120x150/333333/ffffff?text=Almarhum'">
            <div class="text-xs">
                <h4 class="font-bold text-gray-900 mb-1">${m.nama}</h4>
                <p class="text-[9px] text-gray-400 mb-2 font-semibold uppercase"><i class="fa-solid fa-ribbon mr-1 text-red-700"></i>${m.ttl} - Wafat: ${m.waktu_kematian}</p>
                <p class="text-gray-600 line-clamp-3 leading-relaxed mb-2">${m.riwayat_pengabdian}</p>
                <span class="text-[9px] font-bold text-pramukaMaroon block uppercase bg-red-50 py-0.5 px-2 rounded inline-block">Jabatan Terakhir: ${m.jabatan_terakhir}</span>
            </div>
        </div>
    `).join('');
};

window.renderPublicBuku = function() {
    const container = document.getElementById('unduh-buku-container');
    if (!container) return;
    const items = JSON.parse(localStorage.getItem('scout_buku')) || [];
    container.innerHTML = items.map(b => `
        <div class="border rounded-xl p-3 bg-gray-50 flex items-center justify-between text-xs shadow-inner">
            <span class="font-bold text-gray-700 uppercase leading-none truncate"><i class="fa-regular fa-file-pdf text-red-600 mr-2 text-sm"></i>${b.nama}</span>
            <a href="${b.url}" class="bg-pramukaMaroon hover:bg-pramukaMaroonHover text-white text-[10px] font-bold px-3 py-1 rounded transition uppercase">Unduh</a>
        </div>
    `).join('');
};

window.renderPublicKelengkapan = function() {
    const container = document.getElementById('unduh-kelengkapan-container');
    if (!container) return;
    const items = JSON.parse(localStorage.getItem('scout_kelengkapan')) || [];
    container.innerHTML = items.map(k => `
        <div class="border rounded-xl p-3 bg-gray-50 flex items-center justify-between text-xs shadow-inner">
            <span class="font-bold text-gray-700 uppercase leading-none truncate"><i class="fa-regular fa-file-lines text-blue-600 mr-2 text-sm"></i>${k.nama}</span>
            <a href="${k.url}" class="bg-pramukaMaroon hover:bg-pramukaMaroonHover text-white text-[10px] font-bold px-3 py-1 rounded transition uppercase">Unduh</a>
        </div>
    `).join('');
};

window.renderPublicPutusan = function() {
    const container = document.getElementById('unduh-putusan-container');
    if (!container) return;
    const items = JSON.parse(localStorage.getItem('scout_putusan')) || [];
    container.innerHTML = items.map(p => `
        <div class="border rounded-xl p-3 bg-gray-50 flex items-center justify-between text-xs shadow-inner">
            <span class="font-bold text-gray-700 uppercase leading-none truncate"><i class="fa-solid fa-scroll text-amber-600 mr-2 text-sm"></i>${p.nama}</span>
            <a href="${p.url}" class="bg-pramukaMaroon hover:bg-pramukaMaroonHover text-white text-[10px] font-bold px-3 py-1 rounded transition uppercase">Unduh</a>
        </div>
    `).join('');
};

window.updateGudepPdfLabel = function(input, labelId) {
    const label = document.getElementById(labelId);
    if (label && input.files[0]) {
        label.innerText = input.files[0].name;
        label.className = "block text-[11px] text-green-600 font-bold break-all";
    }
};

window.addAwardKursusRow = function() {
    const container = document.getElementById('award-kursus-container');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'grid grid-cols-1 sm:grid-cols-2 gap-2 award-kursus-row mt-2';
    div.innerHTML = `
        <input type="text" class="border p-1.5 text-xs rounded focus:outline-none kursus-nama" placeholder="Nama Kursus Kepramukaan">
        <input type="number" class="border p-1.5 text-xs rounded focus:outline-none kursus-tahun" placeholder="Tahun Kelulusan">
    `;
    container.appendChild(div);
};

window.addAwardJabatanRow = function() {
    const container = document.getElementById('award-jabatan-container');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'grid grid-cols-1 sm:grid-cols-2 gap-2 award-jabatan-row mt-2';
    div.innerHTML = `
        <input type="text" class="border p-1.5 text-xs rounded focus:outline-none jabatan-nama" placeholder="Jabatan">
        <input type="text" class="border p-1.5 text-xs rounded focus:outline-none jabatan-periode" placeholder="Tahun Periode">
    `;
    container.appendChild(div);
};

/**
 * Submit Form Usulan Penghargaan (Awards)
 */
window.handleAwardSubmit = function(event) {
    if (event && event.preventDefault) event.preventDefault();

    const pengusul = document.getElementById('award_pengusul').value;
    const jenis = document.getElementById('award_jenis').value;
    const gudep_nama = document.getElementById('award_gudep_nama').value.trim();
    const gudep_nomor = document.getElementById('award_gudep_nomor').value.trim();
    const penghargaan = document.getElementById('award_penghargaan').value;
    const nama = document.getElementById('award_nama').value.trim();
    const panggilan = document.getElementById('award_panggilan').value.trim();
    const tempat_lahir = document.getElementById('award_tempat_lahir').value.trim();
    const tanggal_lahir = document.getElementById('award_tanggal_lahir').value;
    const goldar = document.getElementById('award_goldar').value;
    const agama = document.getElementById('award_agama').value;

    const sd_nama = document.getElementById('award_sd_nama').value.trim();
    const sd_tahun = document.getElementById('award_sd_tahun').value.trim();
    const smp_nama = document.getElementById('award_smp_nama').value.trim();
    const smp_tahun = document.getElementById('award_smp_tahun').value.trim();
    const sma_nama = document.getElementById('award_sma_nama').value.trim();
    const sma_tahun = document.getElementById('award_sma_tahun').value.trim();
    const s1_nama = document.getElementById('award_s1_nama').value.trim();
    const s1_tahun = document.getElementById('award_s1_tahun').value.trim();

    const kursus_rows = document.querySelectorAll('.award-kursus-row');
    const list_kursus = [];
    kursus_rows.forEach(row => {
        const knama = row.querySelector('.kursus-nama').value.trim();
        const ktahun = row.querySelector('.kursus-tahun').value.trim();
        if (knama || ktahun) {
            list_kursus.push({ nama: knama, tahun: ktahun });
        }
    });

    const syarat = document.getElementById('award_syarat_terpenuhi').value.trim();

    const jabatan_rows = document.querySelectorAll('.award-jabatan-row');
    const list_jabatan = [];
    jabatan_rows.forEach(row => {
        const jnama = row.querySelector('.jabatan-nama').value.trim();
        const jperiode = row.querySelector('.jabatan-periode').value.trim();
        if (jnama || jperiode) {
            list_jabatan.push({ jabatan: jnama, periode: jperiode });
        }
    });

    const f_foto = document.getElementById('award_file_foto').files[0];
    const f_tpod = document.getElementById('award_file_tpod').files[0];
    const f_sk = document.getElementById('award_file_sk').files[0];
    const f_penghargaan = document.getElementById('award_file_penghargaan').files[0];

    const b1 = document.getElementById('award_bukti_1').files[0];
    const b2 = document.getElementById('award_bukti_2').files[0];
    const b3 = document.getElementById('award_bukti_3').files[0];
    const b4 = document.getElementById('award_bukti_4').files[0];
    const b5 = document.getElementById('award_bukti_5').files[0];

    const proposal = {
        id: 'AWD-' + Date.now(),
        pengusul,
        jenis,
        gudep_nama,
        gudep_nomor,
        penghargaan,
        nama,
        panggilan,
        tempat_lahir,
        tanggal_lahir,
        goldar,
        agama,
        pendidikan: {
            sd: { nama: sd_nama, text: sd_tahun },
            smp: { nama: smp_nama, text: smp_tahun },
            sma: { nama: sma_nama, text: sma_tahun },
            s1: { nama: s1_nama, text: s1_tahun }
        },
        kursus: list_kursus,
        syarat,
        jabatan: list_jabatan,
        files: {
            foto: f_foto ? f_foto.name : "pasfoto.png",
            tpod: f_tpod ? f_tpod.name : "tpod.pdf",
            sk: f_sk ? f_sk.name : "sk.pdf",
            prev: f_penghargaan ? f_penghargaan.name : "penghargaan_lama.pdf",
            bukti: [
                b1 ? b1.name : "bukti1.pdf",
                b2 ? b2.name : "bukti2.pdf",
                b3 ? b3.name : "bukti3.pdf",
                b4 ? b4.name : "bukti4.pdf",
                b5 ? b5.name : "bukti5.pdf"
            ]
        },
        status: "Diproses",
        tanggal_usul: new Date().toLocaleDateString('id-ID')
    };

    const awards = JSON.parse(localStorage.getItem('scout_awards_proposals')) || [];
    awards.unshift(proposal);
    localStorage.setItem('scout_awards_proposals', JSON.stringify(awards));

    window.showNotification("Usulan Terkirim", `Permohonan tanda penghargaan ${penghargaan} untuk Kak ${nama} berhasil didaftarkan ke SIK.`, true);
    window.navigateTo('cek-status');
    setTimeout(() => {
        const searchInput = document.getElementById('status_search_input');
        if (searchInput) {
            searchInput.value = nama;
            window.searchProposalStatus();
        }
    }, 100);
};

/**
 * Submit Registrasi Anggota Terpadu SIK
 */
window.handleUnifiedRegistration = function(event) {
    if (event && event.preventDefault) event.preventDefault();

    const nama = document.getElementById('reg_nama').value.trim();
    const nama_kecil = document.getElementById('reg_nama_kecil').value.trim();
    const tempat_lahir = document.getElementById('reg_tempat_lahir').value.trim();
    const tanggal_lahir = document.getElementById('reg_tanggal_lahir').value;
    const pangkalan = document.getElementById('reg_pangkalan').value.trim();
    const gudep = document.getElementById('reg_gudep').value.trim();
    const ranting = document.getElementById('reg_ranting').value;
    const kategori = document.getElementById('reg_kategori').value;
    const tingkat_jenjang = document.getElementById('reg_tingkat_jenjang').value;
    const tgl_dikukuhkan = document.getElementById('reg_tgl_dikukuhkan').value;
    const nama_ayah = document.getElementById('reg_nama_ayah').value.trim();
    const nama_ibu = document.getElementById('reg_nama_ibu').value.trim();
    const telp = document.getElementById('reg_telp').value.trim();
    const email = document.getElementById('reg_email').value.trim();
    const alamat_kec = document.getElementById('reg_alamat_kec').value;
    const alamat_desa = document.getElementById('reg_alamat_desa').value.trim();
    const alamat_rtrw = document.getElementById('reg_alamat_rtrw').value.trim();

    const fotoFile = document.getElementById('reg_pdf_foto').files[0];
    const fotoName = fotoFile ? fotoFile.name : "pasfoto.png";

    const list = JSON.parse(localStorage.getItem('scout_database')) || [];
    
    const serialNum = (list.length + 1).toString().padStart(4, '0');
    const cleanDob = tanggal_lahir.replace(/-/g, '').slice(2);
    const nta = `27.04-${cleanDob}-${serialNum}`;

    const newMember = {
        id: 'REG-' + Date.now(),
        nta,
        nama,
        nama_kecil,
        tempat_lahir,
        tanggal_lahir,
        pangkalan,
        gudep,
        ranting,
        kategori,
        tingkat_jenjang,
        tgl_dikukuhkan,
        nama_ayah,
        nama_ibu,
        telp,
        email,
        alamat_kec,
        alamat_desa,
        alamat_rtrw,
        fotoName,
        status: "Dalam proses",
        status_sik: "Pending"
    };

    list.unshift(newMember);
    localStorage.setItem('scout_database', JSON.stringify(list));

    window.showNotification("Registrasi Terkirim", `Registrasi Anggota SIK atas nama ${nama} berhasil dikirim ke database Kwarcab.`, true);
    window.navigateTo('cek-status');
    setTimeout(() => {
        const searchInput = document.getElementById('status_search_input');
        if (searchInput) {
            searchInput.value = nama;
            window.searchProposalStatus();
        }
    }, 100);
};

window.handleShbSubmit = function(event) {
    if (event && event.preventDefault) event.preventDefault();

    const nama = document.getElementById('shb_nama').value.trim();
    const pangkalan = document.getElementById('shb_pangkalan').value.trim();
    const kursus = document.getElementById('shb_kursus').value;
    const golongan = document.getElementById('shb_golongan').value;
    const tgl_pengukuhan = document.getElementById('shb_tgl_pengukuhan').value;

    const list = JSON.parse(localStorage.getItem('scout_sertifikasi')) || [];
    const newCert = {
        id: 'CERT-SHB-' + Date.now(),
        tipe: "SHB",
        nama,
        pangkalan,
        kursus,
        golongan,
        tgl_pengukuhan,
        status: "Sedang diproses"
    };

    list.unshift(newCert);
    localStorage.setItem('scout_sertifikasi', JSON.stringify(list));

    window.showNotification("Pengajuan SHB Terkirim", `Permohonan Surat Hak Bina untuk Kak ${nama} berhasil dikirim ke SIK.`, true);
    window.navigateTo('cek-status');
};

window.handleShlSubmit = function(event) {
    if (event && event.preventDefault) event.preventDefault();

    const nama = document.getElementById('shl_nama').value.trim();
    const pangkalan = document.getElementById('shl_pangkalan').value.trim();
    const kursus = document.getElementById('shl_kursus').value;
    const golongan = document.getElementById('shl_golongan').value;
    const tgl_pengukuhan = document.getElementById('shl_tgl_pengukuhan').value;

    const list = JSON.parse(localStorage.getItem('scout_sertifikasi')) || [];
    const newCert = {
        id: 'CERT-SHL-' + Date.now(),
        tipe: "SHL",
        nama,
        pangkalan,
        kursus,
        golongan,
        tgl_pengukuhan,
        status: "Sedang diproses"
    };

    list.unshift(newCert);
    localStorage.setItem('scout_sertifikasi', JSON.stringify(list));

    window.showNotification("Pengajuan SHL Terkirim", `Permohonan Surat Hak Latih untuk Kak ${nama} berhasil dikirim ke SIK.`, true);
    window.navigateTo('cek-status');
};

window.handleGudepSubmit = function(event) {
    if (event && event.preventDefault) event.preventDefault();

    const sekolah = document.getElementById('gudep_pangkalan').value.trim();
    const ranting = document.getElementById('gudep_ranting').value;
    const mabigus = document.getElementById('gudep_putera').value + ' Pa / ' + document.getElementById('gudep_puteri').value + ' Pi';
    const telp = document.getElementById('gudep_telp').value.trim();

    const list = JSON.parse(localStorage.getItem('scout_gudep')) || [];
    list.unshift({ sekolah, ranting, mabigus, telp_pic: telp, status: "Sedang diproses" });
    localStorage.setItem('scout_gudep', JSON.stringify(list));

    window.showNotification("Permohonan Terkirim", `Usulan pembentukan Gudep baru di pangkalan ${sekolah} telah dikirim.`, true);
    window.navigateTo('cek-status');
};

window.handleSakaSubmit = function(event) {
    if (event && event.preventDefault) event.preventDefault();

    const pangkalan = document.getElementById('saka_pangkalan').value.trim();
    const saka = document.getElementById('saka_nama').value;
    const peserta = document.getElementById('saka_didik_putera').value + ' Pa / ' + document.getElementById('saka_didik_puteri').value + ' Pi';
    const telp = document.getElementById('saka_telp').value.trim();

    const list = JSON.parse(localStorage.getItem('scout_saka')) || [];
    list.unshift({ pangkalan, saka, peserta, telp_pic: telp, status: "Sedang diproses" });
    localStorage.setItem('scout_saka', JSON.stringify(list));

    window.showNotification("Permohonan Terkirim", `Usulan pembentukan pangkalan ${saka} telah dikirim ke kwarcab.`, true);
    window.navigateTo('cek-status');
};

window.handleLaporanSubmit = function(event) {
    if (event && event.preventDefault) event.preventDefault();

    const nama = document.getElementById('lap_nama').value.trim();
    const nomor = document.getElementById('lap_nomor').value.trim();
    const pengusul = document.getElementById('lap_pengusul').value;
    const periode = document.getElementById('lap_periode').value;
    const ranting = document.getElementById('lap_ranting').value;
    const jenjang = document.getElementById('lap_jenjang').value;

    const list = JSON.parse(localStorage.getItem('scout_laporan_data')) || [];
    list.unshift({ nama, nomor, pengusul, periode, ranting, jenjang, status: "Sedang diproses" });
    localStorage.setItem('scout_laporan_data', JSON.stringify(list));

    window.showNotification("Laporan Terkirim", `Laporan berkala pangkalan ${nama} berhasil disimpan ke basis data SIK.`, true);
    window.navigateTo('cek-status');
};

/**
 * Pencarian Terpadu Pelacakan Status Usulan (Cek Status)
 */
window.searchProposalStatus = function() {
    const queryEl = document.getElementById('status_search_input');
    const resultArea = document.getElementById('status_result_area');
    if (!queryEl || !resultArea) return;

    const query = queryEl.value.trim().toLowerCase();
    if (!query) {
        resultArea.innerHTML = '<div class="text-center py-6 text-red-500 text-xs font-semibold">Silakan masukkan kata kunci pencarian (Nama, Pangkalan, atau No HP).</div>';
        return;
    }

    const awards = JSON.parse(localStorage.getItem('scout_awards_proposals')) || [];
    const members = JSON.parse(localStorage.getItem('scout_database')) || [];
    const gudeps = JSON.parse(localStorage.getItem('scout_gudep')) || [];
    const sakas = JSON.parse(localStorage.getItem('scout_saka')) || [];
    const certs = JSON.parse(localStorage.getItem('scout_sertifikasi')) || [];
    const laporans = JSON.parse(localStorage.getItem('scout_laporan_data')) || [];

    const foundResults = [];

    // Filter Awards
    awards.forEach(item => {
        if ((item.nama && item.nama.toLowerCase().includes(query)) ||
            (item.gudep_nama && item.gudep_nama.toLowerCase().includes(query)) ||
            (item.pengusul && item.pengusul.toLowerCase().includes(query))) {
            foundResults.push({
                tipe: "Usulan Tanda Penghargaan (Awards)",
                judul: item.penghargaan + " - " + item.nama,
                pangkalan: item.gudep_nama + " (" + item.gudep_nomor + ")",
                tanggal: item.tanggal_usul || "Terbaru",
                status: item.status
            });
        }
    });

    // Filter Registrasi Anggota
    members.forEach(item => {
        if ((item.nama && item.nama.toLowerCase().includes(query)) ||
            (item.pangkalan && item.pangkalan.toLowerCase().includes(query)) ||
            (item.telp && item.telp.includes(query))) {
            foundResults.push({
                tipe: "Registrasi Keanggotaan SIK",
                judul: "Registrasi " + item.kategori + " (" + item.nama + ")",
                pangkalan: item.pangkalan + " - NTA: " + (item.nta || "Proses"),
                tanggal: item.tgl_dikukuhkan || "Terbaru",
                status: item.status
            });
        }
    });

    // Filter Gudep
    gudeps.forEach(item => {
        if ((item.sekolah && item.sekolah.toLowerCase().includes(query)) ||
            (item.telp_pic && item.telp_pic.includes(query))) {
            foundResults.push({
                tipe: "Usul Gugus Depan Baru",
                judul: "Pangkalan " + item.sekolah,
                pangkalan: "Kwarran " + item.ranting,
                tanggal: "Terbaru",
                status: item.status
            });
        }
    });

    // Filter Saka
    sakas.forEach(item => {
        if ((item.pangkalan && item.pangkalan.toLowerCase().includes(query)) ||
            (item.saka && item.saka.toLowerCase().includes(query)) ||
            (item.telp_pic && item.telp_pic.includes(query))) {
            foundResults.push({
                tipe: "Usul Satuan Karya (Saka)",
                judul: item.saka,
                pangkalan: item.pangkalan,
                tanggal: "Terbaru",
                status: item.status
            });
        }
    });

    // Filter Sertifikasi (SHB/SHL)
    certs.forEach(item => {
        if ((item.nama && item.nama.toLowerCase().includes(query)) ||
            (item.pangkalan && item.pangkalan.toLowerCase().includes(query))) {
            foundResults.push({
                tipe: "Pengajuan " + item.tipe,
                judul: item.tipe + " (" + item.kursus + ") - " + item.nama,
                pangkalan: item.pangkalan,
                tanggal: item.tgl_pengukuhan || "Terbaru",
                status: item.status
            });
        }
    });

    // Filter Laporan
    laporans.forEach(item => {
        if ((item.nama && item.nama.toLowerCase().includes(query)) ||
            (item.nomor && item.nomor.includes(query))) {
            foundResults.push({
                tipe: "Laporan Berkala Gudep",
                judul: "Laporan Periode " + item.periode + " - " + item.nama,
                pangkalan: "Gudep: " + item.nomor,
                tanggal: "Terbaru",
                status: item.status
            });
        }
    });

    if (foundResults.length === 0) {
        resultArea.innerHTML = `
            <div class="text-center py-8 text-gray-500 text-xs bg-gray-50 rounded-xl border border-gray-200">
                <i class="fa-solid fa-folder-open text-2xl text-gray-300 mb-2 block"></i>
                Tidak ditemukan data usulan dengan kata kunci "<span class="font-bold text-gray-700">${query}</span>".
            </div>
        `;
        return;
    }

    resultArea.innerHTML = foundResults.map(res => {
        const isApproved = res.status === 'Disetujui' || res.status === 'Aktif' || res.status === 'Selesai';
        const isRejected = res.status === 'Ditolak';
        const badgeClass = isApproved ? 'bg-green-100 text-green-800 border-green-200' :
                           isRejected ? 'bg-red-100 text-red-800 border-red-200' :
                           'bg-amber-100 text-amber-800 border-amber-200';

        return `
            <div class="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                    <span class="text-[9px] font-bold text-pramukaMaroon uppercase tracking-wider block mb-0.5">${res.tipe}</span>
                    <h4 class="font-bold text-gray-800 text-sm">${res.judul}</h4>
                    <p class="text-[11px] text-gray-500 mt-1"><i class="fa-solid fa-location-dot text-gray-400 mr-1"></i>${res.pangkalan}</p>
                </div>
                <div class="text-left sm:text-right">
                    <span class="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${badgeClass}">${res.status}</span>
                    <span class="block text-[9px] text-gray-400 mt-1">Tanggal: ${res.tanggal}</span>
                </div>
            </div>
        `;
    }).join('');
};

/**
 * Render Tabel Explorer Database Potensi
 */
window.renderDatabaseTable = function() {
    const body = document.getElementById('db-explorer-body');
    const totalBadge = document.getElementById('db-total-badge');
    if (!body) return;

    const list = JSON.parse(localStorage.getItem('scout_database')) || [];
    if (totalBadge) totalBadge.innerText = list.length;

    if (list.length === 0) {
        body.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-gray-400">Tidak ada data terdaftar dalam database SIK.</td></tr>`;
        return;
    }

    body.innerHTML = list.map(item => `
        <tr class="hover:bg-gray-50 border-b">
            <td class="p-4">
                <span class="block font-bold text-gray-900">${item.nama}</span>
                <span class="text-[9px] text-gray-400 font-mono">NTA: ${item.nta || 'PROSES'}</span>
            </td>
            <td class="p-4 uppercase font-semibold text-pramukaMaroon">${item.kategori}</td>
            <td class="p-4 font-semibold text-gray-700">${item.pangkalan}</td>
            <td class="p-4 text-gray-500">${item.ranting}</td>
            <td class="p-4">${item.tingkat_jenjang}</td>
            <td class="p-4 text-center">
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold ${item.status === 'Aktif' || item.status === 'Selesai' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}">${item.status === 'Aktif' ? 'Disetujui' : item.status}</span>
            </td>
        </tr>
    `).join('');
};

/**
 * Filter Pencarian Tabel Database Potensi
 */
window.filterDatabase = function() {
    const q = document.getElementById('db_search').value.toLowerCase().trim();
    const rows = document.querySelectorAll('#db-explorer-body tr');
    const empty = document.getElementById('db-empty-state');
    let found = 0;

    rows.forEach(row => {
        if (row.innerText.toLowerCase().includes(q)) {
            row.style.display = '';
            found++;
        } else {
            row.style.display = 'none';
        }
    });

    if (empty) {
        if (found === 0) empty.classList.remove('hidden');
        else empty.classList.add('hidden');
    }
};

/**
 * Render Rekapitulasi Potensi per Kwartir Ranting
 */
window.renderDatabaseRantingTable = function() {
    const body = document.getElementById('ranting-explorer-body');
    const totalBadge = document.getElementById('ranting-total-badge');
    if (!body) return;

    const list = JSON.parse(localStorage.getItem('scout_database')) || [];
    if (totalBadge) totalBadge.innerText = window.KECAMATAN_HALSEL.length;

    let html = '';
    window.KECAMATAN_HALSEL.forEach((kec, idx) => {
        const filtered = list.filter(item => item.ranting === kec);
        const siaga = filtered.filter(item => item.kategori === 'Siaga').length;
        const penggalang = filtered.filter(item => item.kategori === 'Penggalang').length;
        const penegak = filtered.filter(item => item.kategori === 'Penegak').length;
        const pandega = filtered.filter(item => item.kategori === 'Pandega').length;
        const pembina = filtered.filter(item => item.kategori === 'Pembina').length;
        const total = filtered.length;

        html += `
            <tr class="hover:bg-gray-50 border-b">
                <td class="p-4 text-center text-gray-400">${idx + 1}</td>
                <td class="p-4 font-bold text-gray-800">Kwarran ${kec}</td>
                <td class="p-4 text-center text-gray-500">${siaga}</td>
                <td class="p-4 text-center text-gray-500">${penggalang}</td>
                <td class="p-4 text-center text-gray-500">${penegak}</td>
                <td class="p-4 text-center text-gray-500">${pandega}</td>
                <td class="p-4 text-center text-gray-500">${pembina}</td>
                <td class="p-4 text-center font-bold bg-orange-50/50 text-pramukaMaroon">${total}</td>
            </tr>
        `;
    });

    body.innerHTML = html;
};

window.filterRantingDatabase = function() {
    const q = document.getElementById('ranting_search').value.toLowerCase().trim();
    const rows = document.querySelectorAll('#ranting-explorer-body tr');
    rows.forEach(row => {
        if (row.innerText.toLowerCase().includes(q)) row.style.display = '';
        else row.style.display = 'none';
    });
};

window.handleAdminLogin = function(event) {
    if (event && event.preventDefault) event.preventDefault();
    const u = document.getElementById('admin_user').value;
    const p = document.getElementById('admin_pass').value;

    if (u === 'admin' && p === 'kwarcabhalsel') {
        localStorage.setItem('admin_logged_in', 'true');
        window.navigateTo('admin-dashboard');
    } else {
        window.showNotification("Gagal", "Username atau password pengelola salah.", false);
    }
};

window.handleAdminLogout = function() {
    localStorage.removeItem('admin_logged_in');
    window.navigateTo('home');
};

window.previewRegistration = function(id) {
    const list = JSON.parse(localStorage.getItem('scout_database')) || [];
    const item = list.find(x => x.id === id);
    if (!item) return;

    const content = document.getElementById('detailFormContent');
    const modal = document.getElementById('detailFormModal');

    if (content && modal) {
        content.innerHTML = `
            <div class="grid grid-cols-2 gap-4 border-b pb-3 text-xs">
                <div>
                    <span class="block text-[9px] text-gray-400 font-bold uppercase">Nama Lengkap / NTA</span>
                    <span class="font-bold text-gray-900 text-sm">${item.nama}</span>
                    <span class="block text-[10px] text-gray-500 font-mono">${item.nta}</span>
                </div>
                <div>
                    <span class="block text-[9px] text-gray-400 font-bold uppercase">Kategori Kepramukaan</span>
                    <span class="font-bold text-pramukaMaroon text-sm">${item.kategori} - ${item.tingkat_jenjang}</span>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-3 border-b py-3 text-xs">
                <div><span class="block text-[9px] text-gray-400 uppercase">Tempat Lahir</span><span>${item.tempat_lahir}</span></div>
                <div><span class="block text-[9px] text-gray-400 uppercase">Tanggal Lahir</span><span>${item.tanggal_lahir}</span></div>
                <div><span class="block text-[9px] text-gray-400 uppercase">Pangkalan</span><span>${item.pangkalan} (Gudep: ${item.gudep})</span></div>
            </div>
            <div class="grid grid-cols-2 gap-4 border-b py-3 text-xs">
                <div><span class="block text-[9px] text-gray-400 uppercase">Nama Orang Tua</span><span>Ayah: ${item.nama_ayah} | Ibu: ${item.nama_ibu}</span></div>
                <div><span class="block text-[9px] text-gray-400 uppercase">Kontak SIK</span><span>Telp: ${item.telp} | Email: ${item.email}</span></div>
            </div>
            <div class="border-b py-3 text-xs">
                <span class="block text-[9px] text-gray-400 uppercase mb-1">Alamat Domisili</span>
                <span>Desa ${item.alamat_desa}, RT/RW ${item.alamat_rtrw}, Kecamatan ${item.alamat_kec}</span>
            </div>
            <div class="flex items-center gap-4 py-3 text-xs">
                <i class="fa-solid fa-file-image text-4xl text-blue-500"></i>
                <div>
                    <span class="block text-[9px] text-gray-400 uppercase">Berkas Lampiran Foto</span>
                    <span class="font-semibold text-gray-700">${item.fotoName}</span>
                </div>
            </div>
            <div class="text-right border-t pt-4">
                <button onclick="window.closeDetailModal()" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-1.5 rounded transition text-xs">Tutup Detail</button>
            </div>
        `;
        modal.classList.remove('hidden');
    }
};

window.closeDetailModal = function() {
    const modal = document.getElementById('detailFormModal');
    if (modal) modal.classList.add('hidden');
};

window.updateGudepStatus = function(idx, status) {
    const list = JSON.parse(localStorage.getItem('scout_gudep')) || [];
    list[idx].status = status;
    localStorage.setItem('scout_gudep', JSON.stringify(list));
    window.showNotification("Sukses", `Status usulan Gudep di-update ke ${status}`, true);
    window.renderAdminTab('gudep');
};

window.updateSakaStatus = function(idx, status) {
    const list = JSON.parse(localStorage.getItem('scout_saka')) || [];
    list[idx].status = status;
    localStorage.setItem('scout_saka', JSON.stringify(list));
    window.showNotification("Sukses", `Status usulan Saka di-update ke ${status}`, true);
    window.renderAdminTab('saka');
};

window.updateLaporanStatus = function(idx, status) {
    const list = JSON.parse(localStorage.getItem('scout_laporan_data')) || [];
    list[idx].status = status;
    localStorage.setItem('scout_laporan_data', JSON.stringify(list));
    window.showNotification("Sukses", `Status Laporan Berkala di-update ke ${status}`, true);
    window.renderAdminTab('laporan');
};

window.updateRegStatus = function(idx, status) {
    const list = JSON.parse(localStorage.getItem('scout_database')) || [];
    list[idx].status = status;
    localStorage.setItem('scout_database', JSON.stringify(list));
    window.showNotification("Sukses", `Status keanggotaan SIK di-update ke ${status}`, true);
    window.renderAdminTab('registrasi');
};

window.previewAwardProposal = function(id) {
    const list = JSON.parse(localStorage.getItem('scout_awards_proposals')) || [];
    const item = list.find(x => x.id === id);
    if (!item) return;

    const content = document.getElementById('detailFormContent');
    const modal = document.getElementById('detailFormModal');

    if (content && modal) {
        content.innerHTML = `
            <div class="space-y-4">
                <div class="bg-amber-50 p-3 rounded-lg border border-amber-200 flex justify-between items-center">
                    <div>
                        <span class="text-[9px] font-bold text-amber-800 uppercase block">Usulan Tanda Penghargaan</span>
                        <h4 class="font-extrabold text-gray-900 text-sm">${item.penghargaan}</h4>
                    </div>
                    <span class="px-2.5 py-1 rounded text-[10px] font-bold uppercase bg-amber-200 text-amber-900">${item.status}</span>
                </div>

                <div class="grid grid-cols-2 gap-3 text-xs border-b pb-3">
                    <div><span class="text-gray-400 block text-[9px] uppercase font-bold">Nama Pengusul / Kwarran</span><span class="font-bold text-gray-800">${item.pengusul}</span></div>
                    <div><span class="text-gray-400 block text-[9px] uppercase font-bold">Jenis Anggota</span><span class="font-bold text-gray-800">${item.jenis}</span></div>
                    <div><span class="text-gray-400 block text-[9px] uppercase font-bold">Nama Lengkap</span><span class="font-bold text-gray-800">${item.nama} (${item.panggilan})</span></div>
                    <div><span class="text-gray-400 block text-[9px] uppercase font-bold">Gugus Depan / No Gudep</span><span class="font-bold text-gray-800">${item.gudep_nama} / ${item.gudep_nomor}</span></div>
                    <div><span class="text-gray-400 block text-[9px] uppercase font-bold">TTL / Agama</span><span class="font-bold text-gray-800">${item.tempat_lahir}, ${item.tanggal_lahir} / ${item.agama}</span></div>
                    <div><span class="text-gray-400 block text-[9px] uppercase font-bold">Golongan Darah</span><span class="font-bold text-gray-800">${item.goldar}</span></div>
                </div>

                <div>
                    <span class="text-[9px] font-bold text-gray-400 uppercase block mb-1">Syarat Terpenuhi:</span>
                    <p class="bg-gray-50 p-2.5 rounded border text-gray-700 leading-relaxed text-xs">${item.syarat}</p>
                </div>

                <div>
                    <span class="text-[9px] font-bold text-gray-400 uppercase block mb-1">Berkas Lampiran yang Diunggah:</span>
                    <ul class="list-disc pl-4 text-xs text-gray-600 space-y-1">
                        <li>Pas Foto PNG: ${item.files.foto}</li>
                        <li>TPOD PDF: ${item.files.tpod}</li>
                        <li>SK PDF: ${item.files.sk}</li>
                        <li>Tanda Penghargaan Terakhir PDF: ${item.files.prev}</li>
                        <li>5 Bukti Dukung: ${item.files.bukti.join(', ')}</li>
                    </ul>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
    }
};

window.downloadIndividualAward = function(id) {
    const list = JSON.parse(localStorage.getItem('scout_awards_proposals')) || [];
    const item = list.find(x => x.id === id);
    if (!item) return;

    const textContent = `==================================================
LEMBAR USULAN TANDA PENGHARGAAN KWARCAB HALSEL
ID: ${item.id}
==================================================
Pengusul Kwarran : ${item.pengusul}
Jenis Anggota    : ${item.jenis}
Penghargaan      : ${item.penghargaan}
Nama Lengkap     : ${item.nama}
Nama Panggilan   : ${item.panggilan}
Pangkalan Gudep  : ${item.gudep_nama} (${item.gudep_nomor})
TTL              : ${item.tempat_lahir}, ${item.tanggal_lahir}
Gol. Darah / Agama: ${item.goldar} / ${item.agama}

SYARAT TERPENUHI:
${item.syarat}

Daftar Berkas:
- Foto: ${item.files.foto}
- TPOD: ${item.files.tpod}
- SK: ${item.files.sk}
- Penghargaan Terakhir: ${item.files.prev}
- Bukti Dukung: ${item.files.bukti.join(', ')}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Usulan_Awards_${item.nama.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
};

window.updateAwardStatus = function(id, newStatus) {
    const list = JSON.parse(localStorage.getItem('scout_awards_proposals')) || [];
    const idx = list.findIndex(x => x.id === id);
    if (idx !== -1) {
        list[idx].status = newStatus;
        localStorage.setItem('scout_awards_proposals', JSON.stringify(list));
        window.showNotification("Status Diperbarui", `Usulan awards berhasil di-update ke: ${newStatus}`, true);
        window.renderAdminTab('awards');
    }
};

window.deleteAwardProposal = function(id) {
    let list = JSON.parse(localStorage.getItem('scout_awards_proposals')) || [];
    list = list.filter(x => x.id !== id);
    localStorage.setItem('scout_awards_proposals', JSON.stringify(list));
    window.showNotification("Terhapus", "Usulan awards berhasil dihapus.", true);
    window.renderAdminTab('awards');
};

window.downloadAwardsRecap = function() {
    const list = JSON.parse(localStorage.getItem('scout_awards_proposals')) || [];
    if (list.length === 0) {
        window.showNotification("Kosong", "Belum ada data usulan awards untuk diunduh.", false);
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,ID,Tanggal Usul,Pengusul,Jenis,Nama Lengkap,Penghargaan,Gudep Nama,Gudep Nomor,Status\n";
    list.forEach(i => {
        csvContent += `"${i.id}","${i.tanggal_usul}","${i.pengusul}","${i.jenis}","${i.nama}","${i.penghargaan}","${i.gudep_nama}","${i.gudep_nomor}","${i.status}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Usulan_Awards_Kwarcab_Halsel.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.renderAdminDownloadList = function(storageKey, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const items = JSON.parse(localStorage.getItem(storageKey)) || [];
    container.innerHTML = items.map((item, idx) => `
        <div class="flex items-center justify-between border-b py-1 text-xs gap-2">
            <span class="font-semibold text-gray-700 truncate max-w-[150px]">${item.nama}</span>
            <button onclick="window.deleteDownloadItem('${storageKey}', ${idx}, '${containerId}')" class="text-red-500 hover:text-red-700 text-[10px]"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `).join('');
};

window.saveNewDownloadItem = function(storageKey) {
    let nameInput, urlInput, containerId;
    if (storageKey === 'scout_buku') {
        nameInput = document.getElementById('add_book_name');
        urlInput = document.getElementById('add_book_url');
        containerId = 'admin-books-container';
    } else if (storageKey === 'scout_kelengkapan') {
        nameInput = document.getElementById('add_form_name');
        urlInput = document.getElementById('add_form_url');
        containerId = 'admin-forms-container';
    } else if (storageKey === 'scout_putusan') {
        nameInput = document.getElementById('add_dec_name');
        urlInput = document.getElementById('add_dec_url');
        containerId = 'admin-decrees-container';
    }

    if (!nameInput || !urlInput) return;
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();

    if (!name || !url) {
        window.showNotification("Gagal", "Lengkapi seluruh isian berkas unduhan.", false);
        return;
    }

    const items = JSON.parse(localStorage.getItem(storageKey)) || [];
    items.push({ nama: name, url: url });
    localStorage.setItem(storageKey, JSON.stringify(items));

    nameInput.value = '';
    urlInput.value = '';

    window.showNotification("Sukses", "Berkas baru berhasil dipublikasi.", true);
    window.renderAdminDownloadList(storageKey, containerId);
};

window.deleteDownloadItem = function(storageKey, idx, containerId) {
    const items = JSON.parse(localStorage.getItem(storageKey)) || [];
    items.splice(idx, 1);
    localStorage.setItem(storageKey, JSON.stringify(items));
    window.renderAdminDownloadList(storageKey, containerId);
};

window.saveAdminProfile = function() {
    const sejarah = document.getElementById('adm_sejarah_input').value.trim();
    const visimisi = document.getElementById('adm_visimisi_input').value.trim();

    if (!sejarah || !visimisi) {
        window.showNotification("Gagal", "Harap lengkapi isian profil sejarah & visi-misi.", false);
        return;
    }

    localStorage.setItem('scout_sejarah', sejarah);
    localStorage.setItem('scout_visimisi', visimisi);
    window.showNotification("Berhasil", "Profil sejarah, visi & misi Kwartir Cabang berhasil dimutakhirkan secara terpadu.", true);
};

window.saveNewSlideshow = async function(event) {
    if (event) event.preventDefault();
    const title = document.getElementById('add_slide_title').value.trim();
    const fileInput = document.getElementById('add_slide_file');

    if (!title) {
        window.showNotification("Gagal", "Mohon isi Judul Slide terlebih dahulu.", false);
        return;
    }
    if (!fileInput || fileInput.files.length === 0) {
        window.showNotification("Gagal", "Mohon pilih file gambar/foto kegiatan.", false);
        return;
    }

    const file = fileInput.files[0];
    try {
        const base64Data = await window.readFileAsDataURL(file);
        const slides = JSON.parse(localStorage.getItem('scout_slideshow')) || [];
        slides.push({
            id: Date.now().toString(),
            title: title,
            url: base64Data
        });
        localStorage.setItem('scout_slideshow', JSON.stringify(slides));

        document.getElementById('add_slide_title').value = '';
        fileInput.value = '';
        document.getElementById('add_slide_file_label').innerText = 'Pilih File Gambar (Klik / Seret)';
        document.getElementById('add_slide_file_label').className = 'block text-[11px] text-gray-500';

        window.showNotification("Berhasil", "Foto slideshow baru berhasil diunggah dan disimpan ke SIK!", true);
        window.renderAdminSlideshowList();
    } catch (err) {
        window.showNotification("Gagal", "Gagal menerjemahkan file gambar.", false);
    }
};

window.deleteSlideshow = function(idx) {
    const slides = JSON.parse(localStorage.getItem('scout_slideshow')) || [];
    slides.splice(idx, 1);
    localStorage.setItem('scout_slideshow', JSON.stringify(slides));
    window.renderAdminSlideshowList();
    window.showNotification("Sukses", "Slide berhasil dihapus.", true);
};

window.renderAdminSlideshowList = function() {
    const wrapper = document.getElementById('admin-slideshow-list');
    if (!wrapper) return;
    const slides = JSON.parse(localStorage.getItem('scout_slideshow')) || [];
    wrapper.innerHTML = slides.map((slide, idx) => `
        <div class="bg-gray-50 p-3 border rounded-xl flex items-center justify-between gap-3 text-xs shadow-inner">
            <div class="flex items-center gap-3">
                <img src="${slide.url}" class="w-10 h-10 object-cover rounded border bg-white" onerror="this.src='https://placehold.co/150x150/7b1113/ffffff?text=Error'">
                <div class="text-left">
                    <span class="block font-bold text-gray-800 text-[11px]">${slide.title}</span>
                    <span class="text-[9px] text-gray-400 block truncate max-w-[180px]">Format: Base64 / Internal SIK</span>
                </div>
            </div>
            <button onclick="window.deleteSlideshow(${idx})" class="text-red-600 hover:text-red-800 text-xs font-bold p-1"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `).join('');
};

window.previewSlideshowUpload = function(input) {
    const label = document.getElementById('add_slide_file_label');
    if (label && input.files[0]) {
        label.innerText = `Foto Terpilih: ${input.files[0].name}`;
        label.className = "block text-[11px] text-green-600 font-bold break-all";
    }
};

window.saveNewKegiatan = function() {
    const title = document.getElementById('add_act_title').value.trim();
    const date = document.getElementById('add_act_date').value.trim();
    const desc = document.getElementById('add_act_desc').value.trim();
    const link = document.getElementById('add_act_link').value.trim();

    if (!title || !date || !desc) {
        window.showNotification("Gagal", "Harap isi nama, tanggal, dan deskripsi kegiatan.", false);
        return;
    }

    const items = JSON.parse(localStorage.getItem('scout_kegiatan')) || [];
    items.unshift({ id: Date.now().toString(), title, date, desc, link: link || '#' });
    localStorage.setItem('scout_kegiatan', JSON.stringify(items));

    document.getElementById('add_act_title').value = '';
    document.getElementById('add_act_date').value = '';
    document.getElementById('add_act_desc').value = '';
    document.getElementById('add_act_link').value = '';

    window.showNotification("Terbit", "Agenda kegiatan baru berhasil ditambahkan.", true);
    window.renderAdminKegiatanList();
};

window.deleteKegiatan = function(idx) {
    const items = JSON.parse(localStorage.getItem('scout_kegiatan')) || [];
    items.splice(idx, 1);
    localStorage.setItem('scout_kegiatan', JSON.stringify(items));
    window.renderAdminKegiatanList();
};

window.renderAdminKegiatanList = function() {
    const container = document.getElementById('admin-kegiatan-list');
    if (!container) return;
    const items = JSON.parse(localStorage.getItem('scout_kegiatan')) || [];
    container.innerHTML = items.map((act, idx) => `
        <div class="border rounded-lg p-3 bg-white shadow-sm flex items-center justify-between text-xs gap-3">
            <div>
                <span class="text-[9px] font-bold text-pramukaMaroon block">${act.date}</span>
                <h5 class="font-bold text-gray-800">${act.title}</h5>
            </div>
            <button onclick="window.deleteKegiatan(${idx})" class="text-red-500 hover:text-red-700 font-bold"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `).join('');
};

/**
 * Render Konten Tab Admin Workspace
 */
window.renderAdminTab = function(tabId) {
    window.CURRENT_ADMIN_TAB = tabId;

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.className = 'tab-btn px-4 py-2 text-xs font-bold rounded bg-gray-100 text-gray-700 transition';
    });
    const activeBtn = document.getElementById('btn-tab-' + tabId);
    if (activeBtn) {
        activeBtn.className = 'tab-btn px-4 py-2 text-xs font-extrabold rounded bg-pramukaMaroon text-white transition shadow';
    }

    const area = document.getElementById('admin-tab-content-area');
    if (!area) return;

    if (tabId === 'awards') {
        const list = JSON.parse(localStorage.getItem('scout_awards_proposals')) || [];

        let html = `
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b">
                    <div>
                        <h3 class="font-bold text-gray-800 text-sm flex items-center gap-1.5"><i class="fa-solid fa-medal text-pramukaGold"></i> Daftar Usulan Tanda Penghargaan (Awards)</h3>
                        <p class="text-[10px] text-gray-400">Terintegrasi secara real-time dengan menu layanan publik</p>
                    </div>
                    <button onclick="window.downloadAwardsRecap()" class="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded text-[10px] uppercase transition flex items-center gap-1.5 shadow">
                        <i class="fa-solid fa-file-csv"></i> Download Rekapan (CSV)
                    </button>
                </div>

                <div class="overflow-x-auto custom-scrollbar">
                    <table class="w-full text-left text-xs min-w-[850px]">
                        <thead>
                            <tr class="bg-gray-50 text-gray-600 border-b font-bold uppercase text-[9px] tracking-wider">
                                <th class="p-3">Tanggal Usul</th>
                                <th class="p-3">Pengusul / Kwarran</th>
                                <th class="p-3">Nama Lengkap</th>
                                <th class="p-3">Penghargaan</th>
                                <th class="p-3">Pangkalan Gudep</th>
                                <th class="p-3 text-center">Status</th>
                                <th class="p-3 text-center">Aksi Administrasi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
        `;

        if (list.length === 0) {
            html += `<tr><td colspan="7" class="p-8 text-center text-gray-400 italic">Belum ada usulan tanda penghargaan yang masuk.</td></tr>`;
        } else {
            list.forEach(item => {
                html += `
                    <tr class="hover:bg-gray-50 transition">
                        <td class="p-3 text-[10px] text-gray-500 font-medium">${item.tanggal_usul || '-'}</td>
                        <td class="p-3">
                            <span class="font-semibold text-gray-800">${item.pengusul || '-'}</span>
                            <span class="block text-[8px] text-gray-400 font-mono">${item.id}</span>
                        </td>
                        <td class="p-3">
                            <span class="font-bold text-gray-900">${item.nama}</span>
                            <span class="block text-[10px] text-gray-500">${item.jenis || '-'}</span>
                        </td>
                        <td class="p-3">
                            <span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide border border-amber-200">${item.penghargaan}</span>
                        </td>
                        <td class="p-3">
                            <span class="font-medium text-gray-700 block">${item.gudep_nama}</span>
                            <span class="text-[10px] text-gray-400 font-mono">${item.gudep_nomor}</span>
                        </td>
                        <td class="p-3 text-center">
                            <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${
                                item.status === 'Disetujui' ? 'bg-green-100 text-green-800 border border-green-200' :
                                item.status === 'Ditolak' ? 'bg-red-100 text-red-800 border border-red-200' :
                                'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }">${item.status}</span>
                        </td>
                        <td class="p-3 text-center">
                            <div class="flex items-center justify-center gap-1.5">
                                <button onclick="window.previewAwardProposal('${item.id}')" title="Preview Detail Usulan" class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded text-[10px] font-bold transition flex items-center gap-1">
                                    <i class="fa-solid fa-eye"></i> Preview
                                </button>
                                <button onclick="window.downloadIndividualAward('${item.id}')" title="Download Format TXT" class="bg-amber-100 hover:bg-amber-200 text-amber-800 px-2 py-1 rounded text-[10px] font-bold transition flex items-center gap-1">
                                    <i class="fa-solid fa-file-arrow-down"></i> Download
                                </button>
                                <div class="h-4 w-[1px] bg-gray-200 mx-1"></div>
                                <button onclick="window.updateAwardStatus('${item.id}', 'Disetujui')" class="text-green-600 hover:text-green-800 text-[11px]" title="Setujui"><i class="fa-solid fa-circle-check"></i></button>
                                <button onclick="window.updateAwardStatus('${item.id}', 'Ditolak')" class="text-red-600 hover:text-red-800 text-[11px]" title="Tolak"><i class="fa-solid fa-circle-xmark"></i></button>
                                <button onclick="window.deleteAwardProposal('${item.id}')" class="text-gray-400 hover:text-red-700 text-[11px]" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                `;
            });
        }

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        area.innerHTML = html;
    }

    else if (tabId === 'gudep') {
        const list = JSON.parse(localStorage.getItem('scout_gudep')) || [];
        let html = `
            <table class="w-full text-left text-xs min-w-[600px]">
                <thead>
                    <tr class="bg-gray-50 text-gray-600 border-b font-bold uppercase text-[9px]">
                        <th class="p-3">Pangkalan Sekolah</th>
                        <th class="p-3">Kwartir Ranting</th>
                        <th class="p-3">Mabigus / Peserta</th>
                        <th class="p-3">Telp PIC</th>
                        <th class="p-3 text-center">Status</th>
                        <th class="p-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
        `;
        if (list.length === 0) {
            html += `<tr><td colspan="6" class="p-6 text-center text-gray-400">Belum ada usulan Gudep.</td></tr>`;
        } else {
            list.forEach((item, idx) => {
                html += `
                    <tr>
                        <td class="p-3 font-bold">${item.sekolah}</td>
                        <td class="p-3">Kec. ${item.ranting}</td>
                        <td class="p-3">${item.mabigus}</td>
                        <td class="p-3">${item.telp_pic}</td>
                        <td class="p-3 text-center"><span class="px-2 py-0.5 rounded text-[9px] font-bold ${item.status === 'Aktif' || item.status === 'Selesai' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}">${item.status}</span></td>
                        <td class="p-3 text-center">
                            <div class="flex items-center justify-center gap-2">
                                <button onclick="window.updateGudepStatus(${idx}, 'Disetujui')" class="text-green-600 font-bold"><i class="fa-solid fa-check"></i></button>
                                <button onclick="window.updateGudepStatus(${idx}, 'Ditolak')" class="text-red-600 font-bold"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </td>
                    </tr>
                `;
            });
        }
        html += `</tbody></table>`;
        area.innerHTML = html;
    }

    else if (tabId === 'saka') {
        const list = JSON.parse(localStorage.getItem('scout_saka')) || [];
        let html = `
            <table class="w-full text-left text-xs min-w-[600px]">
                <thead>
                    <tr class="bg-gray-50 text-gray-600 border-b font-bold uppercase text-[9px]">
                        <th class="p-3">Nama Saka / Pangkalan</th>
                        <th class="p-3">Peserta Didik</th>
                        <th class="p-3">Telp PIC</th>
                        <th class="p-3 text-center">Status</th>
                        <th class="p-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
        `;
        if (list.length === 0) {
            html += `<tr><td colspan="5" class="p-6 text-center text-gray-400">Belum ada usulan Saka.</td></tr>`;
        } else {
            list.forEach((item, idx) => {
                html += `
                    <tr>
                        <td class="p-3 font-bold">${item.saka} - ${item.pangkalan}</td>
                        <td class="p-3">${item.peserta}</td>
                        <td class="p-3">${item.telp_pic}</td>
                        <td class="p-3 text-center"><span class="px-2 py-0.5 rounded text-[9px] font-bold ${item.status === 'Aktif' || item.status === 'Selesai' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}">${item.status}</span></td>
                        <td class="p-3 text-center">
                            <div class="flex items-center justify-center gap-2">
                                <button onclick="window.updateSakaStatus(${idx}, 'Disetujui')" class="text-green-600 font-bold"><i class="fa-solid fa-check"></i></button>
                                <button onclick="window.updateSakaStatus(${idx}, 'Ditolak')" class="text-red-600 font-bold"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </td>
                    </tr>
                `;
            });
        }
        html += `</tbody></table>`;
        area.innerHTML = html;
    }

    else if (tabId === 'laporan') {
        const list = JSON.parse(localStorage.getItem('scout_laporan_data')) || [];
        let html = `
            <table class="w-full text-left text-xs min-w-[600px]">
                <thead>
                    <tr class="bg-gray-50 text-gray-600 border-b font-bold uppercase text-[9px]">
                        <th class="p-3">Nama Gudep</th>
                        <th class="p-3">Nomor / Periode</th>
                        <th class="p-3">Kwarran / Jenjang</th>
                        <th class="p-3 text-center">Status</th>
                        <th class="p-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
        `;
        if (list.length === 0) {
            html += `<tr><td colspan="5" class="p-6 text-center text-gray-400">Belum ada laporan masuk.</td></tr>`;
        } else {
            list.forEach((item, idx) => {
                html += `
                    <tr>
                        <td class="p-3 font-bold">${item.nama}</td>
                        <td class="p-3">${item.nomor} - Periode ${item.periode}</td>
                        <td class="p-3">Kec. ${item.ranting} (${item.jenjang})</td>
                        <td class="p-3 text-center"><span class="px-2 py-0.5 rounded text-[9px] font-bold ${item.status === 'Selesai' || item.status === 'Disetujui' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}">${item.status}</span></td>
                        <td class="p-3 text-center">
                            <div class="flex items-center justify-center gap-2">
                                <button onclick="window.updateLaporanStatus(${idx}, 'Disetujui')" class="text-green-600 font-bold"><i class="fa-solid fa-check"></i></button>
                                <button onclick="window.updateLaporanStatus(${idx}, 'Ditolak')" class="text-red-600 font-bold"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </td>
                    </tr>
                `;
            });
        }
        html += `</tbody></table>`;
        area.innerHTML = html;
    }

    else if (tabId === 'registrasi') {
        const list = JSON.parse(localStorage.getItem('scout_database')) || [];
        let html = `
            <table class="w-full text-left text-xs min-w-[700px]">
                <thead>
                    <tr class="bg-gray-50 text-gray-600 border-b font-bold uppercase text-[9px]">
                        <th class="p-3">Identitas Nama / NTA</th>
                        <th class="p-3">Gudep / Pangkalan</th>
                        <th class="p-3">Kategori</th>
                        <th class="p-3">Alamat</th>
                        <th class="p-3 text-center">Status</th>
                        <th class="p-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
        `;
        if (list.length === 0) {
            html += `<tr><td colspan="6" class="p-6 text-center text-gray-400">Belum ada registrasi baru.</td></tr>`;
        } else {
            list.forEach((item, idx) => {
                html += `
                    <tr>
                        <td class="p-3 font-bold">
                            <span class="block text-gray-900">${item.nama}</span>
                            <span class="text-[9px] text-gray-400 font-mono">NTA: ${item.nta}</span>
                        </td>
                        <td class="p-3">${item.pangkalan} (Gudep: ${item.gudep})</td>
                        <td class="p-3">${item.kategori} - ${item.tingkat_jenjang}</td>
                        <td class="p-3">Kec. ${item.alamat_kec}</td>
                        <td class="p-3 text-center"><span class="px-2 py-0.5 rounded text-[9px] font-bold ${item.status === 'Aktif' || item.status === 'Selesai' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}">${item.status}</span></td>
                        <td class="p-3 text-center">
                            <div class="flex items-center justify-center gap-2">
                                <button onclick="window.previewRegistration('${item.id}')" class="text-blue-600 font-bold text-[10px]"><i class="fa-solid fa-eye"></i> Detail</button>
                                <button onclick="window.updateRegStatus(${idx}, 'Aktif')" class="text-green-600 font-bold"><i class="fa-solid fa-check"></i></button>
                                <button onclick="window.updateRegStatus(${idx}, 'Ditolak')" class="text-red-600 font-bold"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </td>
                    </tr>
                `;
            });
        }
        html += `</tbody></table>`;
        area.innerHTML = html;
    }

    else if (tabId === 'unduh') {
        let html = `
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="border p-4 rounded-xl bg-gray-50 shadow-inner">
                        <h4 class="font-bold text-gray-800 text-xs mb-3 border-b pb-2 uppercase"><i class="fa-solid fa-book text-red-700 mr-2"></i>Perpustakaan Buku</h4>
                        <div id="admin-books-container" class="space-y-2 mb-4"></div>
                        <div class="space-y-2">
                            <input type="text" id="add_book_name" placeholder="Judul Buku..." class="w-full border p-1.5 text-[11px] rounded focus:outline-none">
                            <input type="text" id="add_book_url" placeholder="URL Berkas Buku..." class="w-full border p-1.5 text-[11px] rounded focus:outline-none">
                            <button onclick="window.saveNewDownloadItem('scout_buku')" class="w-full bg-pramukaMaroon hover:bg-pramukaMaroonHover text-white text-[10px] font-bold py-1 px-3 rounded uppercase">+ Tambah Buku</button>
                        </div>
                    </div>

                    <div class="border p-4 rounded-xl bg-gray-50 shadow-inner">
                        <h4 class="font-bold text-gray-800 text-xs mb-3 border-b pb-2 uppercase"><i class="fa-solid fa-file-invoice text-amber-600 mr-2"></i>Formulir Kelengkapan</h4>
                        <div id="admin-forms-container" class="space-y-2 mb-4"></div>
                        <div class="space-y-2">
                            <input type="text" id="add_form_name" placeholder="Nama Formulir..." class="w-full border p-1.5 text-[11px] rounded focus:outline-none">
                            <input type="text" id="add_form_url" placeholder="URL Berkas Form..." class="w-full border p-1.5 text-[11px] rounded focus:outline-none">
                            <button onclick="window.saveNewDownloadItem('scout_kelengkapan')" class="w-full bg-pramukaMaroon hover:bg-pramukaMaroonHover text-white text-[10px] font-bold py-1 px-3 rounded uppercase">+ Tambah Form</button>
                        </div>
                    </div>

                    <div class="border p-4 rounded-xl bg-gray-50 shadow-inner">
                        <h4 class="font-bold text-gray-800 text-xs mb-3 border-b pb-2 uppercase"><i class="fa-solid fa-scroll text-blue-700 mr-2"></i>Surat Putusan</h4>
                        <div id="admin-decrees-container" class="space-y-2 mb-4"></div>
                        <div class="space-y-2">
                            <input type="text" id="add_dec_name" placeholder="Judul Putusan..." class="w-full border p-1.5 text-[11px] rounded focus:outline-none">
                            <input type="text" id="add_dec_url" placeholder="URL Berkas Putusan..." class="w-full border p-1.5 text-[11px] rounded focus:outline-none">
                            <button onclick="window.saveNewDownloadItem('scout_putusan')" class="w-full bg-pramukaMaroon hover:bg-pramukaMaroonHover text-white text-[10px] font-bold py-1 px-3 rounded uppercase">+ Tambah Putusan</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        area.innerHTML = html;
        window.renderAdminDownloadList('scout_buku', 'admin-books-container');
        window.renderAdminDownloadList('scout_kelengkapan', 'admin-forms-container');
        window.renderAdminDownloadList('scout_putusan', 'admin-decrees-container');
    }

    else if (tabId === 'slideshow') {
        let html = `
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div class="md:col-span-5 bg-gray-50 p-5 rounded-xl shadow-inner text-left">
                    <h4 class="font-bold text-gray-800 text-xs mb-3 border-b pb-2 uppercase"><i class="fa-solid fa-image text-pramukaGold"></i> Unggah Gambar Slideshow SIK</h4>
                    
                    <form onsubmit="window.saveNewSlideshow(event)" class="space-y-3">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-700 uppercase mb-1">Judul Slide Kegiatan</label>
                            <input type="text" id="add_slide_title" required placeholder="Contoh: Kemah Bakti Saruma..." class="w-full border p-2 text-xs rounded bg-white focus:outline-none focus:ring-1 focus:ring-pramukaMaroon">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-700 uppercase mb-1">Pilih File Foto (PNG/JPG)</label>
                            <div class="border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer relative hover:border-pramukaMaroon transition bg-white">
                                <input type="file" id="add_slide_file" accept="image/png, image/jpeg" required class="absolute inset-0 opacity-0 cursor-pointer" onchange="window.previewSlideshowUpload(this)">
                                <span id="add_slide_file_label" class="block text-[11px] text-gray-500">Pilih File Gambar (Klik / Seret)</span>
                            </div>
                            <p class="text-[9px] text-gray-400 mt-1">*Disarankan resolusi lanskap lebar (misal: 1200x500 piksel) untuk hasil optimal.</p>
                        </div>
                        <button type="submit" class="w-full bg-pramukaMaroon hover:bg-pramukaMaroonHover text-white text-xs font-bold py-2 px-4 rounded transition uppercase tracking-wide">Mulai Unggah Foto</button>
                    </form>
                </div>

                <div class="md:col-span-7">
                    <h4 class="font-bold text-gray-800 text-xs mb-3 border-b pb-2 uppercase"><i class="fa-solid fa-images mr-2"></i>Slide Terbit Aktif SIK</h4>
                    <div id="admin-slideshow-list" class="grid grid-cols-1 gap-3 max-h-[350px] overflow-y-auto custom-scrollbar pr-2"></div>
                </div>
            </div>
        `;
        area.innerHTML = html;
        window.renderAdminSlideshowList();
    }

    else if (tabId === 'kegiatan') {
        let html = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div class="bg-gray-50 p-5 rounded-xl shadow-inner">
                    <h4 class="font-bold text-gray-800 text-xs mb-3 border-b pb-2 uppercase"><i class="fa-solid fa-calendar-plus text-pramukaMaroon"></i> Tambah Kegiatan Baru</h4>
                    <div class="space-y-2">
                        <input type="text" id="add_act_title" placeholder="Nama Kegiatan..." class="w-full border p-2 text-xs rounded bg-white focus:outline-none">
                        <input type="text" id="add_act_date" placeholder="Tanggal Kegiatan (Contoh: 12-14 Mei 2026)..." class="w-full border p-2 text-xs rounded bg-white focus:outline-none">
                        <textarea id="add_act_desc" placeholder="Deskripsi ringkas kegiatan..." class="w-full border p-2 text-xs rounded bg-white focus:outline-none" rows="3"></textarea>
                        <input type="text" id="add_act_link" placeholder="URL Tautan Tambahan (Opsional)..." class="w-full border p-2 text-xs rounded bg-white focus:outline-none">
                        <button onclick="window.saveNewKegiatan()" class="w-full bg-pramukaMaroon hover:bg-pramukaMaroonHover text-white text-xs font-bold py-2 rounded uppercase">Terbitkan Agenda</button>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold text-gray-800 text-xs mb-3 border-b pb-2 uppercase">Daftar Agenda Aktif</h4>
                    <div id="admin-kegiatan-list" class="space-y-2 max-h-[350px] overflow-y-auto custom-scrollbar"></div>
                </div>
            </div>
        `;
        area.innerHTML = html;
        window.renderAdminKegiatanList();
    }

    else if (tabId === 'profil') {
        let html = `
            <div class="space-y-4 text-left">
                <h4 class="font-bold text-gray-800 text-xs border-b pb-2 uppercase"><i class="fa-solid fa-pen-to-square"></i> Sunting Narasi & Visi Misi Kwartir Cabang</h4>
                <div class="space-y-3">
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase mb-1">Sejarah Singkat Gerakan Pramuka Halsel</label>
                        <textarea id="adm_sejarah_input" class="w-full border p-3 text-xs rounded focus:outline-none focus:ring-1 focus:ring-pramukaMaroon" rows="6"></textarea>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase mb-1">Visi & Misi Kwartir Cabang</label>
                        <textarea id="adm_visimisi_input" class="w-full border p-3 text-xs rounded focus:outline-none focus:ring-1 focus:ring-pramukaMaroon" rows="8"></textarea>
                    </div>
                    <button onclick="window.saveAdminProfile()" class="bg-pramukaMaroon hover:bg-pramukaMaroonHover text-white font-bold text-xs py-2 px-6 rounded transition uppercase shadow">
                        Simpan Perubahan Profil
                    </button>
                </div>
            </div>
        `;
        area.innerHTML = html;
        document.getElementById('adm_sejarah_input').value = localStorage.getItem('scout_sejarah') || '';
        document.getElementById('adm_visimisi_input').value = localStorage.getItem('scout_visimisi') || '';
    }
};

window.startSkuUjian = function() {
    const level = document.getElementById('sku_level').value;
    window.SKU_SESSION_GOLONGAN = level;
    
    document.getElementById('sku-setup-screen').classList.add('hidden');
    document.getElementById('sku-play-screen').classList.remove('hidden');

    window.loadNextSkuQuestion();
};

window.loadNextSkuQuestion = function() {
    document.getElementById('sku-feedback-area').classList.add('hidden');
    document.getElementById('sku-next-area').classList.add('hidden');
    document.getElementById('sku-submit-form').classList.remove('hidden');
    document.getElementById('sku_jawaban').value = '';

    const level = window.SKU_SESSION_GOLONGAN;
    let questions = [];

    if (level === 'Siaga') {
        questions = [
            "Sebutkan bunyi Dwidarma Pramuka pertama!",
            "Apa lambang utama Gerakan Pramuka Indonesia?",
            "Siapa Bapak Pramuka Indonesia?",
            "Berapa jumlah kaki pada lambang kelapa pramuka?"
        ];
    } else if (level === 'Penggalang') {
        questions = [
            "Sebutkan Dasa Darma Pramuka ke-2!",
            "Sebutkan isi dari Tri Satya Pramuka Indonesia!",
            "Siapakah pendiri gerakan kepanduan dunia (Bapak Pandu Dunia)?",
            "Apa nama sandi yang menggunakan titik dan garis?"
        ];
    } else if (level === 'Penegak') {
        questions = [
            "Dalam kepramukaan, apa singkatan dari Saka?",
            "Sebutkan minimal 3 nama Satuan Karya (Saka) nasional!",
            "Kapan Hari Pramuka diperingati setiap tahunnya di Indonesia?",
            "Apa warna dasar pada lambang tanda jabatan Dewan Kerja Penegak Pandega?"
        ];
    } else {
        questions = [
            "Sebutkan arti kiasan dari Tunas Kelapa Pramuka!",
            "Apa tujuan didirikannya gerakan kepramukaan di Indonesia?",
            "Bagaimana cara mengamalkan Dasa Darma ke-10 dalam kehidupan sehari-hari?",
            "Sebutkan nama bumi perkemahan nasional yang terkenal di Jakarta!"
        ];
    }

    const rand = questions[Math.floor(Math.random() * questions.length)];
    window.SKU_CURRENT_QUESTION = rand;
    document.getElementById('sku-question-area').innerText = rand;
};

window.handleSkuSubmit = function(event) {
    if (event && event.preventDefault) event.preventDefault();
    const answer = document.getElementById('sku_jawaban').value.trim();
    if (!answer) return;

    const feedback = document.getElementById('sku-feedback-area');
    const submitForm = document.getElementById('sku-submit-form');
    const nextArea = document.getElementById('sku-next-area');

    let evaluation = "";
    const cleanAns = answer.toLowerCase();

    if (window.SKU_CURRENT_QUESTION.includes("Dwidarma")) {
        if (cleanAns.includes("siaga berbakti") || cleanAns.includes("ayah") || cleanAns.includes("bunda")) {
            evaluation = "💥 **SANGAT TEPAT!** Dwidarma ke-1 berbunyi: *Siaga berbakti kepada ayah bundanya.* Kakak luar biasa!";
        } else {
            evaluation = "💡 **KURANG TEPAT.** Dwidarma ke-1 adalah: *Siaga berbakti kepada ayah bundanya.* Terus belajar ya Kak!";
        }
    } else if (window.SKU_CURRENT_QUESTION.includes("lambang utama")) {
        if (cleanAns.includes("tunas") || cleanAns.includes("kelapa") || cleanAns.includes("nyiur")) {
            evaluation = "💥 **TEPAT SEKALI!** Lambang utama Gerakan Pramuka adalah **Tunas Kelapa** ciptaan Kak Sunardjo Atmodipuro.";
        } else {
            evaluation = "💡 Lambang utama yang benar adalah **Tunas Kelapa**.";
        }
    } else if (window.SKU_CURRENT_QUESTION.includes("Bapak Pramuka Indonesia")) {
        if (cleanAns.includes("sri sultan") || cleanAns.includes("hamengkubuwono") || cleanAns.includes("ix") || cleanAns.includes("9")) {
            evaluation = "💥 **HEBAT!** Bapak Pramuka Indonesia adalah **Sri Sultan Hamengkubuwono IX**.";
        } else {
            evaluation = "💡 Bapak Pramuka Indonesia yang tepat adalah **Sri Sultan Hamengkubuwono IX**.";
        }
    } else if (window.SKU_CURRENT_QUESTION.includes("Dasa Darma")) {
        if (cleanAns.includes("cinta alam") || cleanAns.includes("kasih sayang") || cleanAns.includes("manusia")) {
            evaluation = "💥 **LUAR BIASA!** Dasa Darma ke-2 berbunyi: *Cinta alam dan kasih sayang sesama manusia.*";
        } else {
            evaluation = "💡 Dasa Darma ke-2 berbunyi: *Cinta alam dan kasih sayang sesama manusia.*";
        }
    } else if (window.SKU_CURRENT_QUESTION.includes("Tri Satya")) {
        if (cleanAns.includes("tuhan") || cleanAns.includes("pancasila") || cleanAns.includes("nkri") || cleanAns.includes("dharma")) {
            evaluation = "💥 **LULUS!** Kakak menyebutkan poin-poin Tri Satya dengan baik.";
        } else {
            evaluation = "💡 Tri Satya mengandung janji setia kepada Tuhan, NKRI, Pancasila, menolong sesama, dan menepati Dasa Darma.";
        }
    } else if (window.SKU_CURRENT_QUESTION.includes("Bapak Pandu Dunia")) {
        if (cleanAns.includes("baden") || cleanAns.includes("powell")) {
            evaluation = "💥 **100 PERSEN BENAR!** Beliau adalah **Lord Robert Baden Powell**.";
        } else {
            evaluation = "💡 Tokoh pendiri kepanduan dunia yang tepat adalah **Lord Baden Powell**.";
        }
    } else if (window.SKU_CURRENT_QUESTION.includes("sandi") && window.SKU_CURRENT_QUESTION.includes("titik")) {
        if (cleanAns.includes("morse")) {
            evaluation = "💥 **BENAR!** Sandi yang menggunakan kombinasi titik dan garis adalah **Sandi Morse**.";
        } else {
            evaluation = "💡 Jawabannya adalah **Sandi Morse**.";
        }
    } else if (cleanAns.length > 5) {
        evaluation = `💥 **EVALUASI KAKAK PEMBINA AI:** Jawaban Kakak (*"${answer}"*) sangat berbobot dan menunjukkan pemahaman dasar pramuka yang berkarakter!`;
    } else {
        evaluation = "💡 **PANDUAN PEMBINA AI:** Jawaban Kakak terlalu singkat. Cobalah jelaskan lebih rinci lagi.";
    }

    feedback.innerHTML = `
        <span class="block text-[9px] font-bold text-amber-600 uppercase mb-1"><i class="fa-solid fa-square-poll-vertical"></i> Evaluasi Kakak Pembina AI</span>
        <p class="text-xs text-gray-700 leading-relaxed font-semibold">${evaluation}</p>
    `;
    feedback.classList.remove('hidden');
    submitForm.classList.add('hidden');
    nextArea.classList.remove('hidden');
};

window.openSkuModal = function() {
    document.getElementById('sku-setup-screen').classList.remove('hidden');
    document.getElementById('sku-play-screen').classList.add('hidden');
    document.getElementById('skuAiModal').classList.remove('hidden');
};

window.closeSkuModal = function() {
    document.getElementById('skuAiModal').classList.add('hidden');
};

window.showNotification = function(title, msg, isSuccess) {
    const modal = document.getElementById('scoutModal');
    const icon = document.getElementById('modalIcon');
    const iconContainer = document.getElementById('modalIconContainer');
    const titleEl = document.getElementById('modalTitle');
    const msgEl = document.getElementById('modalMessage');

    if (modal && icon && iconContainer && titleEl && msgEl) {
        titleEl.innerText = title;
        msgEl.innerText = msg;
        if (isSuccess) {
            iconContainer.className = 'w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl mx-auto mb-4';
            icon.className = 'fa-solid fa-circle-check text-green-600';
        } else {
            iconContainer.className = 'w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-xl mx-auto mb-4';
            icon.className = 'fa-solid fa-triangle-exclamation text-red-600';
        }
        modal.classList.remove('hidden');
    }
};

window.closeModal = function() {
    const modal = document.getElementById('scoutModal');
    if (modal) modal.classList.add('hidden');
};

window.toggleMobileMenu = function() {
    const sidebar = document.getElementById('mobileSidebar');
    const content = document.getElementById('mobileSidebarContent');
    if (!sidebar || !content) return;
    
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        setTimeout(() => {
            sidebar.classList.add('opacity-100');
            content.classList.remove('-translate-x-full');
        }, 50);
    } else {
        content.classList.add('-translate-x-full');
        sidebar.classList.remove('opacity-100');
        setTimeout(() => {
            sidebar.classList.add('hidden');
        }, 300);
    }
};

// Event Listener DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.mobile-accordion-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const subMenu = this.nextElementSibling;
            const chevron = this.querySelector('.fa-chevron-down');
            if (subMenu && subMenu.classList.contains('hidden')) {
                subMenu.classList.remove('hidden');
                if (chevron) chevron.style.transform = 'rotate(180deg)';
            } else if (subMenu) {
                subMenu.classList.add('hidden');
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            }
        });
    });

    const mBtn = document.getElementById('mobileMenuBtn');
    const closeMBtn = document.getElementById('closeMobileMenuBtn');
    if (mBtn) mBtn.addEventListener('click', window.toggleMobileMenu);
    if (closeMBtn) closeMBtn.addEventListener('click', window.toggleMobileMenu);

    let initialPage = 'home';
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
        const cleanHash = hash.substring(1);
        const t = document.getElementById('template-' + cleanHash);
        if (t) initialPage = cleanHash;
    }

    window.navigateTo(initialPage);
});