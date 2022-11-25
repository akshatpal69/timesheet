window.onload = checklocalSession
function checklocalSession() {
    if (!document.cookie) {
        localStorage.clear()
        window.location.replace('login.html')
    } else {
        document.getElementById('salut').innerHTML = localStorage.getItem('username')
    }
}
let fetchedUser = ''
let fetchAllBTN = document.getElementById('fetchAllBTN')

let fetchAllDIV = document.getElementById('fetchAll')

fetchAllBTN.addEventListener('click', async () => {
    let url = '/api/empl/getall'
    let result = await fetch(url, {
        method: 'get'
    }).then((res) => res.json())
    console.log(result)
    if (result) {

        console.log()
        for (i = 0; i < Object.keys(result.allAdmin).length; i++) {

            fetchedUser += result.allAdmin[i]._id + '<br>'

        }
        for (i = 0; i < Object.keys(result.allManager).length; i++) {

            fetchedUser += result.allManager[i]._id + '<br>'

        }
        for (i = 0; i < Object.keys(result.allEMpl).length; i++) {

            fetchedUser += result.allEMpl[i]._id + '<br>'

        }
        document.getElementById('fetchAllDIV').innerHTML = fetchedUser
    }
})



document.getElementById('logout').addEventListener('click', async () => {
    let url = '/api/auth/logout'
    let result = await fetch(url, {
        method: 'get'

    }).then((res) => res.json())
    if (result.response == 'loggedout') {
        localStorage.clear()
        window.location.replace('login.html')
    }
})

