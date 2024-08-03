document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();

    const countryFilter = document.getElementById('country-filter');
    countryFilter.addEventListener('change', filterPlaces);
});

function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');

    if (!token) {
        loginLink.style.display = 'block';
    } else {
        loginLink.style.display = 'none';
        fetchPlaces(token);
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

async function fetchPlaces(token) {
    try {
        const response = await fetch('https://your-api-url/places', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const places = await response.json();
            displayPlaces(places);
            populateCountryFilter(places);
        } else {
            console.error('Failed to fetch places:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching places:', error);
    }
}

function displayPlaces(places) {
    const placesList = document.getElementById('places-list');
    placesList.innerHTML = ''; // Clear the current content

    places.forEach(place => {
        const placeDiv = document.createElement('div');
        placeDiv.className = 'place';

        placeDiv.innerHTML = `
            <h2>${place.name}</h2>
            <p><strong>Host:</strong> ${place.host}</p>
            <p><strong>Price per night:</strong> ${place.price}</p>
            <p><strong>Location:</strong> ${place.location}</p>
            <p><strong>Description:</strong> ${place.description}</p>
            <p><strong>Amenities:</strong> ${place.amenities.join(', ')}</p>
        `;

        placesList.appendChild(placeDiv);
    });
}

function populateCountryFilter(places) {
    const countryFilter = document.getElementById('country-filter');
    const countries = [...new Set(places.map(place => place.location))];

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countryFilter.appendChild(option);
    });
}

function filterPlaces(event) {
    const selectedCountry = event.target.value;
    const placesList = document.getElementById('places-list');
    const places = placesList.getElementsByClassName('place');

    Array.from(places).forEach(place => {
        const location = place.querySelector('p strong:contains("Location:")').nextSibling.textContent.trim();
        if (selectedCountry === '' || location === selectedCountry) {
            place.style.display = 'block';
        } else {
            place.style.display = 'none';
        }
    });
}
