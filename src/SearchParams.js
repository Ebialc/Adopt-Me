import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";

import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, updateLocation] = useState("");
  const [animal, updateAnimal] = useState("");
  const [breed, updateBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  const [pets,setPets] =useState([]);

useEffect(() => {
  requestPets();
}, []);

async function requestPets() {
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  )
  const json = await res.json();

  setPets(json.pets);

}

  return (
    <div className="search-params">
      <form
      onSubmit={e => {
        e.preventDefault();
        requestPets();
      }
      }
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => updateLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              updateAnimal(e.target.value);
              updateBreed("");
            }}
            onBlur={(e) => {
              updateAnimal(e.target.value);
              updateBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => updateBreed(e.target.value)}
            onBlur={(e) => updateBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          theme
          <select
          value={theme}
          onChange={e => setTheme(e.target.value)}
          onBlur={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme}}>Submit</button>
      </form>
      <Results pets={pets}/>
    </div>
  );
};

export default SearchParams;