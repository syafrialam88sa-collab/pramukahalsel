/**
 * SISTEM INFORMASI & PORTAL LAYANAN TERPADU - KWARCAB HALMAHERA SELATAN
 * Berkas Utama Logika JavaScript (function.js)
 */

window.CURRENT_PAGE = 'home';
window.CURRENT_ADMIN_TAB = 'gudep';

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
if (!localStorage.getItem('scout_events')) localStorage.setItem('scout_events', JSON.stringify([]));
if (!localStorage.getItem('scout_gudep')) localStorage.setItem('scout_gudep', JSON.stringify([]));
if (!localStorage.getItem('scout_saka')) localStorage.setItem('scout_saka', JSON.stringify([]));
if (!localStorage.getItem('scout_database')) localStorage.setItem('scout_database', JSON.stringify([]));
if (!localStorage.getItem('scout_sertifikasi')) localStorage.setItem('scout_sertifikasi', JSON.stringify([]));
if (!localStorage.getItem('scout_awards')) localStorage.setItem('scout_awards', JSON.stringify([]));

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

        if (pageId === 'home') window.renderSlideshowCarousel();
        if (pageId === 'database') window.renderDatabaseTable();
        if (pageId === 'database-ranting') window.renderDatabaseRantingTable();
        if (pageId === 'admin-dashboard') window.renderAdminTab(window.CURRENT_ADMIN_TAB);
        if (pageId === 'sejarah') document.getElementById('pub-sejarah-container').innerText = localStorage.getItem('scout_sejarah');
        if (pageId === 'visi-misi') document.getElementById('pub-visimisi-container').innerText = localStorage.getItem('scout_visimisi');
        if (pageId === 'pengurus') window.renderPublicPengurus();
        if (pageId === 'chief') window.renderPublicChiefs();
        if (pageId === 'in-memoriam') window.renderPublicMemoriam();
        if (pageId === 'event') window.renderPublicEvents();
        if (pageId === 'reg-anggota') window.populateKecamatanDropdown('reg_ranting');
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
 * Render Tabs di Dashboard Dapur Admin
 */
window.renderAdminTab = function(tabId) {
    window.CURRENT_ADMIN_TAB = tabId;
    document.querySelectorAll('.tab-btn').forEach(b => b.className = 'tab-btn px-3 py-2 text-xs font-bold rounded bg-gray-100 text-gray-700');
    const activeBtn = document.getElementById('btn-tab-' + tabId);
    if (activeBtn) activeBtn.className = 'tab-btn px-3 py-2 text-xs font-extrabold rounded bg-pramukaGreen text-white shadow';

    const area = document.getElementById('admin-tab-content-area');
    if (!area) return;

    if (tabId === 'profil') {
        area.innerHTML = `
            <div class="space-y-6">
                <h4 class="font-bold text-gray-800 text-xs border-b pb-2 uppercase"><i class="fa-solid fa-filter"></i> Filter Kelola Profil</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] font-bold uppercase mb-1">Pilih Kategori Profil</label>
                        <select id="admin_profil_filter" onchange="window.renderProfileFormSection()" class="w-full border p-2 rounded text-xs bg-white">
                            <option value="pengurus">Pengurus</option>
                            <option value="chief">Chief (Ketua Kwarcab)</option>
                            <option value="memoriam">In Memoriam</option>
                            <option value="narasi">Sejarah & Visi Misi</option>
                        </select>
                    </div>
                </div>
                <div id="admin-profile-form-container" class="pt-4 border-t"></div>
            </div>
        `;
        window.renderProfileFormSection();
    } else if (tabId === 'event') {
        area.innerHTML = `
            <div class="space-y-4">
                <h4 class="font-bold text-gray-800 text-xs border-b pb-2 uppercase"><i class="fa-solid fa-calendar-days"></i> Kelola Jadwal Event</h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input type="text" id="ev_title" class="border p-2 text-xs rounded" placeholder="Nama Event">
                    <input type="date" id="ev_date" class="border p-2 text-xs rounded">
                    <input type="text" id="ev_location" class="border p-2 text-xs rounded" placeholder="Lokasi">
                </div>
                <textarea id="ev_desc" class="w-full border p-2 text-xs rounded" rows="2" placeholder="Deskripsi Event..."></textarea>
                <button onclick="window.saveAdminEvent()" class="bg-pramukaGreen text-white px-4 py-2 rounded text-xs">Tambah Event</button>
                <div id="admin-event-list" class="space-y-2 pt-4 border-t"></div>
            </div>
        `;
        window.renderAdminEventList();
    } else if (tabId === 'slideshow') {
        area.innerHTML = `
            <div class="space-y-4">
                <h4 class="font-bold text-gray-800 text-xs border-b pb-2 uppercase"><i class="fa-solid fa-images"></i> Kelola Tampilan Slideshow Teras</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" id="slide_title" class="border p-2 text-xs rounded" placeholder="Judul Kegiatan / Keterangan Slide">
                    <input type="file" id="slide_file" accept="image/*" class="border p-1 text-xs rounded bg-white">
                </div>
                <button onclick="window.saveAdminSlide()" class="bg-pramukaGreen text-white px-4 py-2 rounded text-xs">Tambah Slide Teras</button>
                <div id="admin-slide-list" class="space-y-2 pt-4 border-t"></div>
            </div>
        `;
        window.renderAdminSlideList();
    } else {
        area.innerHTML = `<p class="text-xs text-gray-500">Modul ${tabId} aktif.</p>`;
    }
};

window.renderProfileFormSection = function() {
    const filterVal = document.getElementById('admin_profil_filter')?.value || 'pengurus';
    const container = document.getElementById('admin-profile-form-container');
    if (!container) return;

    if (filterVal === 'pengurus') {
        container.innerHTML = `
            <h5 class="font-bold text-xs text-pramukaGreen mb-3">Tambah / Kelola Pengurus</h5>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <input type="text" id="p_nama" class="border p-2 text-xs rounded" placeholder="Nama Lengkap">
                <input type="text" id="p_jabatan" class="border p-2 text-xs rounded" placeholder="Jabatan">
                <input type="file" id="p_foto" class="border p-1 text-xs rounded bg-white">
            </div>
            <button onclick="window.saveAdminItem('pengurus')" class="bg-pramukaGreen text-white px-4 py-2 rounded text-xs mb-4">Simpan Pengurus</button>
            <div id="admin-pengurus-list" class="space-y-2"></div>
        `;
        window.renderAdminList('pengurus');
    } else if (filterVal === 'chief') {
        container.innerHTML = `
            <h5 class="font-bold text-xs text-pramukaGreen mb-3">Tambah / Kelola Chief</h5>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <input type="text" id="c_nama" class="border p-2 text-xs rounded" placeholder="Nama Chief">
                <input type="text" id="c_periode" class="border p-2 text-xs rounded" placeholder="Periode">
                <input type="file" id="c_foto" class="border p-1 text-xs rounded bg-white">
            </div>
            <button onclick="window.saveAdminItem('chief')" class="bg-pramukaGreen text-white px-4 py-2 rounded text-xs mb-4">Simpan Chief</button>
            <div id="admin-chief-list" class="space-y-2"></div>
        `;
        window.renderAdminList('chief');
    } else if (filterVal === 'memoriam') {
        container.innerHTML = `
            <h5 class="font-bold text-xs text-pramukaGreen mb-3">Tambah / Kelola In Memoriam</h5>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <input type="text" id="m_nama" class="border p-2 text-xs rounded" placeholder="Nama Tokoh">
                <input type="text" id="m_waktu" class="border p-2 text-xs rounded" placeholder="Waktu / Tanggal Meninggal">
                <input type="file" id="m_foto" class="border p-1 text-xs rounded bg-white">
            </div>
            <button onclick="window.saveAdminItem('memoriam')" class="bg-pramukaGreen text-white px-4 py-2 rounded text-xs mb-4">Simpan In Memoriam</button>
            <div id="admin-memoriam-list" class="space-y-2"></div>
        `;
        window.renderAdminList('memoriam');
    } else if (filterVal === 'narasi') {
        container.innerHTML = `
            <h5 class="font-bold text-xs text-pramukaGreen mb-3">Kelola Sejarah & Visi Misi</h5>
            <div class="space-y-3">
                <textarea id="adm_sejarah" class="w-full border p-2 rounded text-xs" rows="3" placeholder="Sejarah...">${localStorage.getItem('scout_sejarah') || ''}</textarea>
                <textarea id="adm_visimisi" class="w-full border p-2 rounded text-xs" rows="3" placeholder="Visi Misi...">${localStorage.getItem('scout_visimisi') || ''}</textarea>
                <button onclick="window.saveAdminNarasi()" class="bg-pramukaGreen text-white px-4 py-2 rounded text-xs">Simpan Narasi</button>
            </div>
        `;
    }
};

window.saveAdminItem = function(type) {
    if (type === 'pengurus') {
        const nama = document.getElementById('p_nama').value;
        const jabatan = document.getElementById('p_jabatan').value;
        const fileInput = document.getElementById('p_foto').files[0];
        if (!nama || !jabatan) return window.showNotification("Gagal", "Lengkapi form", false);
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const list = JSON.parse(localStorage.getItem('scout_pengurus')) || [];
            list.push({ nama, jabatan, url: e.target.result });
            localStorage.setItem('scout_pengurus', JSON.stringify(list));
            window.renderAdminList('pengurus');
            window.showNotification("Sukses", "Pengurus disimpan", true);
        };
        if (fileInput) reader.readAsDataURL(fileInput);
        else {
            const list = JSON.parse(localStorage.getItem('scout_pengurus')) || [];
            list.push({ nama, jabatan, url: '' });
            localStorage.setItem('scout_pengurus', JSON.stringify(list));
            window.renderAdminList('pengurus');
        }
    } else if (type === 'chief') {
        const nama = document.getElementById('c_nama').value;
        const periode = document.getElementById('c_periode').value;
        const fileInput = document.getElementById('c_foto').files[0];
        if (!nama) return window.showNotification("Gagal", "Lengkapi form", false);

        const reader = new FileReader();
        reader.onload = function(e) {
            const list = JSON.parse(localStorage.getItem('scout_chiefs')) || [];
            list.push({ nama, periode, url: e.target.result });
            localStorage.setItem('scout_chiefs', JSON.stringify(list));
            window.renderAdminList('chief');
            window.showNotification("Sukses", "Chief disimpan", true);
        };
        if (fileInput) reader.readAsDataURL(fileInput);
        else {
            const list = JSON.parse(localStorage.getItem('scout_chiefs')) || [];
            list.push({ nama, periode, url: '' });
            localStorage.setItem('scout_chiefs', JSON.stringify(list));
            window.renderAdminList('chief');
        }
    } else if (type === 'memoriam') {
        const nama = document.getElementById('m_nama').value;
        const waktu = document.getElementById('m_waktu').value;
        const fileInput = document.getElementById('m_foto').files[0];
        if (!nama) return window.showNotification("Gagal", "Lengkapi form", false);

        const reader = new FileReader();
        reader.onload = function(e) {
            const list = JSON.parse(localStorage.getItem('scout_memoriam')) || [];
            list.push({ nama, waktu_kematian: waktu, url: e.target.result });
            localStorage.setItem('scout_memoriam', JSON.stringify(list));
            window.renderAdminList('memoriam');
            window.showNotification("Sukses", "In Memoriam disimpan", true);
        };
        if (fileInput) reader.readAsDataURL(fileInput);
        else {
            const list = JSON.parse(localStorage.getItem('scout_memoriam')) || [];
            list.push({ nama, waktu_kematian: waktu, url: '' });
            localStorage.setItem('scout_memoriam', JSON.stringify(list));
            window.renderAdminList('memoriam');
        }
    }
};

window.renderAdminList = function(type) {
    let key = type === 'pengurus' ? 'scout_pengurus' : (type === 'chief' ? 'scout_chiefs' : 'scout_memoriam');
    let containerId = type === 'pengurus' ? 'admin-pengurus-list' : (type === 'chief' ? 'admin-chief-list' : 'admin-memoriam-list');
    const container = document.getElementById(containerId);
    if (!container) return;

    const list = JSON.parse(localStorage.getItem(key)) || [];
    container.innerHTML = list.map((item, idx) => `
        <div class="flex justify-between items-center border p-2 rounded bg-gray-50">
            <span>${item.nama} (${item.jabatan || item.periode || item.waktu_kematian || ''})</span>
            <button onclick="window.deleteAdminItem('${key}', ${idx}, '${type}')" class="text-red-600 font-bold">Hapus</button>
        </div>
    `).join('');
};

window.deleteAdminItem = function(key, idx, type) {
    const list = JSON.parse(localStorage.getItem(key)) || [];
    list.splice(idx, 1);
    localStorage.setItem(key, JSON.stringify(list));
    window.renderAdminList(type);
    window.showNotification("Sukses", "Data dihapus", true);
};

window.saveAdminNarasi = function() {
    localStorage.setItem('scout_sejarah', document.getElementById('adm_sejarah').value);
    localStorage.setItem('scout_visimisi', document.getElementById('adm_visimisi').value);
    window.showNotification("Sukses", "Narasi berhasil disimpan", true);
};

window.saveAdminEvent = function() {
    const title = document.getElementById('ev_title').value;
    const date = document.getElementById('ev_date').value;
    const location = document.getElementById('ev_location').value;
    const desc = document.getElementById('ev_desc').value;
    if (!title || !date) return window.showNotification("Gagal", "Judul dan Tanggal wajib diisi", false);

    const list = JSON.parse(localStorage.getItem('scout_events')) || [];
    list.push({ title, date, location, desc });
    localStorage.setItem('scout_events', JSON.stringify(list));
    window.renderAdminEventList();
    window.showNotification("Sukses", "Event berhasil ditambahkan", true);
};

window.renderAdminEventList = function() {
    const container = document.getElementById('admin-event-list');
    if (!container) return;
    const list = JSON.parse(localStorage.getItem('scout_events')) || [];
    container.innerHTML = list.map((ev, idx) => `
        <div class="flex justify-between items-center border p-2 rounded bg-gray-50">
            <div><strong>${ev.title}</strong> - ${ev.date} (${ev.location})</div>
            <button onclick="window.deleteEvent(${idx})" class="text-red-600 font-bold">Hapus</button>
        </div>
    `).join('');
};

window.deleteEvent = function(idx) {
    const list = JSON.parse(localStorage.getItem('scout_events')) || [];
    list.splice(idx, 1);
    localStorage.setItem('scout_events', JSON.stringify(list));
    window.renderAdminEventList();
    window.showNotification("Sukses", "Event dihapus", true);
};

window.saveAdminSlide = function() {
    const title = document.getElementById('slide_title').value;
    const fileInput = document.getElementById('slide_file').files[0];
    if (!title) return window.showNotification("Gagal", "Judul slide wajib diisi", false);

    const reader = new FileReader();
    reader.onload = function(e) {
        const list = JSON.parse(localStorage.getItem('scout_slideshow')) || [];
        list.push({ title, url: e.target.result });
        localStorage.setItem('scout_slideshow', JSON.stringify(list));
        window.renderAdminSlideList();
        window.showNotification("Sukses", "Slide berhasil ditambahkan", true);
    };
    if (fileInput) reader.readAsDataURL(fileInput);
    else {
        const list = JSON.parse(localStorage.getItem('scout_slideshow')) || [];
        list.push({ title, url: 'https://placehold.co/1200x500/2d5a27/ffffff?text=' + encodeURIComponent(title) });
        localStorage.setItem('scout_slideshow', JSON.stringify(list));
        window.renderAdminSlideList();
        window.showNotification("Sukses", "Slide berhasil ditambahkan", true);
    }
};

window.renderAdminSlideList = function() {
    const container = document.getElementById('admin-slide-list');
    if (!container) return;
    const list = JSON.parse(localStorage.getItem('scout_slideshow')) || [];
    container.innerHTML = list.map((s, idx) => `
        <div class="flex justify-between items-center border p-2 rounded bg-gray-50">
            <span>${s.title}</span>
            <button onclick="window.deleteSlide(${idx})" class="text-red-600 font-bold">Hapus</button>
        </div>
    `).join('');
};

window.deleteSlide = function(idx) {
    const list = JSON.parse(localStorage.getItem('scout_slideshow')) || [];
    list.splice(idx, 1);
    localStorage.setItem('scout_slideshow', JSON.stringify(list));
    window.renderAdminSlideList();
    window.showNotification("Sukses", "Slide dihapus", true);
};

window.renderSlideshowCarousel = function() {
    const container = document.getElementById('slideshow-container');
    const indicators = document.getElementById('slideshow-indicators');
    if (!container) return;

    const list = JSON.parse(localStorage.getItem('scout_slideshow')) || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="text-white/70 text-center p-6"><i class="fa-solid fa-flag-checkered text-4xl text-pramukaGold mb-2"></i><h3 class="text-lg font-bold">Kwartir Cabang Halmahera Selatan</h3><p class="text-xs text-gray-300">Portal Layanan Administrasi Terpadu Anggota Pramuka</p></div>`;
        if (indicators) indicators.innerHTML = '';
        return;
    }

    let currentIdx = 0;
    const updateSlide = () => {
        container.innerHTML = `
            <img src="${list[currentIdx].url}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <h4 class="text-white font-bold text-base sm:text-xl drop-shadow">${list[currentIdx].title}</h4>
            </div>
        `;
        if (indicators) {
            indicators.innerHTML = list.map((_, i) => `<span class="w-2.5 h-2.5 rounded-full ${i === currentIdx ? 'bg-pramukaGold w-6' : 'bg-white/50'} transition-all"></span>`).join('');
        }
    };

    updateSlide();
    if (list.length > 1) {
        setInterval(() => {
            currentIdx = (currentIdx + 1) % list.length;
            updateSlide();
        }, 4000);
    }
};

window.renderPublicEvents = function() {
    const container = document.getElementById('public-event-container');
    if (!container) return;
    const list = JSON.parse(localStorage.getItem('scout_events')) || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-8 text-gray-400 text-xs">Belum ada agenda event yang dipublikasikan.</div>`;
        return;
    }
    container.innerHTML = list.map(ev => `
        <div class="bg-white rounded-xl shadow p-5 border flex flex-col justify-between">
            <div>
                <span class="text-[10px] text-pramukaGreen font-bold uppercase"><i class="fa-regular fa-calendar mr-1"></i>${ev.date}</span>
                <h4 class="font-bold text-gray-800 text-sm mt-1 mb-2">${ev.title}</h4>
                <p class="text-xs text-gray-500 mb-4">${ev.desc}</p>
            </div>
            <span class="text-[10px] text-gray-400 font-semibold"><i class="fa-solid fa-location-dot mr-1 text-pramukaGold"></i>${ev.location}</span>
        </div>
    `).join('');
};

window.renderPublicPengurus = function() {
    const container = document.getElementById('pub-pengurus-container');
    if (!container) return;
    const list = JSON.parse(localStorage.getItem('scout_pengurus')) || [];
    container.innerHTML = list.length === 0 ? `<p class="col-span-full text-xs text-gray-400">Belum ada data pengurus.</p>` :
        list.map(p => `
            <div class="bg-white rounded-xl p-4 shadow border text-center">
                <img src="${p.url || 'https://placehold.co/150x200/2d5a27/ffffff?text=Pengurus'}" class="w-24 h-32 object-cover rounded mx-auto mb-3">
                <h4 class="font-bold text-xs text-gray-800">${p.nama}</h4>
                <span class="text-[10px] text-gray-500 block uppercase font-semibold mt-1">${p.jabatan}</span>
            </div>
        `).join('');
};

window.renderPublicChiefs = function() {
    const container = document.getElementById('pub-chief-container');
    if (!container) return;
    const list = JSON.parse(localStorage.getItem('scout_chiefs')) || [];
    container.innerHTML = list.length === 0 ? `<p class="col-span-full text-xs text-gray-400">Belum ada data chief.</p>` :
        list.map(c => `
            <div class="bg-white rounded-xl p-4 shadow border text-center">
                <img src="${c.url || 'https://placehold.co/150x200/2d5a27/ffffff?text=Chief'}" class="w-24 h-32 object-cover rounded mx-auto mb-3">
                <h4 class="font-bold text-xs text-gray-800">${c.nama}</h4>
                <span class="text-[10px] text-gray-500 block uppercase font-semibold mt-1">Periode: ${c.periode}</span>
            </div>
        `).join('');
};

window.renderPublicMemoriam = function() {
    const container = document.getElementById('pub-memoriam-container');
    if (!container) return;
    const list = JSON.parse(localStorage.getItem('scout_memoriam')) || [];
    container.innerHTML = list.length === 0 ? `<p class="col-span-full text-xs text-gray-400">Belum ada data.</p>` :
        list.map(m => `
            <div class="bg-white rounded-xl p-4 shadow border text-center">
                <img src="${m.url || 'https://placehold.co/150x200/2d5a27/ffffff?text=Memoriam'}" class="w-24 h-32 object-cover rounded mx-auto mb-3">
                <h4 class="font-bold text-xs text-gray-800">${m.nama}</h4>
                <span class="text-[10px] text-gray-500 block font-semibold mt-1">Wafat: ${m.waktu_kematian}</span>
            </div>
        `).join('');
};
