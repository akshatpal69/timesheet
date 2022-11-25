window.onload = checklocalSession
function checklocalSession(){
    if(!document.cookie){
        localStorage.clear()
        window.location.replace('login.html')
    }else{
        document.getElementById('salut').innerHTML = localStorage.getItem('username')
    }
}
// console.log(name, date, hours, description, remarks)
document.getElementById('getrating').addEventListener("click", async()=>{
    // let name= document.getElementById('name').value
    let name = localStorage.getItem('username')
    console.log(name)
    let url = '/api/empl/getrating'
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    }).then((res) => res.json())
    console.log(result)
    if(result){

        document.getElementById('getrating').value = result.response
    }
})
document.getElementById('submitDetails').addEventListener('click', async () => {
    let name = document.getElementById('name').value
    let date = document.getElementById('date').value
    let hours = document.getElementById('hours').value
    let description = document.getElementById('description').value
    let remarks = document.getElementById('remarks').value

    let url = '/api/timesheet/entertime'
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, date, hours, description, remarks
        })
    }).then((res) => res.json())
    console.log(result)
    if(result){

        document.getElementById('result').innerHTML = 'ok'
    }
})

document.getElementById('fetchTaskBtn').addEventListener('click', async () => {
    let name = localStorage.getItem("username");
    let url = '/api/task/fetchtask'
    let result = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    }).then((res) => res.json())
    if(result){
        console.log(result)
 data = result
        document.getElementById('fetchTask').innerHTML = data.task
        
    }
})







document.getElementById('logout').addEventListener('click', async () => {
    let url = '/api/auth/logout'
    let result = await fetch(url, {
        method: 'get'
        
    }).then((res) => res.json())
    if(result.response =='loggedout'){
        localStorage.clear()
        window.location.replace('login.html')
    }
})


// document.getElementById('fetchToEdit').addEventListener('click', () => {
//     console.log('clicked')
// })
// document.getElementById('nameEdit').addEventListener('click', () => {
//     console.log('clicked')
// })
// document.getElementById('dateEdit').addEventListener('click', () => {
//     console.log('clicked')
// })

// document.getElementById('hoursEdit').addEventListener('click', () => {
//     console.log('clicked')
// })
// document.getElementById('descriptionEdit').addEventListener('click', () => {
//     console.log('clicked')
// })

// document.getElementById('remarksEdit').addEventListener('click', () => {
//     console.log('clicked')
// })


