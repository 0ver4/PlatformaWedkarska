/* ==========================================================================
   INITIAL MOCK DATA (GdzieRyba State)
   ========================================================================== */
const INITIAL_FISHERIES = [
    {
        id: 1,
        name: "Łowisko Pod Borem",
        type: "KOMERCYJNE",
        location: "Podlaskie, Knyszyn",
        owner: "Jan Kowalski",
        contact: "601-234-567",
        description: "Piękne, ciche łowisko komercyjne otoczone lasem. Dwa duże stawy obfitujące w karpie, amury i jesiotry. Do dyspozycji wędkarzy pomosty, wiaty oraz wypożyczalnia sprzętu. Łowisko idealne zarówno dla rodzin, jak i zaawansowanych karpiarzy.",
        species: ["Karp", "Amur", "Jesiotr", "Lin", "Karaś"],
        mapX: 30, // Percentage on mock map
        mapY: 40,
        status: "ZWERYFIKOWANE", // OCZEKUJACE, ZWERYFIKOWANE, ODRZUCONE
        stands: [
            { id: 1, name: "Stanowisko 1 (Cypel)", price: 60, status: "DOSTEPNE" },
            { id: 2, name: "Stanowisko 2 (Zatoka)", price: 50, status: "DOSTEPNE" },
            { id: 3, name: "Stanowisko 3 (Trzciny)", price: 50, status: "DOSTEPNE" },
            { id: 4, name: "Stanowisko 4 (Głębokie)", price: 70, status: "DOSTEPNE" }
        ]
    },
    {
        id: 2,
        name: "Jezioro Wigry - PZW",
        type: "PZW",
        location: "Podlaskie, Wigry",
        owner: "Okręg PZW Suwałki",
        contact: "87-564-00-11",
        description: "Zbiornik PZW o statusie wody górskiej/chronionej. Wymagane jest specjalne zezwolenie PZW Suwałki oraz opłacona składka członkowska. Słynie z pięknych szczupaków, siei oraz okoni. Wędkowanie dozwolone wyłącznie z wyznaczonych stanowisk lub łodzi.",
        species: ["Szczupak", "Okoń", "Leszcz", "Płoć", "Lin"],
        mapX: 65,
        mapY: 25,
        status: "ZWERYFIKOWANE",
        stands: [
            { id: 1, name: "Pomost A (Klasztor)", price: 20, status: "DOSTEPNE" },
            { id: 2, name: "Stanowisko B (Zatoka Cicha)", price: 20, status: "DOSTEPNE" },
            { id: 3, name: "Stanowisko C (Płociczno)", price: 20, status: "DOSTEPNE" }
        ]
    },
    {
        id: 3,
        name: "Dzika Głusza",
        type: "DZIKIE WODY",
        location: "Mazurskie, Szczytno",
        owner: "Nadleśnictwo Szczytno",
        contact: "89-624-22-15",
        description: "Zapomniany, dziki staw w środku puszczy mazurskiej. Wstęp wolny, jednak dojazd utrudniony. Brak jakichkolwiek wygód, całkowity kontakt z naturą. Rybostan naturalny, trudny technicznie. Zasada Złów i Wypuść obowiązuje wszystkich.",
        species: ["Karaś", "Lin", "Okoń", "Szczupak"],
        mapX: 45,
        mapY: 70,
        status: "ZWERYFIKOWANE",
        stands: [
            { id: 1, name: "Polana pod dębem", price: 0, status: "DOSTEPNE" },
            { id: 2, name: "Zwalone drzewo", price: 0, status: "DOSTEPNE" }
        ]
    }
];

const INITIAL_RESERVATIONS = [
    {
        id: 101,
        userName: "Włodzimierz Szczupalski",
        fisheryId: 1,
        fisheryName: "Łowisko Pod Borem",
        standId: 2,
        standName: "Stanowisko 2 (Zatoka)",
        dateStart: "2026-06-12",
        dateEnd: "2026-06-14",
        cost: 100,
        status: "POTWIERDZONA" // OCZEKUJACA, POTWIERDZONA, ANULOWANA, ZAKONCZONA
    },
    {
        id: 102,
        userName: "Włodzimierz Szczupalski",
        fisheryId: 2,
        fisheryName: "Jezioro Wigry - PZW",
        standId: 1,
        standName: "Pomost A (Klasztor)",
        dateStart: "2026-06-20",
        dateEnd: "2026-06-21",
        cost: 20,
        status: "OCZEKUJACA"
    }
];

const INITIAL_CATCHES = [
    {
        id: 201,
        userName: "Marian Okoński",
        name: "Jesienny potwór z Pod Borem",
        species: "Karp",
        weight: 18.40,
        length: 92.0,
        date: "2026-05-14",
        fisheryName: "Łowisko Pod Borem",
        status: "ZATWIERDZONY", // OCZEKUJACY, ZATWIERDZONY, ODRZUCONY
        photo: "mock-karp.jpg"
    },
    {
        id: 202,
        userName: "Rafał Ryba",
        name: "Szczupak sezonu",
        species: "Szczupak",
        weight: 9.80,
        length: 104.5,
        date: "2026-05-28",
        fisheryName: "Jezioro Wigry - PZW",
        status: "ZATWIERDZONY",
        photo: "mock-szczupak.jpg"
    },
    {
        id: 203,
        userName: "Włodzimierz Szczupalski",
        name: "Lin z dzikiej wody",
        species: "Lin",
        weight: 3.10,
        length: 54.0,
        date: "2026-06-02",
        fisheryName: "Dzika Głusza",
        status: "OCZEKUJACY",
        photo: ""
    }
];

const INITIAL_USERS = [
    { id: 1, name: "Rafał Ryba", email: "rafal@gdzieryba.pl", role: "wedkarz", blocked: false },
    { id: 2, name: "Jan Kowalski", email: "jan@gdzieryba.pl", role: "zarzadca", blocked: false },
    { id: 3, name: "Włodzimierz Szczupalski", email: "wlodzimierz@gdzieryba.pl", role: "wedkarz", blocked: false },
    { id: 4, name: "Administrator Systemu", email: "admin@gdzieryba.pl", role: "admin", blocked: false }
];

/* ==========================================================================
   APP STATE MANAGER
   ========================================================================== */
class AppState {
    constructor() {
        this.loadState();
    }

    loadState() {
        // Clear cached databases if old student names from PDF are detected
        const cachedUsers = localStorage.getItem("gdzieryba_users");
        if (cachedUsers && (cachedUsers.includes("Julia") || cachedUsers.includes("Oliwier") || cachedUsers.includes("Micha\u0142"))) {
            localStorage.removeItem("gdzieryba_users");
            localStorage.removeItem("gdzieryba_reservations");
            localStorage.removeItem("gdzieryba_catches");
            localStorage.removeItem("gdzieryba_fisheries");
        }

        this.fisheries = JSON.parse(localStorage.getItem("gdzieryba_fisheries")) || INITIAL_FISHERIES;
        this.reservations = JSON.parse(localStorage.getItem("gdzieryba_reservations")) || INITIAL_RESERVATIONS;
        this.catches = JSON.parse(localStorage.getItem("gdzieryba_catches")) || INITIAL_CATCHES;
        this.users = JSON.parse(localStorage.getItem("gdzieryba_users")) || INITIAL_USERS;

        // Default session: Guest
        this.currentRole = "gosc";
        this.currentUser = null;
    }

    saveState() {
        localStorage.setItem("gdzieryba_fisheries", JSON.stringify(this.fisheries));
        localStorage.setItem("gdzieryba_reservations", JSON.stringify(this.reservations));
        localStorage.setItem("gdzieryba_catches", JSON.stringify(this.catches));
        localStorage.setItem("gdzieryba_users", JSON.stringify(this.users));
    }

    setRole(role) {
        this.currentRole = role;
        if (role === "gosc") {
            this.currentUser = null;
        } else {
            this.currentUser = this.users.find(u => u.role === role) || this.users[0];
        }
    }
}

const state = new AppState();

/* ==========================================================================
   ROUTING & VIEW SWITCHER
   ========================================================================== */
const VIEWS = [
    "home-view",
    "map-view",
    "fishery-details-view",
    "wedkarz-reservations-view",
    "records-view",
    "report-catch-view",
    "profile-view",
    "login-view",
    "zarzadca-fisheries-view",
    "zarzadca-reservations-view",
    "zarzadca-calendar-view",
    "admin-records-view",
    "admin-fisheries-view",
    "admin-users-view"
];

function switchView(viewId) {
    VIEWS.forEach(id => {
        const viewEl = document.getElementById(id);
        if (viewEl) {
            if (id === viewId) {
                viewEl.classList.add("active");
            } else {
                viewEl.classList.remove("active");
            }
        }
    });

    // Close any open modal overlay when switching main views
    const activeModals = document.querySelectorAll(".modal-overlay.active");
    activeModals.forEach(m => m.classList.remove("active"));

    // Render logic for specific views
    if (viewId === "map-view") {
        renderMapAndSidebar();
    } else if (viewId === "wedkarz-reservations-view") {
        renderWedkarzReservations();
    } else if (viewId === "records-view") {
        renderLeaderboard();
    } else if (viewId === "report-catch-view") {
        populateReportCatchFisheries();
    } else if (viewId === "profile-view") {
        populateProfileForm();
    } else if (viewId === "zarzadca-fisheries-view") {
        renderZarzadcaFisheries();
    } else if (viewId === "zarzadca-reservations-view") {
        renderZarzadcaReservations();
    } else if (viewId === "zarzadca-calendar-view") {
        renderZarzadcaCalendarTab();
    } else if (viewId === "admin-records-view") {
        renderAdminRecords();
    } else if (viewId === "admin-fisheries-view") {
        renderAdminFisheries();
    } else if (viewId === "admin-users-view") {
        renderAdminUsers();
    }
    // Highlight the correct navigation link in the active navigation group
    const activeNavGroup = document.querySelector(".active-nav-group");
    if (activeNavGroup) {
        const navLinks = activeNavGroup.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            if (link.getAttribute("data-view") === viewId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Scroll back to top on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavigationForRole() {
    // Hide all navigation groups
    const navGroups = document.querySelectorAll(".nav-group");
    navGroups.forEach(g => g.classList.remove("active-nav-group"));

    // Show navigation for active role
    const activeGroup = document.querySelector(`.${state.currentRole}-nav`);
    if (activeGroup) {
        activeGroup.classList.add("active-nav-group");
    }

    // Mark corresponding nav links active
    const links = document.querySelectorAll(".nav-link");
    links.forEach(l => l.classList.remove("active"));
}

/* ==========================================================================
   UI UTILITIES (Toasts & Triggers)
   ========================================================================== */
function showToast(message, isError = false) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${isError ? 'toast-error' : ''}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "none";
        toast.offsetHeight; // Trigger reflow
        toast.style.animation = "toastSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse forwards";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/* ==========================================================================
   VIEW: MAP & SIDEBAR LOGIC (Gość / Wędkarz)
   ========================================================================== */
let selectedFisheryId = null;

function renderMapAndSidebar() {
    const listContainer = document.getElementById("fisheries-list");
    const pinsContainer = document.getElementById("map-pins");
    const countEl = document.getElementById("fisheries-count");

    if (!listContainer || !pinsContainer) return;

    listContainer.innerHTML = "";
    pinsContainer.innerHTML = "";

    // Search and filter parameters
    const searchVal = document.getElementById("filter-search").value.toLowerCase();
    const typeVal = document.getElementById("filter-type").value;
    const locVal = document.getElementById("filter-location").value.toLowerCase();

    // Filter verified fisheries (Guest & Fisherman only see verified)
    const filtered = state.fisheries.filter(fish => {
        if (fish.status !== "ZWERYFIKOWANE") return false;

        const matchesSearch = fish.name.toLowerCase().includes(searchVal);
        const matchesType = typeVal ? fish.type === typeVal : true;
        const matchesLoc = fish.location.toLowerCase().includes(locVal);

        return matchesSearch && matchesType && matchesLoc;
    });

    countEl.textContent = filtered.length;

    if (filtered.length === 0) {
        listContainer.innerHTML = `<p class="subtitle" style="padding: 20px; text-align: center;">Nie znaleziono łowisk spełniających kryteria.</p>`;
        return;
    }

    filtered.forEach(fish => {
        // 1. Create sidebar card
        const card = document.createElement("div");
        card.className = `fishery-sidebar-card ${selectedFisheryId === fish.id ? 'selected' : ''}`;
        card.innerHTML = `
            <div class="sidebar-card-header">
                <h4 class="sidebar-card-title">${fish.name}</h4>
                <span class="badge sidebar-badge ${fish.type === 'PZW' ? 'badge-verification' : 'badge-pending'}">${fish.type}</span>
            </div>
            <p class="sidebar-card-loc">${fish.location}</p>
            <p class="sidebar-card-species">Ryby: ${fish.species.slice(0, 3).join(", ")}${fish.species.length > 3 ? '...' : ''}</p>
        `;

        card.addEventListener("click", () => {
            selectedFisheryId = fish.id;
            renderMapAndSidebar(); // Redraw selection indicators
            openFisheryDetails(fish.id);
        });

        listContainer.appendChild(card);

        // 2. Create map pin
        const pin = document.createElement("div");
        pin.className = `map-pin ${fish.type === 'PZW' ? 'PZW' : (fish.type === 'DZIKIE WODY' ? 'DZIKIE' : '')} ${selectedFisheryId === fish.id ? 'active' : ''}`;
        pin.style.left = `${fish.mapX}%`;
        pin.style.top = `${fish.mapY}%`;
        pin.title = fish.name;

        pin.addEventListener("click", (e) => {
            e.stopPropagation();
            selectedFisheryId = fish.id;
            renderMapAndSidebar();
            openFisheryDetails(fish.id);
        });

        pinsContainer.appendChild(pin);
    });
}

/* ==========================================================================
   VIEW: FISHERY DETAILS & RESERVATION (Gość / Wędkarz)
   ========================================================================== */
let currentFisheryDetails = null;
let selectedStandId = null;

function openFisheryDetails(fisheryId) {
    const fishery = state.fisheries.find(f => f.id === fisheryId);
    if (!fishery) return;

    currentFisheryDetails = fishery;
    selectedStandId = null; // Clear stand selection on load

    // Populate elements
    document.getElementById("details-name").textContent = fishery.name;
    document.getElementById("details-location").textContent = fishery.location;
    document.getElementById("details-contact").textContent = fishery.contact;
    document.getElementById("details-owner").textContent = fishery.owner;
    document.getElementById("details-description").textContent = fishery.description;

    const badgeType = document.getElementById("details-badge-type");
    badgeType.textContent = fishery.type;
    badgeType.className = `badge ${fishery.type === 'PZW' ? 'badge-verification' : 'badge-pending'}`;

    // Fish species tags
    const speciesContainer = document.getElementById("details-fish-tags");
    speciesContainer.innerHTML = "";
    fishery.species.forEach(sp => {
        const tag = document.createElement("span");
        tag.className = "fish-tag";
        tag.textContent = sp;
        speciesContainer.appendChild(tag);
    });

    // Handle Reservation widget visibility / overlays
    const guestAlert = document.getElementById("reservation-guest-alert");
    const formContainer = document.getElementById("reservation-form-container");

    if (state.currentRole === "gosc") {
        guestAlert.classList.remove("hidden");
        formContainer.classList.add("hidden");
    } else if (state.currentRole === "wedkarz") {
        guestAlert.classList.add("hidden");
        formContainer.classList.remove("hidden");
        // Clear forms
        document.getElementById("booking-form").reset();
        document.getElementById("res-days-count").textContent = "0";
        document.getElementById("res-total-price").textContent = "0 PLN";

        // Preset select stand info
        document.getElementById("res-selected-stand-name").textContent = "Brak (Wybierz poniżej)";
        document.getElementById("res-selected-stand-price").textContent = "0 PLN";
    } else {
        // Other roles (Zarzadca, Admin) cannot book directly
        guestAlert.classList.remove("hidden");
        guestAlert.innerHTML = `<p>Jesteś zalogowany jako **${state.currentRole}**. Tylko **Wędkarze** mogą dokonywać rezerwacji.</p>`;
        formContainer.classList.add("hidden");
    }

    // Render stands list
    renderStands(fishery);

    switchView("fishery-details-view");
}

function renderStands(fishery) {
    const container = document.getElementById("details-stands-list");
    if (!container) return;

    container.innerHTML = "";

    fishery.stands.forEach(stand => {
        const card = document.createElement("div");
        card.className = `stand-card ${selectedStandId === stand.id ? 'selected' : ''} ${stand.status === 'NIEDOSTEPNE' ? 'unavailable' : ''}`;

        card.innerHTML = `
            <h4 class="stand-card-title">${stand.name}</h4>
            <p class="stand-card-price">${stand.price} PLN / doba</p>
            <span class="status-indicator ${stand.status}">${stand.status === 'DOSTEPNE' ? 'Dostępne' : 'Wyłączone'}</span>
        `;

        if (stand.status === 'DOSTEPNE') {
            card.addEventListener("click", () => {
                selectedStandId = stand.id;
                renderStands(fishery);

                // Update booking form fields
                document.getElementById("res-selected-stand-name").textContent = stand.name;
                document.getElementById("res-selected-stand-price").textContent = `${stand.price} PLN`;
                calculateBookingPrice();
            });
        }

        container.appendChild(card);
    });
}

function calculateBookingPrice() {
    if (!currentFisheryDetails || selectedStandId === null) return;

    const stand = currentFisheryDetails.stands.find(s => s.id === selectedStandId);
    if (!stand) return;

    const startVal = document.getElementById("booking-date-start").value;
    const endVal = document.getElementById("booking-date-end").value;

    if (!startVal || !endVal) {
        document.getElementById("res-days-count").textContent = "0";
        document.getElementById("res-total-price").textContent = "0 PLN";
        return;
    }

    const start = new Date(startVal);
    const end = new Date(endVal);

    if (end <= start) {
        document.getElementById("res-days-count").textContent = "Błąd dat";
        document.getElementById("res-total-price").textContent = "0 PLN";
        return;
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    document.getElementById("res-days-count").textContent = diffDays;
    document.getElementById("res-total-price").textContent = `${diffDays * stand.price} PLN`;
}

// Attach change events to booking dates
document.getElementById("booking-date-start").addEventListener("change", calculateBookingPrice);
document.getElementById("booking-date-end").addEventListener("change", calculateBookingPrice);

/* ==========================================================================
   VIEW: WEDKARZ RESERVATIONS
   ========================================================================== */
function renderWedkarzReservations() {
    const tableBody = document.getElementById("wedkarz-reservations-table");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    // Show only active user reservations (Oliwier / Michał etc)
    const userRes = state.reservations.filter(r => r.userName === state.currentUser.name);

    if (userRes.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-secondary);">Brak rezerwacji w historii.</td></tr>`;
        return;
    }

    userRes.forEach(res => {
        const tr = document.createElement("tr");

        let cancelBtn = "";
        if (res.status === "OCZEKUJACA" || res.status === "POTWIERDZONA") {
            cancelBtn = `<button class="btn btn-danger btn-small" onclick="cancelReservation(${res.id})">Anuluj</button>`;
        } else {
            cancelBtn = `<span class="text-muted">Brak</span>`;
        }

        tr.innerHTML = `
            <td>#${res.id}</td>
            <td><strong>${res.fisheryName}</strong></td>
            <td>${res.standName}</td>
            <td>${res.dateStart}</td>
            <td>${res.dateEnd}</td>
            <td><strong>${res.cost} PLN</strong></td>
            <td><span class="status-indicator ${res.status}">${translateStatus(res.status)}</span></td>
            <td>${cancelBtn}</td>
        `;

        tableBody.appendChild(tr);
    });
}

function cancelReservation(resId) {
    const res = state.reservations.find(r => r.id === resId);
    if (!res) return;

    res.status = "ANULOWANA";
    state.saveState();
    showToast("Rezerwacja została pomyślnie anulowana.");

    // Re-render
    if (state.currentRole === "wedkarz") {
        renderWedkarzReservations();
    } else if (state.currentRole === "zarzadca") {
        renderZarzadcaReservations();
    }
}

function translateStatus(status) {
    switch (status) {
        case "OCZEKUJACA": return "Oczekująca";
        case "POTWIERDZONA": return "Potwierdzona";
        case "ANULOWANA": return "Anulowana";
        case "ZAKONCZONA": return "Zakończona";
        case "OCZEKUJACY": return "Oczekujący";
        case "ZATWIERDZONY": return "Zatwierdzony";
        case "ODRZUCONY": return "Odrzucony";
        default: return status;
    }
}

/* ==========================================================================
   VIEW: TABLICA REKORDÓW (LEADERBOARD)
   ========================================================================== */
function renderLeaderboard() {
    const tableBody = document.getElementById("records-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    // Filters
    const speciesFilter = document.getElementById("record-filter-species").value.toLowerCase();
    const sortVal = document.getElementById("record-filter-sort").value;

    // Filter approved catches
    let filtered = state.catches.filter(c => {
        if (c.status !== "ZATWIERDZONY") return false;
        return c.species.toLowerCase().includes(speciesFilter);
    });

    // Sorting
    filtered.sort((a, b) => {
        if (sortVal === "weight") return b.weight - a.weight;
        if (sortVal === "length") return b.length - a.length;
        if (sortVal === "date") return new Date(b.date) - new Date(a.date);
        return 0;
    });

    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-secondary);">Brak rekordów do wyświetlenia.</td></tr>`;
        return;
    }

    filtered.forEach(rec => {
        const tr = document.createElement("tr");

        // Photo thumbnail (generate nice CSS colored block if no photo)
        const photoHtml = rec.photo
            ? `<div class="record-thumbnail" style="background: linear-gradient(135deg, #122c3a 0%, #0c1c24 100%); display:flex; align-items:center; justify-content:center; border: 1px solid var(--accent-green); font-size:0.6rem; color:var(--accent-green); font-weight:600; text-transform:uppercase;">Foto</div>`
            : `<div class="record-thumbnail" style="background: #111; display:flex; align-items:center; justify-content:center; color:#555; font-size:0.6rem;">Brak</div>`;

        tr.innerHTML = `
            <td>${photoHtml}</td>
            <td><strong>${rec.userName}</strong></td>
            <td>${rec.name} / <span class="badge badge-verification">${rec.species}</span></td>
            <td><strong>${rec.weight.toFixed(2)} kg</strong></td>
            <td>${rec.length.toFixed(1)} cm</td>
            <td>${rec.date}</td>
            <td>${rec.fisheryName}</td>
        `;

        tableBody.appendChild(tr);
    });
}

document.getElementById("record-filter-species").addEventListener("input", renderLeaderboard);
document.getElementById("record-filter-sort").addEventListener("change", renderLeaderboard);

/* ==========================================================================
   VIEW: REPORT CATCH (Zgłoś Połów - Wędkarz)
   ========================================================================== */
function populateReportCatchFisheries() {
    const select = document.getElementById("catch-location");
    if (!select) return;

    select.innerHTML = "";

    // Fill options only with verified fisheries
    state.fisheries.filter(f => f.status === "ZWERYFIKOWANE").forEach(f => {
        const opt = document.createElement("option");
        opt.value = f.name;
        opt.textContent = f.name;
        select.appendChild(opt);
    });
}

// Custom file upload visual logic
const fileZone = document.getElementById("photo-upload-zone");
const fileInput = document.getElementById("catch-photo");
const uploadStatus = document.getElementById("upload-status-text");

fileZone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        uploadStatus.textContent = `Wybrano plik: ${fileInput.files[0].name}`;
        uploadStatus.style.color = "var(--accent-green)";
    }
});

/* ==========================================================================
   VIEW: PROFILE TAB (Dane Profilowe)
   ========================================================================== */
function populateProfileForm() {
    const user = state.currentUser;
    if (!user) return;

    // Split name and surname
    const parts = user.name.split(" ");
    document.getElementById("profile-name").value = parts[0] || "";
    document.getElementById("profile-surname").value = parts[1] || "";
    document.getElementById("profile-email").value = user.email;

    const wedkarzFields = document.getElementById("profile-wedkarz-fields");
    const zarzadcaFields = document.getElementById("profile-zarzadca-fields");

    if (state.currentRole === "wedkarz") {
        wedkarzFields.classList.remove("hidden");
        zarzadcaFields.classList.add("hidden");
        document.getElementById("profile-card-number").value = "PL-PZW-2489-A"; // Mock license
    } else {
        wedkarzFields.classList.add("hidden");
        zarzadcaFields.classList.remove("hidden");
        document.getElementById("profile-company-name").value = "RyboSpol Sp. z o.o.";
        document.getElementById("profile-nip").value = "525-248-12-99";
        document.getElementById("profile-phone").value = "602-999-111";
    }
}

/* ==========================================================================
   VIEW: ZARZĄDCA - FISHERIES MANAGEMENT (Moje Łowiska)
   ========================================================================== */
function renderZarzadcaFisheries() {
    const container = document.getElementById("zarzadca-fisheries-list");
    if (!container) return;

    container.innerHTML = "";

    // Show fisheries owned by this manager (Jan Kowalski is our default mock owner)
    // Note: To make simulation interactive, we consider all fisheries added in zarzadca session as owned.
    const managerFisheries = state.fisheries; // Show all for easy demonstration

    managerFisheries.forEach(fish => {
        const card = document.createElement("div");
        card.className = "card fishery-zarzadca-card";

        card.innerHTML = `
            <div>
                <div class="sidebar-card-header" style="margin-bottom: 12px;">
                    <h3 style="font-size: 1.3rem; font-weight: 700;">${fish.name}</h3>
                    <span class="badge ${fish.status === 'ZWERYFIKOWANE' ? 'badge-verification' : (fish.status === 'OCZEKUJACE' ? 'badge-pending' : 'badge-danger')}">${translateStatus(fish.status)}</span>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 10px;">Lokalizacja: ${fish.location}</p>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 10px;">Liczba stanowisk: ${fish.stands.length}</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Gatunki: ${fish.species.join(", ")}</p>
            </div>
            <div class="zarz-card-footer">
                <button class="btn btn-secondary btn-small" onclick="editFishery(${fish.id})">Edytuj</button>
                <button class="btn btn-danger btn-small" onclick="deleteFishery(${fish.id})">Usuń</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function deleteFishery(id) {
    state.fisheries = state.fisheries.filter(f => f.id !== id);
    state.saveState();
    showToast("Łowisko zostało usunięte.");
    renderZarzadcaFisheries();
}

// Modal forms structure inside Zarzadca
const addFisheryModal = document.getElementById("add-fishery-modal");
const standsContainer = document.getElementById("modal-stands-container");

let standsCount = 0;

function createStandRow(name = "", price = "") {
    standsCount++;
    const row = document.createElement("div");
    row.className = "stand-row";
    row.id = `stand-row-${standsCount}`;
    row.innerHTML = `
        <input type="text" placeholder="Nazwa stanowiska (np. Stanowisko 1)" value="${name}" required class="stand-name-input">
        <input type="number" placeholder="Cena (PLN)" value="${price}" required class="stand-price-input">
        <button type="button" class="btn-remove-row" onclick="removeStandRow(${standsCount})">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
    `;
    standsContainer.appendChild(row);
}

function removeStandRow(rowId) {
    const row = document.getElementById(`stand-row-${rowId}`);
    if (row) row.remove();
}

document.getElementById("btn-add-stand-row").addEventListener("click", () => {
    createStandRow();
});

document.getElementById("btn-open-add-fishery").addEventListener("click", () => {
    document.getElementById("fishery-modal-title").textContent = "Dodaj Nowe Łowisko";
    document.getElementById("fishery-form").reset();
    standsContainer.innerHTML = "";
    createStandRow("Stanowisko 1", "50"); // Add one row by default
    addFisheryModal.classList.add("active");
});

document.getElementById("btn-close-fishery-modal").addEventListener("click", () => {
    addFisheryModal.classList.remove("active");
});
document.getElementById("btn-cancel-fishery").addEventListener("click", () => {
    addFisheryModal.classList.remove("active");
});

// Submit fishery
document.getElementById("fishery-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("fish-name").value;
    const type = document.getElementById("fish-type").value;
    const location = document.getElementById("fish-location").value;
    const desc = document.getElementById("fish-desc").value;
    const species = document.getElementById("fish-species-list").value.split(",").map(s => s.trim()).filter(s => s.length > 0);

    // Read stand rows
    const standRows = standsContainer.querySelectorAll(".stand-row");
    const stands = [];
    let sId = 1;
    standRows.forEach(row => {
        const sName = row.querySelector(".stand-name-input").value;
        const sPrice = parseFloat(row.querySelector(".stand-price-input").value);
        stands.push({
            id: sId++,
            name: sName,
            price: sPrice,
            status: "DOSTEPNE"
        });
    });

    const newFishery = {
        id: Date.now(),
        name,
        type,
        location,
        owner: state.currentUser ? state.currentUser.name : "Jan Kowalski",
        contact: "601-222-333",
        description: desc,
        species,
        mapX: Math.floor(Math.random() * 60) + 20, // Random placement coordinates for demo map
        mapY: Math.floor(Math.random() * 60) + 20,
        status: "OCZEKUJACE", // Added by owner -> goes to admin verification
        stands
    };

    state.fisheries.push(newFishery);
    state.saveState();

    showToast("Łowisko zostało wysłane do weryfikacji przez administratora.");
    addFisheryModal.classList.remove("active");
    renderZarzadcaFisheries();
});

/* ==========================================================================
   VIEW: ZARZĄDCA - RESERVATIONS (Zatwierdzanie i anulowanie)
   ========================================================================== */
function renderZarzadcaReservations() {
    const tableBody = document.getElementById("zarzadca-reservations-table");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    // Zarządca sees all reservations in this simulation for easier presentation
    if (state.reservations.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-secondary);">Brak rezerwacji w systemie.</td></tr>`;
        return;
    }

    state.reservations.forEach(res => {
        const tr = document.createElement("tr");

        let actions = "";
        if (res.status === "OCZEKUJACA") {
            actions = `
                <button class="btn btn-primary btn-small" onclick="approveReservation(${res.id})">Potwierdź</button>
                <button class="btn btn-danger btn-small" onclick="cancelReservation(${res.id})">Odrzuć</button>
            `;
        } else if (res.status === "POTWIERDZONA") {
            actions = `
                <button class="btn btn-danger btn-small" onclick="cancelReservation(${res.id})">Anuluj</button>
            `;
        } else {
            actions = `<span class="text-muted">Brak akcji</span>`;
        }

        tr.innerHTML = `
            <td>#${res.id}</td>
            <td><strong>${res.userName}</strong></td>
            <td>${res.fisheryName}</td>
            <td>${res.standName}</td>
            <td>${res.dateStart} do ${res.dateEnd}</td>
            <td><strong>${res.cost} PLN</strong></td>
            <td><span class="status-indicator ${res.status}">${translateStatus(res.status)}</span></td>
            <td><div style="display:flex; gap:5px;">${actions}</div></td>
        `;

        tableBody.appendChild(tr);
    });
}

function approveReservation(id) {
    const res = state.reservations.find(r => r.id === id);
    if (!res) return;

    res.status = "POTWIERDZONA";
    state.saveState();
    showToast("Rezerwacja została zaakceptowana i potwierdzona.");
    renderZarzadcaReservations();
}

/* ==========================================================================
   VIEW: ZARZĄDCA - TIMELINE & BLOCKING (Terminarz i blokowanie)
   ========================================================================== */
function renderZarzadcaCalendarTab() {
    const fishSelect = document.getElementById("cal-select-fishery");
    const standSelect = document.getElementById("cal-select-stand");
    const timeline = document.getElementById("calendar-bookings-list");

    if (!fishSelect || !standSelect || !timeline) return;

    // Populate fisheries
    fishSelect.innerHTML = "";
    state.fisheries.forEach(f => {
        const opt = document.createElement("option");
        opt.value = f.id;
        opt.textContent = f.name;
        fishSelect.appendChild(opt);
    });

    // Populate stands helper
    function updateStandsDropdown() {
        standSelect.innerHTML = "";
        const fishId = parseInt(fishSelect.value);
        const fishery = state.fisheries.find(f => f.id === fishId);
        if (!fishery) return;

        fishery.stands.forEach(s => {
            const opt = document.createElement("option");
            opt.value = s.id;
            opt.textContent = s.name;
            standSelect.appendChild(opt);
        });

        renderTimeline();
    }

    fishSelect.addEventListener("change", updateStandsDropdown);
    standSelect.addEventListener("change", renderTimeline);

    updateStandsDropdown();
}

function renderTimeline() {
    const fishSelect = document.getElementById("cal-select-fishery");
    const standSelect = document.getElementById("cal-select-stand");
    const timeline = document.getElementById("calendar-bookings-list");

    if (!fishSelect.value || !standSelect.value) return;

    const fishId = parseInt(fishSelect.value);
    const standId = parseInt(standSelect.value);

    const fishery = state.fisheries.find(f => f.id === fishId);
    if (!fishery) return;

    const stand = fishery.stands.find(s => s.id === standId);
    if (!stand) return;

    timeline.innerHTML = "";

    // Find all reservations for this stand
    const bookings = state.reservations.filter(r => r.fisheryId === fishId && r.standId === standId);

    if (bookings.length === 0) {
        timeline.innerHTML = `<p style="padding: 10px; color: var(--text-secondary);">Brak rezerwacji lub blokad dla tego stanowiska w wybranym okresie.</p>`;
        return;
    }

    bookings.forEach(b => {
        const item = document.createElement("div");
        item.className = "timeline-item";

        let cancelBtn = "";
        // If it's a block (we mark custom block entries with name "BLOKADA ZARZĄDCY")
        if (b.userName === "BLOKADA ZARZĄDCY") {
            cancelBtn = `<button class="btn btn-danger btn-small" onclick="removeBlock(${b.id})">Usuń blokadę</button>`;
        }

        item.innerHTML = `
            <div class="timeline-info">
                <h4>${b.userName}</h4>
                <p>Termin: ${b.dateStart} do ${b.dateEnd}</p>
                <div class="timeline-badge">
                    <span class="status-indicator ${b.status}">${translateStatus(b.status)}</span>
                </div>
            </div>
            <div>${cancelBtn}</div>
        `;

        timeline.appendChild(item);
    });
}

function removeBlock(id) {
    state.reservations = state.reservations.filter(r => r.id !== id);
    state.saveState();
    showToast("Blokada terminu została usunięta.");
    renderTimeline();
}

// Block form submit
document.getElementById("block-dates-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const fishId = parseInt(document.getElementById("cal-select-fishery").value);
    const standId = parseInt(document.getElementById("cal-select-stand").value);
    const start = document.getElementById("cal-block-start").value;
    const end = document.getElementById("cal-block-end").value;

    const fishery = state.fisheries.find(f => f.id === fishId);
    const stand = fishery.stands.find(s => s.id === standId);

    if (new Date(end) <= new Date(start)) {
        showToast("Błąd: Data zakończenia musi być późniejsza niż rozpoczęcia.", true);
        return;
    }

    const newBlock = {
        id: Date.now(),
        userName: "BLOKADA ZARZĄDCY",
        fisheryId: fishId,
        fisheryName: fishery.name,
        standId: standId,
        standName: stand.name,
        dateStart: start,
        dateEnd: end,
        cost: 0,
        status: "POTWIERDZONA"
    };

    state.reservations.push(newBlock);
    state.saveState();

    showToast("Termin został pomyślnie zablokowany.");
    document.getElementById("cal-block-start").value = "";
    document.getElementById("cal-block-end").value = "";
    renderTimeline();
});

/* ==========================================================================
   VIEW: ADMIN - CATCH MODERATION (Moderacja Rekordów)
   ========================================================================== */
function renderAdminRecords() {
    const tableBody = document.getElementById("admin-records-table");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    const pending = state.catches.filter(c => c.status === "OCZEKUJACY");

    if (pending.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-secondary);">Brak zgłoszeń oczekujących na moderację.</td></tr>`;
        return;
    }

    pending.forEach(rec => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>#${rec.id}</td>
            <td><strong>${rec.userName}</strong></td>
            <td>${rec.name} / <span class="badge badge-verification">${rec.species}</span></td>
            <td><strong>${rec.weight} kg</strong></td>
            <td>${rec.length} cm</td>
            <td>${rec.date}</td>
            <td>${rec.fisheryName}</td>
            <td>
                <div style="display:flex; gap:5px;">
                    <button class="btn btn-primary btn-small" onclick="approveCatch(${rec.id})">Zatwierdź</button>
                    <button class="btn btn-danger btn-small" onclick="rejectCatch(${rec.id})">Odrzuć</button>
                </div>
            </td>
        `;

        tableBody.appendChild(tr);
    });
}

function approveCatch(id) {
    const catchObj = state.catches.find(c => c.id === id);
    if (!catchObj) return;

    catchObj.status = "ZATWIERDZONY";
    state.saveState();
    showToast("Rekord został zatwierdzony i jest widoczny na Tablicy Rekordów.");
    renderAdminRecords();
}

function rejectCatch(id) {
    const catchObj = state.catches.find(c => c.id === id);
    if (!catchObj) return;

    catchObj.status = "ODRZUCONY";
    state.saveState();
    showToast("Zgłoszenie rekordu zostało odrzucone.");
    renderAdminRecords();
}

/* ==========================================================================
   VIEW: ADMIN - FISHERY MODERATION (Weryfikacja Łowisk)
   ========================================================================== */
function renderAdminFisheries() {
    const tableBody = document.getElementById("admin-fisheries-table");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    const pending = state.fisheries.filter(f => f.status === "OCZEKUJACE");

    if (pending.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-secondary);">Brak nowych łowisk do weryfikacji.</td></tr>`;
        return;
    }

    pending.forEach(fish => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>#${fish.id}</td>
            <td><strong>${fish.name}</strong></td>
            <td>${fish.type}</td>
            <td>${fish.location}</td>
            <td>${fish.owner}</td>
            <td><span class="status-indicator ${fish.status}">${translateStatus(fish.status)}</span></td>
            <td>
                <div style="display:flex; gap:5px;">
                    <button class="btn btn-primary btn-small" onclick="approveFishery(${fish.id})">Zatwierdź</button>
                    <button class="btn btn-danger btn-small" onclick="rejectFishery(${fish.id})">Odrzuć</button>
                </div>
            </td>
        `;

        tableBody.appendChild(tr);
    });
}

function approveFishery(id) {
    const fish = state.fisheries.find(f => f.id === id);
    if (!fish) return;

    fish.status = "ZWERYFIKOWANE";
    state.saveState();
    showToast("Łowisko zostało zweryfikowane i opublikowane na mapie.");
    renderAdminFisheries();
}

function rejectFishery(id) {
    const fish = state.fisheries.find(f => f.id === id);
    if (!fish) return;

    fish.status = "ODRZUCONE";
    state.saveState();
    showToast("Rejestracja łowiska została odrzucona.");
    renderAdminFisheries();
}

/* ==========================================================================
   VIEW: ADMIN - USER ACCOUNT MANAGEMENT (Blokowanie kont)
   ========================================================================== */
function renderAdminUsers() {
    const tableBody = document.getElementById("admin-users-table");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    state.users.forEach(u => {
        const tr = document.createElement("tr");

        let actionBtn = "";
        if (u.role !== "admin") {
            if (u.blocked) {
                actionBtn = `<button class="btn btn-primary btn-small" onclick="toggleUserBlock(${u.id})">Odblokuj</button>`;
            } else {
                actionBtn = `<button class="btn btn-danger btn-small" onclick="toggleUserBlock(${u.id})">Zablokuj</button>`;
            }
        } else {
            actionBtn = `<span class="text-muted">Brak (Główny admin)</span>`;
        }

        tr.innerHTML = `
            <td>#${u.id}</td>
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td>${u.role === 'wedkarz' ? 'Wędkarz' : (u.role === 'zarzadca' ? 'Zarządca' : 'Admin')}</td>
            <td>
                <span class="status-indicator ${u.blocked ? 'NIEDOSTEPNE' : 'DOSTEPNE'}">
                    ${u.blocked ? 'Zablokowane' : 'Aktywne'}
                </span>
            </td>
            <td>${actionBtn}</td>
        `;

        tableBody.appendChild(tr);
    });
}

function toggleUserBlock(id) {
    const user = state.users.find(u => u.id === id);
    if (!user) return;

    user.blocked = !user.blocked;
    state.saveState();
    showToast(`Konto użytkownika zostało ${user.blocked ? 'zablokowane' : 'odblokowane'}.`);
    renderAdminUsers();
}

/* ==========================================================================
   EVENT HANDLERS & INITIALIZATION
   ========================================================================== */

// 1. Role switcher simulator events
const roleButtons = document.querySelectorAll(".role-btn");
roleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Toggle active button class
        roleButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const selectedRole = btn.getAttribute("data-role");
        state.setRole(selectedRole);

        updateNavigationForRole();

        // Navigate to default view for role
        if (selectedRole === "gosc" || selectedRole === "wedkarz") {
            switchView("home-view");
        } else if (selectedRole === "zarzadca") {
            switchView("zarzadca-fisheries-view");
        } else if (selectedRole === "admin") {
            switchView("admin-records-view");
        }
    });
});

// 2. Navigation click events
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        // Avoid standard clicks triggering if it's a special action like logout
        if (link.classList.contains("logout-btn")) {
            // Simulator reset
            document.getElementById("btn-role-gosc").click();
            return;
        }

        const viewId = link.getAttribute("data-view");
        if (viewId) {
            // Update nav links active styling
            const siblingLinks = link.parentElement.querySelectorAll(".nav-link");
            siblingLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            switchView(viewId);
        }
    });
});

// 3. Back buttons
const backToMapBtn = document.getElementById("btn-back-to-map");
if (backToMapBtn) {
    backToMapBtn.addEventListener("click", () => {
        switchView("map-view");
    });
}

const logoBtn = document.getElementById("btn-logo");
if (logoBtn) {
    logoBtn.addEventListener("click", () => {
        if (state.currentRole === "gosc" || state.currentRole === "wedkarz") {
            switchView("home-view");
        } else if (state.currentRole === "zarzadca") {
            switchView("zarzadca-fisheries-view");
        } else if (state.currentRole === "admin") {
            switchView("admin-records-view");
        }
    });
}

// 4. Booking overlay login helper
const resLogin = document.getElementById("btn-reserv-login");
if (resLogin) {
    resLogin.addEventListener("click", () => {
        // Simulate changing role to Fisherman
        document.getElementById("btn-role-wedkarz").click();
    });
}

// 5. Booking form submission
document.getElementById("booking-form").addEventListener("submit", (e) => {
    e.preventDefault();

    if (!currentFisheryDetails || selectedStandId === null) {
        showToast("Błąd: Proszę wybrać stanowisko.", true);
        return;
    }

    const start = document.getElementById("booking-date-start").value;
    const end = document.getElementById("booking-date-end").value;
    const stand = currentFisheryDetails.stands.find(s => s.id === selectedStandId);

    const dateDiff = Math.ceil(Math.abs(new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
    const totalCost = dateDiff * stand.price;

    const newRes = {
        id: Date.now() % 10000,
        userName: state.currentUser ? state.currentUser.name : "Wędkarz Testowy",
        fisheryId: currentFisheryDetails.id,
        fisheryName: currentFisheryDetails.name,
        standId: selectedStandId,
        standName: stand.name,
        dateStart: start,
        dateEnd: end,
        cost: totalCost,
        status: "OCZEKUJACA"
    };

    state.reservations.push(newRes);
    state.saveState();

    showToast("Rezerwacja została wysłana. Oczekuje na zatwierdzenie przez Zarządcę.");

    // Switch to reservations tab
    switchView("wedkarz-reservations-view");

    // Set active nav link
    const navRes = document.getElementById("nav-wedk-res");
    if (navRes) {
        const siblings = navRes.parentElement.querySelectorAll(".nav-link");
        siblings.forEach(l => l.classList.remove("active"));
        navRes.classList.add("active");
    }
});

// 6. Report Catch form submission
document.getElementById("report-catch-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("catch-name").value;
    const species = document.getElementById("catch-species").value;
    const date = document.getElementById("catch-date").value;
    const weight = parseFloat(document.getElementById("catch-weight").value);
    const length = parseFloat(document.getElementById("catch-length").value);
    const fisheryName = document.getElementById("catch-location").value;

    const newCatch = {
        id: Date.now() % 10000,
        userName: state.currentUser ? state.currentUser.name : "Wędkarz Anonimowy",
        name,
        species,
        weight,
        length,
        date,
        fisheryName,
        status: "OCZEKUJACY",
        photo: fileInput.files.length > 0 ? fileInput.files[0].name : ""
    };

    state.catches.push(newCatch);
    state.saveState();

    showToast("Zgłoszenie rekordu wysłano pomyślnie. Trafi do rankingu po zatwierdzeniu przez Admina.");

    // Clear form
    document.getElementById("report-catch-form").reset();
    uploadStatus.textContent = "Kliknij tutaj lub przeciągnij zdjęcie ryby";
    uploadStatus.style.color = "var(--text-secondary)";

    // Navigate to leaderboard
    switchView("records-view");

    // Focus nav link
    const navRec = document.getElementById("nav-wedk-records");
    if (navRec) {
        const siblings = navRec.parentElement.querySelectorAll(".nav-link");
        siblings.forEach(l => l.classList.remove("active"));
        navRec.classList.add("active");
    }
});

document.getElementById("btn-cancel-report").addEventListener("click", () => {
    document.getElementById("report-catch-form").reset();
    uploadStatus.textContent = "Kliknij tutaj lub przeciągnij zdjęcie ryby";
    uploadStatus.style.color = "var(--text-secondary)";
    switchView("map-view");
});

// 7. Auth Tab toggles
const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const formLogin = document.getElementById("login-form");
const formRegister = document.getElementById("register-form");

if (tabLogin && tabRegister && formLogin && formRegister) {
    tabLogin.addEventListener("click", () => {
        tabLogin.classList.add("active");
        tabRegister.classList.remove("active");
        formLogin.classList.remove("hidden");
        formRegister.classList.add("hidden");
    });

    tabRegister.addEventListener("click", () => {
        tabRegister.classList.add("active");
        tabLogin.classList.remove("active");
        formRegister.classList.remove("hidden");
        formLogin.classList.add("hidden");
    });
}

// 8. Auth forms actions (Mock login/register)
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;

    // Check if it's admin or manager or user email from our mock lists
    let matchingUser = state.users.find(u => u.email === email);
    if (!matchingUser) {
        // Create fisherman by default
        matchingUser = { id: 5, name: "Wędkarz Nowy", email: email, role: "wedkarz", blocked: false };
        state.users.push(matchingUser);
        state.saveState();
    }

    if (matchingUser.blocked) {
        showToast("Twoje konto zostało zablokowane przez administratora.", true);
        return;
    }

    // Switch role in simulator visual
    const roleBtn = document.getElementById(`btn-role-${matchingUser.role}`);
    if (roleBtn) roleBtn.click();

    showToast(`Zalogowano pomyślnie jako ${matchingUser.name}`);
});

document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const surname = document.getElementById("reg-surname").value;
    const email = document.getElementById("reg-email").value;
    const role = document.querySelector('input[name="register-role"]:checked').value;

    const newUser = {
        id: Date.now(),
        name: `${name} ${surname}`,
        email: email,
        role: role,
        blocked: false
    };

    state.users.push(newUser);
    state.saveState();

    showToast("Rejestracja zakończona pomyślnie! Zaloguj się na podany e-mail.");
    tabLogin.click();
});

// Map dynamic filters
document.getElementById("filter-search").addEventListener("input", renderMapAndSidebar);
document.getElementById("filter-type").addEventListener("change", renderMapAndSidebar);
document.getElementById("filter-location").addEventListener("input", renderMapAndSidebar);

// Initialize application
function initApp() {
    updateNavigationForRole();
    if (state.currentRole === "gosc" || state.currentRole === "wedkarz") {
        switchView("home-view");
    } else if (state.currentRole === "zarzadca") {
        switchView("zarzadca-fisheries-view");
    } else if (state.currentRole === "admin") {
        switchView("admin-records-view");
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
