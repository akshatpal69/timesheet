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
// document.getElementById('givetaskbtn').addEventListener('click', async () => {
//     let task = document.getElementById('taskvalue').value
//     let name = document.getElementById('name').value

//     let url = '/api/task/givetask'
//     let result = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name, task
//         })
//     }).then((res) => res.json())
//     console.log(result)
//     if (result){
//         // document.getElementById('status').innerHTML = 'given task to the employee ' + result.result.name
//         document.getElementById('status').innerHTML = 'given task to  ' + name + ' with ' + task

//     }
// })


document.getElementById('getUserBtn').addEventListener('click', async () => {
    let name = document.getElementById('name').value
    // let repMan = localStorage.getItem('username')
    // console.log(repMan)
    let url = '/api/timesheet/gettimesheet'
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
        console.log(Object.keys(result.result).length)
        console.log(result.result)
        // fetchedUserName = result.result.name
        document.getElementById('status').innerHTML = 'fetched now you can rate the employee ' + result.result.name
        // fetchedUser = result.result
        // fetchAllDIV.innerHTML
        name = result.result.name
        date = result.result.date
        hours = result.result.hours
        description = result.result.description
        remarks = result.result.remarks
        details = name + '<br>' + date + '<br>' + hours + '<br>' + description + '<br>' + remarks
        detailsDIV.innerHTML = details
    }
})

document.getElementById('rateUserBtn').addEventListener('click', async () => {
    let rating = document.getElementById('ratingValue').value
    let name = document.getElementById('name').value
    console.log(rating, fetchedUser)
    let url = '/api/empl/rateempl'
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, rating
        })
    }).then((res) => res.json())
    if (result) {
        console.log(result)
        document.getElementById('status').innerHTML = 'ratedEmployee ' + result.name + ' with ' + result.response
        // fetchedUser = result.response
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

