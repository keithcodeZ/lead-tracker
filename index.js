let leadList = []
const inputEl = document.querySelector('#input-el')
const inputBtn = document.querySelector('#input-btn')
const ulEl = document.querySelector('#ul-el')
const deleteBtn = document.querySelector('#delete-btn')
const tabBtn = document.querySelector('#tab-btn')
const linksFromLocalStorage = JSON.parse(localStorage.getItem("links"))

//ADD LINK TO LIST
inputBtn.addEventListener("click", function(){
    leadList.push(inputEl.value)
    inputEl.value = ''
    //SAVE TO LOCAL STORAGE
    localStorage.setItem('links', JSON.stringify(leadList))

    
    renderList(leadList)
})

//CHECK IF THERE ARE DATA ON THE LOCAL STORAGE
if (linksFromLocalStorage){
    leadList = linksFromLocalStorage
    renderList(leadList)
}

//SAVE TAB USING CHROME EXTENSION API (CONNECTED VIA MANIFEST.JSON)
tabBtn.addEventListener('click', function(){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        leadList.push(tabs[0].url)
        localStorage.setItem('links', JSON.stringify(leadList))
        renderList(leadList)
    })
})

//DELETE ALL BUTTON
deleteBtn.addEventListener("click", function(){
    leadList = []
    localStorage.clear()
    renderList(leadList)
})

//RENDER LIST IN THE FRONTEND
function renderList(links){
    listItems=''
    for (let i = 0; i < links.length; i++){
        listItems += `
            <li>
                <a target='_blank' href='${links[i]}'>
                    ${links[i]}
                </a>
            </li>
            `
        // console.log(listItems)
    }
    ulEl.innerHTML = listItems
}

console.log(leadList)
