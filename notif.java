// Smooth scroll for navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.hash) {
            e.preventDefault();
            document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            const targetSection = document.querySelector(this.hash);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        }
    });
});

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

// Contact Form (Client-side demo, requires backend to actually send message)
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // For demo, just show a message
    document.getElementById('formSuccess').textContent = "Thank you for your message! (Backend required to actually send)";
    this.reset();
});