const countriesContainer = document.getElementById("countries");
const searchInput = document.getElementById("searchInput");

let countries = [];

// Function to fetch and display country data
async function fetchCountries() {
  const data = await fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching countries:", error);
      return [];
    });

  return data;
}

async function fetchCountriesByName(name) {
  const data = await fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching countries:", error);
      return [];
    });

  return data;
}

// Function to create a country card
function displayCountries(countries) {
  countriesContainer.innerHTML = "";
  const table = document.createElement("table");
  table.classList.add("table", "table-striped");
  table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Capital</th>
          <th>Region</th>
          <th>Population</th>
          <th>Languages</th>
          <th>Flag</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
  const tbody = table.querySelector("tbody");
  countries.forEach((country) => {
    const row = document.createElement("tr");
    if (country) {
      row.innerHTML = `
        <td>${country.name.common}</td>
        <td>${country.capital}</td>
        <td>${country.region}</td>
        <td>${country.population}</td>
        <td>${Object.keys(country?.languages || {}).join(", ")}</td>
        <td><img width="100" src="${country.flags.svg}" alt="${
        country.name.common
      } Flag" class="flag-img"></td>
      `;
      tbody.appendChild(row);
    }
  });
  countriesContainer.appendChild(table);
}

window.addEventListener("DOMContentLoaded", async () => {
  await fetchCountries().then((data) => {
    console.log(data);
    displayCountries(data);
  });

  searchInput.addEventListener("input", async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    console.log(searchTerm);
    if (searchTerm != "") {
      await fetchCountriesByName(searchTerm).then((data) => {
        const filteredCountries = data.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm)
        );
        displayCountries(filteredCountries);
      });
    } else {
      fetchCountries().then((data) => {
        displayCountries(data);
      });
    }
  });
});
