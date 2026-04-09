const formData = document.getElementById('formData')
formData.addEventListener('submit',(e)=>{

    e.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const resume = document.getElementById('resume').value;
    const message = document.getElementById('message').value;

    if(fullname && email && position && resume && message){
        alert(`thank you,
            1.${fullname}✔️
            2.${email}✔️
            3.${position}✔️
            4.${resume}✔️
            5.${message}✔️
            
            your application has been done ✅
            `)
        setTimeout(()=>{
            alert('welcome to Eduhub website learning 🎉');
        },1000);
    }
    formData.reset();
});