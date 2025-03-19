document.addEventListener('DOMContentLoaded', function() {
    // Primer podaci gostiju - u pravoj aplikaciji bi došli iz baze podataka
    const defaultGuests = [
        { id: 1, name: "Marko Marković", category: "family", status: "coming", email: "marko@example.com", phone: "063-123-4567", note: "Dolazi sa suprugom" },
        { id: 2, name: "Jana Janković", category: "friends", status: "maybe", email: "jana@example.com", phone: "064-234-5678", note: "Zavisi od smene na poslu" },
        { id: 3, name: "Petar Petrović", category: "colleagues", status: "coming", email: "petar@example.com", phone: "065-345-6789", note: "" },
        { id: 4, name: "Ana Anić", category: "family", status: "not-coming", email: "ana@example.com", phone: "066-456-7890", note: "Na putovanju je tada" },
        { id: 5, name: "Milan Milanović", category: "friends", status: "coming", email: "milan@example.com", phone: "067-567-8901", note: "" },
        { id: 6, name: "Jelena Jelenić", category: "colleagues", status: "pending", email: "jelena@example.com", phone: "068-678-9012", note: "" },
        { id: 7, name: "Nikola Nikolić", category: "family", status: "coming", email: "nikola@example.com", phone: "069-789-0123", note: "Dolazi sa decom" },
        { id: 8, name: "Ivana Ivanović", category: "friends", status: "not-coming", email: "ivana@example.com", phone: "060-890-1234", note: "Ima drugi događaj" },
        { id: 9, name: "Dušan Dušanović", category: "colleagues", status: "coming", email: "dusan@example.com", phone: "061-901-2345", note: "" },
        { id: 10, name: "Tamara Tomić", category: "other", status: "maybe", email: "tamara@example.com", phone: "062-012-3456", note: "Kasniće" }
    ];
    
    // Učitavanje podataka iz localStorage (ako postoje) ili korišćenje podrazumevanih
    let guests;
    const storedGuests = localStorage.getItem('birthdayGuests');
    
    if (storedGuests) {
        guests = JSON.parse(storedGuests);
        // Dodajemo i podrazumevane goste ako ih već nema
        if (guests.length === 0) {
            guests = defaultGuests;
            localStorage.setItem('birthdayGuests', JSON.stringify(guests));
        }
    } else {
        guests = defaultGuests;
        localStorage.setItem('birthdayGuests', JSON.stringify(guests));
    }
    
    // Funkcija za prikazivanje gostiju u tabeli
    function displayGuests(guestList) {
        const tableBody = document.getElementById('guests-table-body');
        tableBody.innerHTML = '';
        
        guestList.forEach(guest => {
            const row = document.createElement('tr');
            
            // Dodajemo status klasu za bojenje
            let statusClass = '';
            switch(guest.status) {
                case 'coming':
                    statusClass = 'status-coming';
                    break;
                case 'maybe':
                    statusClass = 'status-maybe';
                    break;
                case 'not-coming':
                    statusClass = 'status-not-coming';
                    break;
                case 'pending':
                    statusClass = 'status-pending';
                    break;
            }
            
            // Formatiranje teksta statusa za prikazivanje
            let statusText = '';
            switch(guest.status) {
                case 'coming':
                    statusText = 'Dolazi';
                    break;
                case 'maybe':
                    statusText = 'Možda';
                    break;
                case 'not-coming':
                    statusText = 'Ne dolazi';
                    break;
                case 'pending':
                    statusText = 'Nije odgovoreno';
                    break;
            }
            
            // Formatiranje kategorije za prikazivanje
            let categoryText = '';
            switch(guest.category) {
                case 'family':
                    categoryText = 'Porodica';
                    break;
                case 'friends':
                    categoryText = 'Prijatelji';
                    break;
                case 'colleagues':
                    categoryText = 'Kolege';
                    break;
                case 'other':
                    categoryText = 'Ostalo';
                    break;
            }
            
            row.innerHTML = `
                <td>${guest.name}</td>
                <td>${categoryText}</td>
                <td class="${statusClass}">${statusText}</td>
                <td>${guest.email}</td>
                <td>${guest.phone}</td>
                <td>${guest.note}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Inicijalno prikazi sve goste
    displayGuests(guests);
    
    // Ažuriranje statistike
    function updateStats() {
        const total = guests.length;
        const coming = guests.filter(g => g.status === 'coming').length;
        const maybe = guests.filter(g => g.status === 'maybe').length;
        const notComing = guests.filter(g => g.status === 'not-coming').length;
        
        document.getElementById('total-guests').textContent = total;
        document.getElementById('coming-guests').textContent = coming;
        document.getElementById('maybe-guests').textContent = maybe;
        document.getElementById('not-coming-guests').textContent = notComing;
    }
    
    updateStats();
    
    // Funkcionalnost filtriranja
    document.getElementById('apply-filter').addEventListener('click', function() {
        const statusFilter = document.getElementById('filter-status').value;
        const categoryFilter = document.getElementById('filter-category').value;
        const searchFilter = document.getElementById('filter-search').value.toLowerCase();
        
        const filteredGuests = guests.filter(guest => {
            // Filtriranje po statusu
            if (statusFilter !== 'all' && guest.status !== statusFilter) {
                return false;
            }
            
            // Filtriranje po kategoriji
            if (categoryFilter !== 'all' && guest.category !== categoryFilter) {
                return false;
            }
            
            // Filtriranje po tekstu pretrage
            if (searchFilter && !guest.name.toLowerCase().includes(searchFilter)) {
                return false;
            }
            
            return true;
        });
        
        displayGuests(filteredGuests);
    });
    
    // Reset filtera
    document.getElementById('reset-filter').addEventListener('click', function() {
        document.getElementById('filter-status').value = 'all';
        document.getElementById('filter-category').value = 'all';
        document.getElementById('filter-search').value = '';
        
        displayGuests(guests);
    });
});