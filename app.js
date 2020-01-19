const copyToClipboard = () => {
    let str = 'thisIsMyPassword';
    const element = document.createElement('textarea');
    element.value = str;
    element.setAttribute('readonly','');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    alert('Copied');
};


let emailBtn = document.getElementById('email-btn');


emailBtn.addEventListener('click',copyToClipboard);