window.onload = checklocalSession
function checklocalSession(){
    if(!document.cookie){
        localStorage.clear()
        window.location.replace('login.html')
    }else{
        document.getElementById('salut').innerHTML = localStorage.getItem('username')
    }
    
}
document.getElementById('registerBtn').addEventListener('click', async () => {
    let name = document.getElementById('username').value
    let password = document.getElementById('password').value
    let role = document.getElementById('role').value
    let repMan = document.getElementById('repMan').value

    // name, password, role, repMan
    // console.log(username, password)
    let url = '/api/empl/createempl'
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            name, password, role, repMan
        })
    }).then((res) => res.json())

    console.log(result)
    if(result){
        document.getElementById('status').innerHTML = 'inserted'
    }
}) 


document.getElementById('logout').addEventListener('click', async () => {
    let url = '/api/auth/logout'
    let result = await fetch(url, {
        method: 'get',
        
    }).then((res) => res.json())
    if(result.response =='loggedout'){
        localStorage.clear()
        window.location.replace('login.html')
    }
})
