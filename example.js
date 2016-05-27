let state = {
    items: [
        { name: 'hi' }
    ],
    categories: [], 
}

const render = () => {
    const app = document.querySelector('#app')
    // blow away old app
    app.textContent = null

    state.categories.forEach((category) => {
        // { id: 123, name: 'Meat' }
        //
        // <ul class="list">
        //   <li class="list-header">Meat</li>
        //   <li class="item">Beef</li>
        //   <li class="item">Ham</li>
        // </ul>

        // list
        const listEl = document.createElement('ul')
        listEl.setAttribute('class', 'list')

        // header
        const headerEl = document.createElement('li')
        headerEl.setAttribute('class', 'list-header')
        headerEl.textContent = category.name
        listEl.appendChild(headerEl)

        //input item
        const inputEl = document.createElement('input')
        inputEl.setAttribute('placeholder', 'Add Item')
        listEl.appendChild(inputEl)
        listEl.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                // enter key
                case 13:
                    //create item
                    createItem({
                        id: String(Math.random()).slice(2), // fake random id
                        categoryId: category.id,
                        name: e.target.value
                    })
                    break
                default:
                    break
            }
        })

        // items
        state.items.forEach((item) => {
            if (item.categoryId === category.id) {
                // <li class="item">Beef</li>
                const removeEl = document.createElement('button')
                removeEl.addEventListener('click', () => {
                    removeItem(item.id)
                })
                removeEl.textContent = 'X'

                const itemEl = document.createElement('li')
                itemEl.setAttribute('class', 'item')
                itemEl.textContent = item.name
                itemEl.appendChild(removeEl)
                listEl.appendChild(itemEl)
            }
        })
        app.appendChild(listEl)

    })

}

// render the initial state
render()

const setState = (newState) => {
    Object.assign(state, newState)
    console.log(state)
    render()
}

////////////////////////////////////////////////////////////////////////////////////////

function getItems() {
    axios.get('https://ssla-lt.herokuapp.com/items')
        .then((res) => {
            setState({
                items: res.data,
            })
        })
}

function removeItem(id) {
    axios.delete(`https://ssla-lt.herokuapp.com/items/${id}`)
        .then(res => {
            getItems()
        })
}

function createItem(item) {
    axios.post('https://ssla-lt.herokuapp.com/items', item)
        .then ((res) => {
            getItems()
        })
}

function getCategories() {
    axios.get('https://ssla-lt.herokuapp.com/categories')
        .then((res) => {
            setState({
                categories: res.data,
            })
        })
}

function getAllData() {
    getItems()
    getCategories()
}

// init
getAllData()