function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then(states => {

            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }
        })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    console.log(event.target.value)

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
        .then((res) => { return res.json() })
        .then(cities => {

            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



// itens de coleta
// pegar todos os li
const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}
 const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    // adicionar ou remover classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ', itemId)


 // verificar se existem items selecionados, se sim: Pegar selecionados
    const alreadySelected = selectedItems.findIndex(function(item) {
        const itemFound = item == itemId //true ou false
        return itemFound
    })
   
    // se ja estiver selecionado,
    if(alreadySelected >= 0){
        // tirar da seleção
        const filteredItems = selectedItems.filter( item  => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
    // se não estiver, adicionar a seleção
        selectedItems.push(itemId)
    }
    // console.log('seçectedItems: ', selectedItems)
    collectedItems.value = selectedItems
    //atualizar o campo escondido com os items selecionados
}
