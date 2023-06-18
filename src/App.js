import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const pageSize = 10; // Number of Pokemon per page
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        const results = response.data.results;

        // Fetch details for each Pokemon
        const pokemonDetailsPromises = results.map(async pokemon => {
          const detailResponse = await axios.get(pokemon.url);
          const detailData = detailResponse.data;

          // Extract necessary details from the response
          const { id, name, sprites, stats, types } = detailData;
          const image = sprites.front_default;
          const cp = stats[0].base_stat;
          const attack = stats[1].base_stat;
          const defense = stats[2].base_stat;
          const type = types.map(type => type.type.name).join(', ');

          return { id, name, image, cp, attack, defense, type };
        });

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemonList(pokemonDetails);

        // Set the initial Pokemon data and calculate total pages
        setPokemonData(pokemonDetails);
        const totalPages = Math.ceil(pokemonDetails.length / pageSize);
        setTotalPages(totalPages);
      } catch (error) {
        console.log('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    // Filter Pokemon data based on the search term and current page
    const filteredData = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = filteredData.slice(startIndex, endIndex);
    setPokemonData(pageData);

    // Calculate total pages based on the filtered data length
    const totalPages = Math.ceil(filteredData.length / pageSize);
    setTotalPages(totalPages);
  }, [currentPage, searchTerm, pokemonList]);

  const handlePrevious = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSearch = event => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <PokemonList pokemonData={pokemonData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </div>
  );
};

export default App;
