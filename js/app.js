document.addEventListener('DOMContentLoaded', () =>{
    const pokemonID = getRandomID(1,899)
    fetchData(pokemonID)
})


const getRandomID = (min,max) =>{
    return Math.floor(Math.random() * (max - min)) + min
}

const fetchData = async (pokemonID) =>{
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        const data = await res.json()
        
        const pokemon ={
            id:data.id,
            name:data.name,
            experience:data.base_experience,
            hp:data.stats[0].base_stat,
            weight:data.weight,
            height:data.height

        }
        renderCard(pokemon)
    }catch(error){
        console.log(error)
    }
}

const renderCard = (pokemon) =>{
    console.log(pokemon)
    const template = document.getElementById('template-card').content
    const clone = template.cloneNode(true)
    const render = document.querySelector('.flex')
    const fragment = document.createDocumentFragment()
    const url_image = 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/'

    let pokemonID
    
    if(pokemon.id < 100){
        pokemonID = pokemon.id < 10 ? `00${pokemon.id}` : `0${pokemon.id}`
    }else{
        pokemonID = pokemon.id
    }


    clone.querySelector('.card-body-img').setAttribute('src', `${url_image}${pokemonID}.png`)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name}<span>#${pokemon.id}</span>`
    clone.querySelector('.card-body-text').innerHTML = `<span>${pokemon.experience} Exp</span>`
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.hp
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.height/10 + 'm'
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.weight/10 + 'Kg'


    fragment.appendChild(clone)
    render.appendChild(fragment)
}

