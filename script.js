// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });
    
    // RSVP Form Handling
    document.getElementById('submit-rsvp').addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const status = document.getElementById('status').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email) {
            alert('Molimo vas da popunite obavezna polja: ime i email.');
            return;
        }
        
        // U pravoj aplikaciji, ovde bi se podaci slali serveru
        // Za primer, samo prikazujemo poruku
        alert(`Hvala, ${name}! Vaša potvrda je uspešno poslata.`);
        
        // Čišćenje forme
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        
        // Opciono: Čuvanje podataka u localStorage da bi bili dostupni na admin stranici
        // U pravoj aplikaciji ovo bi se čuvalo u bazi podataka
        const guests = JSON.parse(localStorage.getItem('birthdayGuests') || '[]');
        guests.push({
            id: Date.now(),
            name: name,
            email: email,
            status: status,
            message: message,
            category: 'other', // Podrazumevana kategorija
            phone: ''
        });
        localStorage.setItem('birthdayGuests', JSON.stringify(guests));
    });
});