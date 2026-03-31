// Search functionality
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        const title = skill.querySelector('h3').textContent.toLowerCase();
        const desc = skill.querySelector('.short-desc').textContent.toLowerCase();
        if (title.includes(query) || desc.includes(query)) {
            skill.style.display = 'block';
        } else {
            skill.style.display = 'none';
        }
    });
});

// Toggle descriptions
document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', function() {
        const fullDesc = this.previousElementSibling;
        if (fullDesc.style.display === 'none') {
            fullDesc.style.display = 'block';
            this.textContent = 'Read Less';
        } else {
            fullDesc.style.display = 'none';
            this.textContent = 'Read More';
        }
    });
});

// Animate progress bars
document.querySelectorAll('.progress-fill').forEach(fill => {
    const progress = fill.getAttribute('data-progress');
    setTimeout(() => {
        fill.style.width = progress + '%';
    }, 500);
});

// Optional: Update progress button (for demo)
function updateProgress(courseIndex, newProgress) {
    const fills = document.querySelectorAll('.progress-fill');
    if (fills[courseIndex]) {
        fills[courseIndex].style.width = newProgress + '%';
        fills[courseIndex].setAttribute('data-progress', newProgress);
        fills[courseIndex].nextElementSibling.textContent = newProgress + '%';
    }
}

// Example: Add a button to increase progress for first course
const dashboard = document.getElementById('student-dashboard');
const updateBtn = document.createElement('button');
updateBtn.textContent = 'Increase Progress for Data Analysis';
updateBtn.addEventListener('click', () => updateProgress(1, 90));
dashboard.appendChild(updateBtn);