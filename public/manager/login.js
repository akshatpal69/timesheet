
document.getElementById('loginBtn').addEventListener('click', async () => {
    let name = document.getElementById('username').value
    let password = document.getElementById('password').value
    console.log(name, password)
    let url = '/api/auth/authmanager'
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            name, password
        })
    }).then((res) => res.json())

    console.log(result)
    
    if(result.cookieStatus = 'loggedin'){
        localStorage.setItem('username',result.name)
        // localStorage.setItem("key", "value");
        window.location.replace('index.html')
    }
}) 
console.log(document.cookie.length)
if(document.cookie){
    window.location.replace('index.html')

}