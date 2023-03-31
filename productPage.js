const cardContainer = document.querySelector(".flights");

const baseURL = "http://127.0.0.1:3000/products/";
const path = ``;
let productsArray;

const getData = async () => {
  // const payload= localStorage.getItem("payload")
  try {
    const response = await fetch(baseURL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    productsArray = await response.json();
    flightListGenerator(productsArray);
  } catch (error) {
    console.error(error);
  }
};
getData();

function flightListGenerator(productsArray) {
  for (let i = 0; i < productsArray.length; i++) {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = flightCardGenerator(productsArray[i]);
    cardContainer.appendChild(newDiv);
  }
}

function flightCardGenerator({
  company,
  departure_time,
  from,
  AirClass,
  Arival_time,
  price,
}) {
  const flightCard = `
    <div class="forSingel">
                <div>
                    <span><i class="fa-solid fa-plane-departure"></i>${company}</span>
                    <h3>${departure_time}</h3>
                    <h6>${from}</h6>
                </div>
                    <h6>${AirClass}</h6>
                    <h3>${Arival_time}</h3>
                    <h2>${price}</h2>
                    <button class="book">Book now</button>
            </div>
        `;
  return flightCard;
}

