
    
    let myform = document.getElementById('myform');
let messageBox = document.getElementById('messageBox');

myform.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const resume = document.getElementById('resume').value;
    const message = document.getElementById('message').value;

    if (fullname && email && position && resume && message) {
        // Show a "Processing" state
        messageBox.innerHTML = "Processing... ⏳";
        messageBox.className = "success";

        setTimeout(() => {
            messageBox.innerHTML = `
            <div class="card">
                <strong>Thank you!</strong><br>
                👤 Name: ${fullname} ✅<br>
                🆔 email: ${email} ✅<br>
                📚 Position: ${position} ✅<br>
                📄 pdf-document:${resume} <br>
                ✉️ Message:${message} <br> <br>
                <em>Welcome to EduHub!</em>
                <br><br>
                 <button type="button"><a href="./index42.html">close</a></button>
               </div>
            `;
            myform.reset();
        }, 1000);
    } else {
        messageBox.innerHTML = `
        <div class="container">
        <div class="para"><b>Please fill out all fields ❎</b></div>
        <div class="eva">
        <a href="./index42.html"><button type="button">Okay</button></a>
        </div>
        </div>
        `;
        messageBox.className = "error";
    }
    
    messageBox.classList.remove('hidden');
});
