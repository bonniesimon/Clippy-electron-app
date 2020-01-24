const ipc = require('electron').ipcRenderer;

const loginPassword = document.querySelector('input');
const submitBtn = document.querySelector('button');


submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log(loginPassword.value)
    if(loginPassword.value == "admin"){
        console.log("Succesfull login");
        ipc.sendSync('entry-accepted', 'ping');
    }
})