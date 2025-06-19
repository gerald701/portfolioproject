document.getElementById('registrationForm','course').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.fullname.value;
    const course = this.course.value;
    alert(`Registration Successful!\nWelcome, ${name}, ${course}!` );
    this.reset();
   });