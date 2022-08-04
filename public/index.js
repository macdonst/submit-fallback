function addCat(event) {
    const ul = document.querySelector("ul")
    const li = document.createElement("li")
    const img = document.createElement("img")
    img.src = event.detail.url
    img.width = 300
    li.appendChild(img)
    ul.appendChild(li)
}

document.addEventListener('new-cat', addCat)
