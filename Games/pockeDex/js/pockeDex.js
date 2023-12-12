const pokedex = document.getElementById('pokedex');
const searchInput = document.getElementById('searchInput');
const recentSearchesDropdown = document.getElementById('recentSearches');
const searchButton = document.getElementById('searchButton');

let latestSearches = [];


const fetchPokemonData = async (name) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return {
            name: data.name,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', '),
            id: data.id
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // or handle the error in some way
    }
};

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    // console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const updateRecentSearches = () => {
    recentSearchesDropdown.innerHTML = latestSearches.map(search => `<option value="${search}"></option>`).join('');
};

const searchPokemon = async (event) => {  // Add `event` as a parameter
    if (event.type === 'click') {  // Check if the event is a click event
        const searchTerm = searchInput.value.toLowerCase();

        if (searchTerm.trim() === '') {
            // If search is cleared, or name isn't provided, fetch and display all Pokémon
            fetchPokemon();
        } else {
            const pokemonData = await fetchPokemonData(searchTerm);

            if (pokemonData !== null) {
                // If a match is found, clear the screen and display only the desired Pokémon
                displayPokemon([pokemonData]);
                
                // Add to recent searches and update dropdown
                latestSearches.unshift(searchTerm);
                if (latestSearches.length > 5) {
                    latestSearches.pop();
                }
                updateRecentSearches();
            } else {
                alert(`Pokemon with name "${searchTerm}" not found!`);
            }
        }
    }
};


searchButton.addEventListener('click', searchPokemon);
fetchPokemon();