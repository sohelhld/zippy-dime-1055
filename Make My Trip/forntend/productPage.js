const cardContainer = document.querySelector(".flights");

const baseURL = "http://127.0.0.1:3000/products/";

let productsArray = [];
let filterValue = {
  airindia: false,
  spicejet: false,
  emirats: false,
  indigo: false,
  airAsia: false,
  gofirst: false,
};
const res = localStorage.getItem("userPayload");
let userDataFromIndex = JSON.parse(res);

const path = `?To=${userDataFromIndex.to}&from=${userDataFromIndex.form}`;
// const payload={to:userDataFromIndex.to,form:userDataFromIndex.form}
// console.log(path);
const getData = async () => {
  try {
    const response = await fetch(`${baseURL}${path}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // console.log(response);
    productsArray = await response.json();

    //  console.log(productsArray);
    // arrfilter(productsArray);
    flightListGenerator(productsArray);
  } catch (error) {
    console.error(error);
  }
};
getData();
console.log("test:", productsArray);

//filter
const airIndia = document.querySelector("#air_india");
const indigo = document.querySelector("#indigo");
const spice_jet = document.querySelector("#spice_jet");
const emirats = document.querySelector("#emirats");
const airAsia = document.querySelector("#airAsia");

// console.log(airIndia.checked);
airIndia.addEventListener("change", () => {
  if (airIndia.checked) {
    const airIndiaValue = airIndia.value;
    filterValue = { ...filterValue, airindia: airIndiaValue };
    console.log(filterValue);
    arrfilter()
  } else {
    filterValue = { ...filterValue, airindia: false };
    console.log(filterValue);
    flightListGenerator(productsArray)
  }
});

indigo.addEventListener("change", () => {
  if (indigo.checked) {
    const indigoValue = indigo.value;
    filterValue = { ...filterValue, indigo: indigoValue };
    console.log(filterValue);
    arrfilter()
  } else {
    filterValue = { ...filterValue, indigo: false };
    console.log(filterValue);
    flightListGenerator(productsArray)
  }
});

emirats.addEventListener("change", () => {
  if (emirats.checked) {
    // const emiratsValue = emirats.value;
    filterValue = { ...filterValue, emirats: true };
    // console.log(filterValue);
    arrfilter()
  } else {
    filterValue = { ...filterValue, emirats: false };
    console.log(filterValue);
    flightListGenerator(productsArray)
  }
});
// airAsia.addEventListener("change", () => {
//   if (airAsia.checked) {
//     // const airAsiaValue = airAsia.value;
//     filterValue = { ...filterValue, airAsia: true };
//     // console.log(filterValue);
//     arrfilter()
//   } else {
//     filterValue = { ...filterValue, airAsia: false };
//     console.log(filterValue);
//     flightListGenerator(productsArray)
//   }
// });

// console.log(airIndia,airAsia,indigo,airAsia);
function arrfilter() {
  const filterData = productsArray.filter((item, index) => {
    // console.log(item.company == filterValue.airindia);
    return item.company == filterValue.airindia || item.company==filterValue.indigo ||item.company==filterValue.emirats|| item.company==filterValue.airAsia
  });
  console.log('filterData : ' , filterData);
  flightListGenerator(filterData)
}

function flightListGenerator(productsArray) {
  localStorage.setItem("cheackOut",JSON.stringify(productsArray))

  cardContainer.innerHTML = null
  for (let i = 0; i < productsArray.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = flightCardGenerator(productsArray[i],i);
    cardContainer.appendChild(newDiv);
  }
}


function flightCardGenerator({
  company,
  departure_time,
  from,
  To,
  AirClass,
  Arival_time,
  price
},i) {



  const flightCard = `
    <div class="forSingel">
               <span><i class="fa-sharp fa-solid fa-plane"></i><h3>${company}</h3></span>
                <div>
                    <h3>${departure_time}</h3>
                    <h4>FROM:-${from}</h4>
                </div>
                    <h5><--${AirClass}--></h5>
                    <div>
                    <h3>${Arival_time}</h3>
                    <h4>TO:-${To}</h4>
                    </div>
                     <h2>₹${price}</h2>
                    <button class="book" onclick="onbook(${i}) " >Book now</button>
            </div>
        `;


  return flightCard;

}


const onbook=(index)=>{
  const proData= JSON.parse(localStorage.getItem("cheackOut")) 
  console.log(proData[index]);
  localStorage.setItem("checkOutItem",JSON.stringify(proData[index]))
  window.location.href = "./checkOutPage.html";

}




//price low to high
let minPrice = document.querySelector("#minPrice")
let maxPrice = document.querySelector("#maxPrice")
const priceSearchBtn= document.querySelector("#priceSearch")
// console.log(minPrice);

const priceData = async () => {
  const pricePath =`&minPrice=${minPrice.value}&maxPrice=${maxPrice.value}`;
  const veri=`${baseURL}${path}${pricePath}`
  console.log(veri);
  
 // const mainPath = `http://127.0.0.1:3000/products/?To=delhi&from=mumbai&maxPrice=4000&minPrice=3000`
  // console.log(mainPath==veri);
  // console.log(mainPath);
  try {
    const response = await fetch(`${baseURL}${path}${pricePath}`, {
    // const response = await fetch(mainPath, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // console.log(response);
    productsArray = await response.json();

      console.log(productsArray);
    // arrfilter(productsArray);
    flightListGenerator(productsArray);
  } catch (error) {
    console.error(error);
  }
};


priceSearchBtn.addEventListener("click",()=>{

  priceData()
})

  
let loginBtn =  document.querySelector(".loginBtn")
loginBtn.addEventListener("click",()=>{
  window.location.href = "./singuppage.html";
})
