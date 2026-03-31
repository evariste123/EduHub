document.getElementById('course-application').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('app-name').value.trim();
    const email = document.getElementById('app-email').value.trim();
    const area = document.getElementById('app-area').value;

    if (!name || !email || !area) {
        document.getElementById('application-result').textContent = 'Please fill in all required fields.';
        document.getElementById('application-result').style.color = '#dc3545';
        return;
    }

    const admissionData = {
        name,
        email,
        phone: document.getElementById('app-phone').value.trim(),
        area,
        experience: document.getElementById('app-experience').value.trim(),
        date: new Date().toLocaleDateString(),
    };

    // In real app, send data to backend API here
    console.log('Application submitted:', admissionData);

    document.getElementById('application-result').textContent = 'Application submitted successfully! We will contact you shortly with more details.';
    document.getElementById('application-result').style.color = '#198754';

    this.reset();
});