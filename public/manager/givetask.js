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
let fetchedUserName
let detailsDIV = document.getElementById('details')
// fetchAll.addEventListener('click', async () => {
//     let url = '/api/empl/getemplall'
//     let result = await fetch(url, {
//         method: 'get'
//     }).then((res) => res.json())
//     console.log(result)

//     // result.forEach(key => {
//     //     fetchAll.innerHTML+= result
//     // });
//     if (result) {
//         console.log(Object.keys(result.result).length)
//         for (i = 0; i < Object.keys(result.result).length; i++) {
//             console.log(i)
//             console.log(result.result[i])
//             fetchedUser+= result.result[i]._id+'<br>'
//             // console.log(fetchedUser)
//         }
//         document.getElementById('fetchAll').innerHTML = fetchedUser
//     }

// })
document.getElementById('givetaskbtn').addEventListener('click', async () => {
    let task = document.getElementById('taskvalue').value
    let name = document.getElementById('name').value

    let url = '/api/task/givetask'
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, task
        })
    }).then((res) => res.json())
    console.log(result)
    if (result){
        // document.getElementById('status').innerHTML = 'given task to the employee ' + result.result.name
        document.getElementById('status').innerHTML = 'given task to  ' + name + ' with ' + task

    }
})


document.getElementById('getUserBtn').addEventListener('click', async () => {
    let name = document.getElementById('name').value
    // let repMan = localStorage.getItem('username')
    // console.log(repMan)
    let url = '/api/empl/getempl'
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    }).then((res) => res.json())
    if (result) {
        // console.log(Object.keys(result.result).length)
        console.log(result)
        fetchedUserName = result.name
        document.getElementById('status').innerHTML = 'fetched now you can give task to  the employee ' + result.name
        // fetchedUser = result.result
        // fetchAllDIV.innerHTML
        name = result.name
        password = result.password
        role = result.role
        repMan = result.repMan
        details = name + '<br>' + password + '<br>' + role + '<br>' + repMan + '<br>' 
        detailsDIV.innerHTML = details
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

