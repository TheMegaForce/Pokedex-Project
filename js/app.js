const pokemonCount = 151;
var pokedex = {};

window.onload = async function () {
	for (let i = 1; i <= pokemonCount; i++) {
		await getPokemon(i);

		let pokemon = document.createElement("div");
		pokemon.id = i;

		let firstLetter = pokedex[i]["name"].charAt(0).toUpperCase();
		let remainingLetters = pokedex[i]["name"].substring(1);

		let upperName = firstLetter + remainingLetters;

		pokemon.innerText = i.toString() + ". " + upperName;
		pokemon.classList.add("pokemon-name");
		pokemon.addEventListener("click", updatePokemon);
		$(".pokeList").append(pokemon);
	}
};

async function getPokemon(num) {
	let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

	let res = await fetch(url);
	let pokemon = await res.json();

	let pokeName = pokemon["name"];
	let pokeType = pokemon["types"];
	let pokeHeight = pokemon["height"];
	let pokeWeight = pokemon["weight"];
	let pokeImg = pokemon["sprites"]["front_default"];

	res = await fetch(pokemon["species"]["url"]);
	let pokeDesc = await res.json();

	pokeDesc = pokeDesc["flavor_text_entries"][9]["flavor_text"];

	pokedex[num] = {
		name: pokeName,
		img: pokeImg,
		types: pokeType,
		desc: pokeDesc,
		height: pokeHeight,
		weight: pokeWeight,
	};
}

function updatePokemon() {
	document.getElementById("pokemon-img").src = pokedex[this.id]["img"];
}
