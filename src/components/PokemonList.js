import React from 'react';

const PokemonList = ({ pokemonData }) => {
  return (
    <div>
      {pokemonData.map(pokemon => (
        <div key={pokemon.id}>
          <img src={pokemon.image} alt={pokemon.name} />
          <span id="name">{pokemon.name}</span>
          <p>CP: {pokemon.cp}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
          <p>Type: {pokemon.type}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
