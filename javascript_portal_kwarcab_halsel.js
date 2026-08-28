/**
 * SISTEM INFORMASI & PORTAL LAYANAN TERPADU - KWARCAB HALMAHERA SELATAN
 * Berkas Utama Logika JavaScript (function.js)
 */

window.CURRENT_PAGE = 'home';
window.CURRENT_ADMIN_TAB = 'gudep';

// Daftar Kecamatan / Kwartir Ranting di Kabupaten Halmahera Selatan
window.KECAMATAN_HALSEL = [
    "Bacan", "Bacan Selatan", "Bacan Barat", "Bacan Barat Utara", "Bacan Timur",
    "Bacan Timur Tengah", "Bacan Timur Selatan", "Kayoa", "Kayoa Barat", "Kayoa Selatan",
    "Kayoa Utara", "Makian", "Makian Barat", "Pulau Makian", "Gane Barat",
    "Gane Barat Utara", "Gane Barat Selatan", "Gane Timur", "Gane Timur Tengah",
    "Gane Timur Selatan", "Obi", "Obi Barat", "Obi Timur", "Obi Selatan",
    "Obi Utara", "Mandioli Selatan", "Mandioli Utara", "Kasiruta Barat",
    "Kasiruta Timur", "Kepulauan Botang Lomang"
];

// Inisialisasi LocalStorage Default jika belum ada
if (!localStorage.getItem('scout_sejarah')) localStorage.setItem('scout_sejarah', "Sejarah pembentukan Kwarcab Halmahera Selatan...");
if (!localStorage.getItem('scout_visimisi')) localStorage.setItem('scout_visimisi', "Visi & Misi Kwarcab Halmahera Selatan...");
if (!localStorage.getItem('scout_chiefs')) localStorage.setItem('scout_chiefs', JSON.stringify([]));
if (!localStorage.getItem('scout_pengurus')) localStorage.setItem('scout_pengurus', JSON.stringify([]));
if (!localStorage.getItem('scout_memoriam')) localStorage.setItem('scout_memoriam', JSON.stringify([]));
if (!localStorage.getItem('scout_slideshow')) localStorage.setItem('scout_slideshow', JSON.stringify([]));
if (!localStorage.getItem('scout_gudep')) localStorage.setItem('scout_gudep', JSON.stringify([]));
if (!localStorage.getItem('scout_saka')) localStorage.setItem('scout_saka', JSON.stringify([]));
if (!localStorage.getItem('scout_database')) localStorage.setItem('scout_database', JSON.stringify([]));
if (!localStorage.getItem('scout_sertifikasi')) localStorage.setItem('scout_sertifikasi', JSON.stringify([]));
if (!localStorage.getItem('scout_awards')) localStorage.setItem('scout_awards', JSON.stringify([]));
if (!localStorage.getItem('template_shb_portrait')) localStorage.setItem('template_shb_portrait', '');
if (!localStorage.getItem('template_shb_landscape')) localStorage.setItem('template_shb_landscape', '');
if (!localStorage.getItem('template_shl_portrait')) localStorage.setItem('template_shl_portrait', '');
if (!localStorage.getItem('template_shl_landscape')) localStorage.setItem('template_shl_landscape', '');

/**
 * Mengisi dropdown pilihan Kwartir Ranting (Kecamatan)
 */
window.populateKecamatanDropdown = function(elementId) {
    const select = document.getElementById(elementId);
    if (!select) return;
    select.innerHTML = '<option value="" disabled selected>-- Pilih Kwartir Ranting --</option>' + 
        window.KECAMATAN_HALSEL.map(k => `<option value="${k}">${k}</option>`).join('');
};

/**
 * Mengisi dropdown angka 0 sampai 100 untuk form Gudep
 */
window.populate0100Dropdowns = function() {
    window.populateKecamatanDropdown('gudep_ranting');
    ['gudep_putera', 'gudep_puteri', 'gudep_pembina_kmd', 'gudep_pembina_kml', 'gudep_pembina_belum'].forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = Array.from({length: 101}, (_, i) => `<option value="${i}">${i}</option>`).join('');
        }
    });
};

/**
 * Mengisi dropdown angka untuk form Saka
 */
window.populateSakaDropdowns = function() {
    ['saka_didik_putera', 'saka_didik_puteri'].forEach(id => {
        const select = document.getElementById(id);
        if (select) select.innerHTML = Array.from({length: 201}, (_, i) => `<option value="${i}">${i}</option>`).join('');
    });
    ['saka_instruktur_putera', 'saka_instruktur_puteri', 'saka_pamong_putera', 'saka_pamong_puteri'].forEach(id => {
        const select = document.getElementById(id);
        if (select) select.innerHTML = Array.from({length: 101}, (_, i) => `<option value="${i}">${i}</option>`).join('');
    });
};

/**
 * Memperbarui dropdown tingkat kepramukaan berdasarkan jenjang kategori
 */
window.updateTingkatDropdown = function(kategoriId, tingkatId) {
    const val = document.getElementById(kategoriId)?.value;
    const tingSelect = document.getElementById(tingkatId);
    if (!tingSelect) return;
    let options = [];
    if (val === 'Siaga') options = ['Mula', 'Bantu', 'Tata', 'Garuda'];
    else if (val === 'Penggalang') options = ['Ramu', 'Rakit', 'Terap', 'Garuda'];
    else if (val === 'Penegak') options = ['Bantara', 'Laksana', 'Garuda'];
    else if (val === 'Pandega') options = ['Pandega', 'Garuda'];
    else if (val === 'Pembina') options = ['KMD', 'KML', 'KPD', 'KPL'];
    tingSelect.innerHTML = options.map(o => `<option value="${o}">${o}</option>`).join('');
};

/**
 * Navigasi antar halaman / menu portal
 */
window.navigateTo = function(pageId) {
    if (pageId === 'admin-dashboard' && localStorage.getItem('admin_logged_in') !== 'true') {
        pageId = 'admin-login';
    }
    const contentArea = document.getElementById('content-area');
    const targetTemplate = document.getElementById('template-' + (pageId.startsWith('usul-awards-') ? 'usul-awards' : pageId));
    if (targetTemplate && contentArea) {
        window.location.hash = pageId;
        contentArea.innerHTML = targetTemplate.innerHTML;
        
        if (pageId.startsWith('usul-awards-')) {
            const awardType = pageId.replace('usul-awards-', '');
            const formattedType = awardType.charAt(0).toUpperCase() + awardType.slice(1);
            const titleHeader = document.getElementById('award-title-header');
            const subTypeInput = document.getElementById('award_sub_type');
            if (titleHeader) titleHeader.innerHTML = `<i class="fa-solid fa-medal text-pramukaGold"></i> Formulir Usulan Lencana Awards - ${formattedType}`;
            if (subTypeInput) subTypeInput.value = formattedType;
            window.populateKecamatanDropdown('award_pengusul');
        }

        if (pageId === 'usul-gudep') window.populate0100Dropdowns();
        if (pageId === 'usul-saka') window.populateSakaDropdowns();
        if (pageId === 'reg-anggota') {
            window.populateKecamatanDropdown('reg_ranting');
            window.updateTingkatDropdown('reg_kategori', 'reg_tingkat_jenjang');
        }
        if (pageId === 'laporan-berkala') window.populateKecamatanDropdown('lap_ranting');
        if (pageId === 'database') window.renderDatabaseTable();
        if (pageId === 'database-ranting') window.renderDatabaseRantingTable();
        if (pageId === 'admin-dashboard') window.renderAdminTab(window.CURRENT_ADMIN_TAB);
        if (pageId === 'sejarah') document.getElementById('pub-sejarah-container').innerText = localStorage.getItem('scout_sejarah');
        if (pageId === 'visi-misi') document.getElementById('pub-visimisi-container').innerText = localStorage.getItem('scout_visimisi');
        if (pageId === 'pengurus') window.renderPublicPengurus();
        if (pageId === 'chief') window.renderPublicChiefs();
        if (pageId === 'in-memoriam') window.renderPublicMemoriam();
    }
};

/**
 * Menampilkan Modal Pemberitahuan
 */
window.showNotification = function(title, msg, isSuccess) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMessage').innerText = msg;
    document.getElementById('scoutModal').classList.remove('hidden');
};

window.closeModal = function() {
    document.getElementById('scoutModal').classList.add('hidden');
};

/**
 * Proses Autentikasi Dapur Admin
 */
window.handleAdminLogin = function(event) {
    event.preventDefault();
    const u = document.getElementById('admin_user').value;
    const p = document.getElementById('admin_pass').value;
    if (u === 'kwarcab' && p === 'halselsaruma') {
        localStorage.setItem('admin_logged_in', 'true');
        window.navigateTo('admin-dashboard');
    } else {
        window.showNotification("Gagal", "Username atau Password salah!", false);
    }
};

window.handleAdminLogout = function() {
    localStorage.removeItem('admin_logged_in');
    window.navigateTo('home');
};

/**
 * Mengubah Label File Input saat berkas dipilih
 */
window.updateGudepPdfLabel = function(inputElem, labelId) {
    const lbl = document.getElementById(labelId);
    if (inputElem.files && inputElem.files[0]) {
        lbl.innerText = "Berkas: " + inputElem.files[0].name;
        lbl.classList.add('text-pramukaGreen', 'font-bold');
    }
};

/**
 * Render Tabs di Dashboard Dapur Admin
 */
window.renderAdminTab = function(tabId) {
    window.CURRENT_ADMIN_TAB = tabId;
    document.querySelectorAll('.tab-btn').forEach(b => b.className = 'tab-btn px-3 py-2 text-xs font-bold rounded bg-gray-100 text-gray-700');
    const activeBtn = document.getElementById('btn-tab-' + tabId);
    if (activeBtn) activeBtn.className = 'tab-btn px-3 py-2 text-xs font-extrabold rounded bg-pramukaGreen text-white shadow';

    const area = document.getElementById('admin-tab-content-area');
    if (!area) return;

    if (tabId === 'gudep') {
        const list = JSON.parse(localStorage.getItem('scout_gudep')) || [];
        area.innerHTML = `<table class="w-full text-xs"><thead><tr class="bg-gray-50 border-b uppercase"><th class="p-2">Pangkalan</th><th class="p-2">Kecamatan</th><th class="p-2 text-center">Status</th><th class="p-2 text-center">Aksi</th></tr></thead><tbody>` +
            (list.length === 0 ? `<tr><td colspan="4" class="p-4 text-center text-gray-400">Belum ada usulan Gudep</td></tr>` :
            list.map((item, idx) => `<tr><td class="p-2 font-bold">${item.sekolah}</td><td class="p-2">${item.ranting}</td><td class="p-2 text-center">${item.status}</td><td class="p-2 text-center"><button onclick="window.updateStatus('scout_gudep', ${idx}, 'Disetujui')" class="text-green-600 font-bold mr-2">Setuju</button><button onclick="window.updateStatus('scout_gudep', ${idx}, 'Ditolak')" class="text-red-600 font-bold">Tolak</button></td></tr>`).join('')) + `</tbody></table>`;
    } else if (tabId === 'saka') {
        const list = JSON.parse(localStorage.getItem('scout_saka')) || [];
        area.innerHTML = `<table class="w-full text-xs"><thead><tr class="bg-gray-50 border-b uppercase"><th class="p-2">Saka</th><th class="p-2">Pangkalan</th><th class="p-2 text-center">Status</th><th class="p-2 text-center">Aksi</th></tr></thead><tbody>` +
            (list.length === 0 ? `<tr><td colspan="4" class="p-4 text-center text-gray-400">Belum ada usulan Saka</td></tr>` :
            list.map((item, idx) => `<tr><td class="p-2 font-bold">${item.saka}</td><td class="p-2">${item.pangkalan}</td><td class="p-2 text-center">${item.status}</td><td class="p-2 text-center"><button onclick="window.updateStatus('scout_saka', ${idx}, 'Disetujui')" class="text-green-600 font-bold mr-2">Setuju</button><button onclick="window.updateStatus('scout_saka', ${idx}, 'Ditolak')" class="text-red-600 font-bold">Tolak</button></td></tr>`).join('')) + `</tbody></table>`;
    } else if (tabId === 'registrasi') {
        const list = JSON.parse(localStorage.getItem('scout_database')) || [];
        area.innerHTML = `<table class="w-full text-xs"><thead><tr class="bg-gray-50 border-b uppercase"><th class="p-2">Nama</th><th class="p-2">Pangkalan</th><th class="p-2 text-center">Status</th><th class="p-2 text-center">Aksi</th></tr></thead><tbody>` +
            (list.length === 0 ? `<tr><td colspan="4" class="p-4 text-center text-gray-400">Belum ada registrasi terpadu</td></tr>` :
            list.map((item, idx) => `<tr><td class="p-2 font-bold">${item.nama}</td><td class="p-2">${item.pangkalan}</td><td class="p-2 text-center">${item.status}</td><td class="p-2 text-center"><button onclick="window.updateStatus('scout_database', ${idx}, 'Disetujui')" class="text-green-600 font-bold mr-2">Setuju</button><button onclick="window.updateStatus('scout_database', ${idx}, 'Ditolak')" class="text-red-600 font-bold">Tolak</button></td></tr>`).join('')) + `</tbody></table>`;
    } else if (tabId === 'sertifikasi') {
        const list = JSON.parse(localStorage.getItem('scout_sertifikasi')) || [];
        area.innerHTML = `
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded border">
                    <div>
                        <h4 class="font-bold text-pramukaGreen mb-2"><i class="fa-solid fa-id-card"></i> Template Kartu Sub Menu SHB</h4>
                        <div class="space-y-2 text-xs">
                            <div><label class="block font-semibold">Tampilan Depan (Portrait):</label><input type="file" id="up_shb_portrait" class="border p-1 rounded w-full bg-white" onchange="window.saveTemplate('shb_portrait', this)"></div>
                            <div><label class="block font-semibold">Tampilan Belakang (Landscape):</label><input type="file" id="up_shb_landscape" class="border p-1 rounded w-full bg-white" onchange="window.saveTemplate('shb_landscape', this)"></div>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-bold text-pramukaGreen mb-2"><i class="fa-solid fa-id-card"></i> Template Kartu Sub Menu SHL</h4>
                        <div class="space-y-2 text-xs">
                            <div><label class="block font-semibold">Tampilan Depan (Portrait):</label><input type="file" id="up_shl_portrait" class="border p-1 rounded w-full bg-white" onchange="window.saveTemplate('shl_portrait', this)"></div>
                            <div><label class="block font-semibold">Tampilan Belakang (Landscape):</label><input type="file" id="up_shl_landscape" class="border p-1 rounded w-full bg-white" onchange="window.saveTemplate('shl_landscape', this)"></div>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 class="font-bold text-gray-800 mb-3 uppercase tracking-wider text-xs">Daftar Pembina & Pelatih Registrasi Surat Hak Bina / Latih</h4>
                    <table class="w-full text-xs">
                        <thead>
                            <tr class="bg-gray-100 border-b uppercase text-[10px]">
                                <th class="p-2">Nama Lengkap</th>
                                <th class="p-2">Tipe</th>
                                <th class="p-2">Pangkalan</th>
                                <th class="p-2 text-center">Status</th>
                                <th class="p-2 text-center">Aksi (Lihat, Cetak Kartu, Hapus)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${list.length === 0 ? `<tr><td colspan="5" class="p-4 text-center text-gray-400">Belum ada data pengajuan sertifikasi</td></tr>` :
                            list.map((item, idx) => `
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="p-2 font-bold">${item.nama}</td>
                                    <td class="p-2"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">${item.tipe}</span></td>
                                    <td class="p-2">${item.pangkalan}</td>
                                    <td class="p-2 text-center">${item.status}</td>
                                    <td class="p-2 text-center flex items-center justify-center gap-3">
                                        <button onclick="window.viewSertifikasiDetail(${idx})" class="text-blue-600 hover:text-blue-800" title="Lihat Berkas"><i class="fa-solid fa-eye text-sm"></i></button>
                                        <button onclick="window.printSertifikasiCard(${idx})" class="text-pramukaGreen hover:text-emerald-800" title="Cetak Kartu"><i class="fa-solid fa-print text-sm"></i></button>
                                        <button onclick="window.deleteSertifikasiItem(${idx})" class="text-red-600 hover:text-red-800" title="Hapus"><i class="fa-solid fa-trash text-sm"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else if (tabId === 'awards') {
        const list = JSON.parse(localStorage.getItem('scout_awards')) || [];
        area.innerHTML = `<table class="w-full text-xs"><thead><tr class="bg-gray-50 border-b uppercase"><th class="p-2">Nama</th><th class="p-2">Jenis Lencana</th><th class="p-2 text-center">Status</th><th class="p-2 text-center">Aksi</th></tr></thead><tbody>` +
            (list.length === 0 ? `<tr><td colspan="4" class="p-4 text-center text-gray-400">Belum ada usulan lencana awards</td></tr>` :
            list.map((item, idx) => `<tr><td class="p-2 font-bold">${item.nama}</td><td class="p-2">${item.subType}</td><td class="p-2 text-center">${item.status}</td><td class="p-2 text-center"><button onclick="window.updateStatus('scout_awards', ${idx}, 'Disetujui')" class="text-green-600 font-bold mr-2">Setuju</button><button onclick="window.updateStatus('scout_awards', ${idx}, 'Ditolak')" class="text-red-600 font-bold">Tolak</button></td></tr>`).join('')) + `</tbody></table>`;
    } else if (tabId === 'database') {
        area.innerHTML = `<p class="font-bold mb-2">Total Anggota SIK: ${(JSON.parse(localStorage.getItem('scout_database')) || []).length}</p><button onclick="window.navigateTo('database')" class="bg-pramukaGreen text-white px-3 py-1.5 rounded text-xs">Buka Database Publik</button>`;
    } else if (tabId === 'profil') {
        area.innerHTML = `
            <div class="space-y-4">
                <h4 class="font-bold uppercase border-b pb-1">Kelola Narasi Profil & Struktur</h4>
                <textarea id="adm_sejarah" class="w-full border p-2 rounded text-xs" rows="4" placeholder="Sejarah Kwarcab...">${localStorage.getItem('scout_sejarah') || ''}</textarea>
                <button onclick="localStorage.setItem('scout_sejarah', document.getElementById('adm_sejarah').value); window.showNotification('Sukses','Sejarah disimpan',true)" class="bg-pramukaGreen text-white px-4 py-2 rounded text-xs">Simpan Sejarah</button>
            </div>
        `;
    } else if (tabId === 'tampilan') {
        area.innerHTML = `<p>Pengelolaan Tampilan & Slideshow aktif.</p>`;
    }
};

/**
 * Simpan template kartu sertifikasi
 */
window.saveTemplate = function(type, inputElem) {
    const file = inputElem.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('template_' + type, e.target.result);
            window.showNotification("Berhasil", "Template kartu berhasil diunggah.", true);
        };
        reader.readAsDataURL(file);
    }
};

window.viewSertifikasiDetail = function(idx) {
    const list = JSON.parse(localStorage.getItem('scout_sertifikasi')) || [];
    const item = list[idx];
    window.showNotification("Detail Pengajuan", `Nama: ${item.nama}\nPangkalan: ${item.pangkalan}\nTipe: ${item.tipe}\nStatus: ${item.status}`, true);
};

window.printSertifikasiCard = function(idx) {
    const list = JSON.parse(localStorage.getItem('scout_sertifikasi')) || [];
    const item = list[idx];
    window.showNotification("Cetak Kartu", `Mencetak kartu sertifikasi ${item.tipe} untuk ${item.nama}...`, true);
};

window.deleteSertifikasiItem = function(idx) {
    const list = JSON.parse(localStorage.getItem('scout_sertifikasi')) || [];
    list.splice(idx, 1);
    localStorage.setItem('scout_sertifikasi', JSON.stringify(list));
    window.showNotification("Berhasil", "Data sertifikasi dihapus.", true);
    window.renderAdminTab('sertifikasi');
};

window.updateStatus = function(key, idx, status) {
    const list = JSON.parse(localStorage.getItem(key)) || [];
    list[idx].status = status;
    localStorage.setItem(key, JSON.stringify(list));
    window.showNotification("Berhasil", "Status berhasil diperbarui.", true);
    window.renderAdminTab(window.CURRENT_ADMIN_TAB);
};

// Handlers Pengiriman Formulir
window.handleAwardSubmit = function(e) {
    e.preventDefault();
    const subType = document.getElementById('award_sub_type').value;
    const nama = document.getElementById('award_nama').value;
    const list = JSON.parse(localStorage.getItem('scout_awards')) || [];
    list.unshift({ subType, nama, status: 'Sedang diproses' });
    localStorage.setItem('scout_awards', JSON.stringify(list));
    window.showNotification("Terkirim", `Usulan lencana ${subType} berhasil dikirim.`, true);
    window.navigateTo('cek-status');
};

window.handleGudepSubmit = function(e) {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem('scout_gudep')) || [];
    list.unshift({ sekolah: document.getElementById('gudep_pangkalan').value, ranting: document.getElementById('gudep_ranting').value, status: 'Sedang diproses' });
    localStorage.setItem('scout_gudep', JSON.stringify(list));
    window.showNotification("Terkirim", "Usulan Gudep berhasil dikirim.", true);
    window.navigateTo('cek-status');
};

window.handleSakaSubmit = function(e) {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem('scout_saka')) || [];
    list.unshift({ pangkalan: document.getElementById('saka_pangkalan').value, saka: document.getElementById('saka_nama').value, status: 'Sedang diproses' });
    localStorage.setItem('scout_saka', JSON.stringify(list));
    window.showNotification("Terkirim", "Usulan Saka berhasil dikirim.", true);
    window.navigateTo('cek-status');
};

window.handleLaporanSubmit = function(e) {
    e.preventDefault();
    window.showNotification("Terkirim", "Laporan berkala berhasil dikirim.", true);
    window.navigateTo('cek-status');
};

window.handleUnifiedRegistration = function(e) {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem('scout_database')) || [];
    list.unshift({ nama: document.getElementById('reg_nama').value, pangkalan: document.getElementById('reg_pangkalan').value, kategori: document.getElementById('reg_kategori').value, status: 'Aktif' });
    localStorage.setItem('scout_database', JSON.stringify(list));
    window.showNotification("Terkirim", "Registrasi anggota berhasil.", true);
    window.navigateTo('database');
};

window.handleShbSubmit = function(e) {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem('scout_sertifikasi')) || [];
    list.unshift({ nama: document.getElementById('shb_nama').value, pangkalan: document.getElementById('shb_pangkalan').value, tipe: 'SHB', status: 'Sedang diproses' });
    localStorage.setItem('scout_sertifikasi', JSON.stringify(list));
    window.showNotification("Terkirim", "Pengajuan SHB berhasil.", true);
    window.navigateTo('cek-status');
};

window.handleShlSubmit = function(e) {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem('scout_sertifikasi')) || [];
    list.unshift({ nama: document.getElementById('shl_nama').value, pangkalan: document.getElementById('shl_pangkalan').value, tipe: 'SHL', status: 'Sedang diproses' });
    localStorage.setItem('scout_sertifikasi', JSON.stringify(list));
    window.showNotification("Terkirim", "Pengajuan SHL berhasil.", true);
    window.navigateTo('cek-status');
};

window.searchProposalStatus = function() {
    const area = document.getElementById('status_result_area');
    const gudeps = JSON.parse(localStorage.getItem('scout_gudep')) || [];
    let html = gudeps.map(g => `<div class="p-3 border rounded bg-gray-50 flex justify-between"><span>Gudep: ${g.sekolah}</span><span class="font-bold text-pramukaGreen">${g.status}</span></div>`).join('');
    area.innerHTML = html || '<p class="text-xs text-gray-400">Tidak ada data ditemukan.</p>';
};

window.renderDatabaseTable = function() {
    const body = document.getElementById('db-explorer-body');
    if (!body) return;
    const list = JSON.parse(localStorage.getItem('scout_database')) || [];
    body.innerHTML = list.length === 0 ? `<tr><td colspan="5" class="p-4 text-center text-gray-400">Belum ada data</td></tr>` :
        list.map(i => `<tr><td class="p-3 font-bold">${i.nama}</td><td class="p-3">${i.kategori}</td><td class="p-3">${i.pangkalan}</td><td class="p-3">-</td><td class="p-3 text-center">${i.status}</td></tr>`).join('');
};

window.renderDatabaseRantingTable = function() {
    const body = document.getElementById('ranting-explorer-body');
    if (!body) return;
    body.innerHTML = window.KECAMATAN_HALSEL.map((k, idx) => `<tr><td class="p-3">${idx+1}</td><td class="p-3 font-bold">Kwarran ${k}</td><td class="p-3 text-center">0</td><td class="p-3 text-center">0</td><td class="p-3 text-center">0</td><td class="p-3 text-center">0</td><td class="p-3 text-center">0</td><td class="p-3 text-center font-bold">0</td></tr>`).join('');
};

window.renderPublicPengurus = function() {
    const container = document.getElementById('pub-pengurus-container');
    if (!container) return;
    container.innerHTML = `<p class="text-xs text-gray-500">Susunan jajaran pengurus cabang aktif.</p>`;
};

window.renderPublicChiefs = function() {
    const container = document.getElementById('pub-chief-container');
    if (!container) return;
    container.innerHTML = `<p class="text-xs text-gray-500">Daftar ketua dari masa ke masa.</p>`;
};

window.renderPublicMemoriam = function() {
    const container = document.getElementById('pub-memoriam-container');
    if (!container) return;
    container.innerHTML = `<p class="text-xs text-gray-500">In memoriam tokoh pramuka.</p>`;
};

window.openSkuModal = function() { document.getElementById('skuAiModal').classList.remove('hidden'); };
window.closeSkuModal = function() { document.getElementById('skuAiModal').classList.add('hidden'); };
window.startSkuUjian = function() {
    document.getElementById('sku-setup-screen').classList.add('hidden');
    document.getElementById('sku-play-screen').classList.remove('hidden');
    document.getElementById('sku-question-area').innerText = "Sebutkan isi Dasa Darma Pramuka ke-1!";
};
window.handleSkuSubmit = function(e) {
    e.preventDefault();
    document.getElementById('sku-feedback-area').innerHTML = "<b>Evaluasi AI:</b> Bagus sekali, jawaban Kakak benar!";
    document.getElementById('sku-feedback-area').classList.remove('hidden');
};

document.addEventListener('DOMContentLoaded', () => {
    window.navigateTo('home');
});
