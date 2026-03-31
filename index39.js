// Donation scheduler functionality
document.getElementById('donation-scheduler').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('donation-date').value;
    const amount = document.getElementById('donation-amount').value;
    const method = document.getElementById('payment-method-select').value;

    if (date && amount && method) {
        const donationItem = {
            date: date,
            amount: parseFloat(amount),
            method: method
        };

        addScheduledDonation(donationItem);
        alert('Donation scheduled successfully!');
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

function addScheduledDonation(donation) {
    const donationList = document.getElementById('donation-list');
    const li = document.createElement('li');

    const methodNames = {
        'card': 'Credit/Debit Card',
        'paypal': 'PayPal',
        'bank': 'Bank Transfer',
        'crypto': 'Cryptocurrency'
    };

    li.innerHTML = `
        <strong>$${donation.amount.toFixed(2)}</strong> via ${methodNames[donation.method]} on ${formatDate(donation.date)}
        <button class="remove-btn" onclick="removeDonation(this)">Remove</button>
    `;

    donationList.appendChild(li);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function removeDonation(button) {
    button.parentElement.remove();
}

// Smooth scrolling for navigation links
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Set minimum date to today
document.getElementById('donation-date').min = new Date().toISOString().split('T')[0];

// Registration form functionality
document.getElementById('register-btn').addEventListener('click', function() {
    const form = document.getElementById('registration-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    if (form.style.display === 'block') {
        form.scrollIntoView({ behavior: 'smooth' });
    }
});

document.getElementById('cancel-btn').addEventListener('click', function() {
    document.getElementById('registration-form').style.display = 'none';
});

document.getElementById('user-registration').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const userData = {};
    
    // Collect all form fields
    for (let [key, value] of formData.entries()) {
        if (key === 'interests') {
            if (!userData.interests) userData.interests = [];
            userData.interests.push(value);
        } else {
            userData[key] = value;
        }
    }
    
    // Basic validation
    if (!userData['first-name'] || !userData['last-name'] || !userData.email) {
        alert('Please fill in all required fields (First Name, Last Name, Email).');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Process the registration
    console.log('User Registration Data:', userData);
    
    // Show success message
    alert(`Thank you for registering, ${userData['first-name']} ${userData['last-name']}! We will send a confirmation email to ${userData.email}.`);
    
    // Reset form and hide it
    this.reset();
    document.getElementById('registration-form').style.display = 'none';
    
    // Here you would typically send the data to a server
    // For demo purposes, we'll just log it and show a success message
});

// Donation History functionality
document.getElementById('load-history-btn').addEventListener('click', function() {
    const container = document.getElementById('donation-history-container');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
    
    // Update summary stats
    updateDonationSummary();
});

document.getElementById('history-filter').addEventListener('change', function() {
    const filter = this.value;
    filterDonations(filter);
});

function updateDonationSummary() {
    // Sample data - in real app, this would come from server
    const donations = [
        { amount: 50, date: '2026-03-15' },
        { amount: 25, date: '2026-02-28' },
        { amount: 100, date: '2026-01-10' }
    ];
    
    const totalDonations = donations.length;
    const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
    const thisYearAmount = donations
        .filter(donation => new Date(donation.date).getFullYear() === 2026)
        .reduce((sum, donation) => sum + donation.amount, 0);
    
    document.getElementById('total-donations').textContent = totalDonations;
    document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
    document.getElementById('this-year-amount').textContent = `$${thisYearAmount.toFixed(2)}`;
}

function filterDonations(filter) {
    const donationItems = document.querySelectorAll('.donation-item');
    const now = new Date();
    
    donationItems.forEach(item => {
        const dateText = item.querySelector('.donation-date').textContent;
        const itemDate = new Date(dateText);
        let show = true;
        
        switch(filter) {
            case 'this-month':
                show = itemDate.getMonth() === now.getMonth() && 
                       itemDate.getFullYear() === now.getFullYear();
                break;
            case 'last-3-months':
                const threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(now.getMonth() - 3);
                show = itemDate >= threeMonthsAgo;
                break;
            case 'this-year':
                show = itemDate.getFullYear() === now.getFullYear();
                break;
            default:
                show = true;
        }
        
        item.style.display = show ? 'flex' : 'none';
    });
}

function downloadReceipt(donationId) {
    // Sample receipt data
    const receiptData = {
        1: {
            id: 'DON-2026-001',
            amount: '$50.00',
            date: 'March 15, 2026',
            method: 'Credit Card',
            purpose: 'General Education Fund'
        },
        2: {
            id: 'DON-2026-002',
            amount: '$25.00',
            date: 'February 28, 2026',
            method: 'PayPal',
            purpose: 'Scholarship Program'
        },
        3: {
            id: 'DON-2026-003',
            amount: '$100.00',
            date: 'January 10, 2026',
            method: 'Bank Transfer',
            purpose: 'Technology Upgrade Fund'
        }
    };
    
    const receipt = receiptData[donationId];
    if (!receipt) return;
    
    // Create receipt content
    const receiptContent = `
DONATION RECEIPT
================

EduHub Foundation
123 Education Street
Learning City, LC 12345

Receipt ID: ${receipt.id}
Date: ${receipt.date}
Amount: ${receipt.amount}
Payment Method: ${receipt.method}
Purpose: ${receipt.purpose}

Thank you for your generous donation!
Your support helps empower education worldwide.

Tax ID: 12-3456789
For tax purposes, keep this receipt for your records.

Generated on: ${new Date().toLocaleDateString()}
    `;
    
    // Create and download text file
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EduHub_Receipt_${receipt.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Receipt downloaded successfully!');
}

function viewDonationDetails(donationId) {
    const detailsData = {
        1: {
            id: 'DON-2026-001',
            amount: '$50.00',
            date: 'March 15, 2026',
            method: 'Credit Card',
            status: 'Completed',
            transactionId: 'TXN-123456789',
            purpose: 'General Education Fund',
            impact: 'Supports 5 students with learning materials'
        },
        2: {
            id: 'DON-2026-002',
            amount: '$25.00',
            date: 'February 28, 2026',
            method: 'PayPal',
            status: 'Completed',
            transactionId: 'PAY-987654321',
            purpose: 'Scholarship Program',
            impact: 'Helps fund one semester scholarship'
        },
        3: {
            id: 'DON-2026-003',
            amount: '$100.00',
            date: 'January 10, 2026',
            method: 'Bank Transfer',
            status: 'Completed',
            transactionId: 'BANK-456789123',
            purpose: 'Technology Upgrade Fund',
            impact: 'Supports classroom technology upgrades'
        }
    };
    
    const details = detailsData[donationId];
    if (!details) return;
    
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="donation-details">
            <p><strong>Receipt ID:</strong> ${details.id}</p>
            <p><strong>Amount:</strong> ${details.amount}</p>
            <p><strong>Date:</strong> ${details.date}</p>
            <p><strong>Payment Method:</strong> ${details.method}</p>
            <p><strong>Status:</strong> ${details.status}</p>
            <p><strong>Transaction ID:</strong> ${details.transactionId}</p>
            <p><strong>Purpose:</strong> ${details.purpose}</p>
            <p><strong>Impact:</strong> ${details.impact}</p>
            <button onclick="downloadReceipt(${donationId})" class="download-btn" style="margin-top: 15px;">Download Receipt</button>
        </div>
    `;
    
    document.getElementById('donation-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('donation-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('donation-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('download-all-btn').addEventListener('click', function() {
    alert('Downloading all receipts as PDF... (This would generate a PDF with all your donation receipts)');
});

document.getElementById('export-csv-btn').addEventListener('click', function() {
    // Sample CSV data
    const csvContent = `Receipt ID,Date,Amount,Method,Purpose
DON-2026-001,March 15, 2026,$50.00,Credit Card,General Education Fund
DON-2026-002,February 28, 2026,$25.00,PayPal,Scholarship Program
DON-2026-003,January 10, 2026,$100.00,Bank Transfer,Technology Upgrade Fund`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EduHub_Donation_History.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Donation history exported to CSV!');
});

// Back/home button functionality
document.getElementById('back-button').addEventListener('click', function() {
    window.history.back();
});

document.getElementById('home-button').addEventListener('click', function() {
    window.location.href = './index.html';
});

// Navbar actions
document.getElementById('back-nav-btn').addEventListener('click', function() {
    window.history.back();
});

document.getElementById('home-nav-btn').addEventListener('click', function() {
    window.location.href = './index.html';
});