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
	console.log(pokemon);

	let pokeName = pokemon["name"];

	let pokeType1 = pokemon["types"][0]["type"]["name"];
	let pokeType2 = pokemon["types"][1]
		? pokemon["types"][1]["type"]["name"]
		: pokemon["types"][0]["type"]["name"];

	let pokeHeight = pokemon["height"];
	let pokeWeight = pokemon["weight"];
	let pokeImg = pokemon["sprites"]["front_default"];
	let pokeHP = pokemon["stats"][0]["base_stat"];
	let pokeATK = pokemon["stats"][1]["base_stat"];
	let pokeDEF = pokemon["stats"][2]["base_stat"];

	pokedex[num] = {
		name: pokeName,
		img: pokeImg,
		type1: pokeType1,
		type2: pokeType2,
		// desc: pokeDesc,
		height: pokeHeight,
		weight: pokeWeight,
		hp: pokeHP,
		atk: pokeATK,
		def: pokeDEF,
	};
}

function updatePokemon() {
	document.getElementById("pokemon-img").src = pokedex[this.id]["img"];
	document.getElementById("height").innerText =
		"Height: " + pokedex[this.id]["height"];
	document.getElementById("weight").textContent =
		"Weight: " + pokedex[this.id]["weight"];
	document.getElementById("type1").innerText =
		pokedex[this.id]["type1"].toUpperCase();
	document.getElementById("type2").innerText =
		pokedex[this.id]["type2"].toUpperCase();
	document.getElementById("HP").innerText = " " + pokedex[this.id]["hp"];
	document.getElementById("ATK").innerText = " " + pokedex[this.id]["atk"];
	document.getElementById("DEF").innerText = " " + pokedex[this.id]["def"];
}
