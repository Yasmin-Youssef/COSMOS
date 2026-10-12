const plantsUrl =`https://solar-system-opendata-proxy.vercel.app/api/planets`;
let planetCards =document.querySelectorAll(".planet-card");
let planetDataImage=document.getElementById("planet-detail-image");
let planeDetailName=document.getElementById("planet-detail-name");
let planetDetailDescription=document.getElementById("planet-detail-description");
let planetDistance=document.getElementById("planet-distance");
let planetRadius=document.getElementById("planet-radius");
let planetMass =document.getElementById("planet-mass");
let planetDensity =document.getElementById("planet-density");
let planetOrbitalPeriod=document.getElementById("planet-orbital-period");
let planetRotation=document.getElementById("planet-rotation");
let planetMoons=document.getElementById("planet-moons");
let planetGravity=document.getElementById("planet-gravity");
let planetDiscoverer=document.getElementById("planet-discoverer");
let planetDiscoveryDate=document.getElementById("planet-discovery-date");
let planetBodyType=document.getElementById("planet-body-type");
let planetPerihelion=document.getElementById("planet-perihelion");
let planetEccentricity=document.getElementById("planet-eccentricity");
let planetInclination=document.getElementById("planet-inclination");
let planetAxialTilt=document.getElementById("planet-axial-tilt");
let planetTemp=document.getElementById("planet-temp");
let planetEscape=document.getElementById("planet-escape");

function getDataPlants(dataPlants) {
planetCards.forEach((card) => { 
  card.addEventListener("click", ()=>
  {

            const planetId = card.dataset.planetId;
            console.log(planetId);
             showPlantClick(dataPlants , planetId)
            
  });

});
  }
  function showPlantClick(dataPlants ,planetId){
  const selectPlants=dataPlants.bodies.find((plant) => {
    return plant.id ===  planetId;
  })
  console.log(selectPlants);
  
    planetDataImage.src=selectPlants.image;
    planeDetailName.textContent=selectPlants.englishName;
    planetDetailDescription.textContent=selectPlants.description;
    planetDistance.textContent=`${(selectPlants.semimajorAxis/1000000).toFixed(1)}M Km`;
    planetRadius.textContent=`${Math.round(selectPlants.meanRadius)} Km`;
    planetMass.textContent=`${selectPlants.mass.massValue} × 10²⁴ kg`;
    planetDensity.textContent=`${(selectPlants.density).toFixed(2)} g/cm³`;
    planetOrbitalPeriod.textContent=`${selectPlants.sideralOrbit.toFixed(2)} days`;
    planetRotation.textContent=`${selectPlants.sideralRotation.toFixed(2)} hours`;
    planetMoons.textContent=selectPlants.moons ? selectPlants.moons.length : 0;
    planetGravity.textContent=`${selectPlants.gravity.toFixed(2)} m/s²`;
    planetDiscoverer.textContent=selectPlants.discoveredBy || "Known since antiquity";
    planetDiscoveryDate.textContent=selectPlants.discoveryDate || "Ancient times";
    planetBodyType.textContent=selectPlants.bodyType;
    planetPerihelion.textContent=`${(selectPlants.perihelion/1000000).toFixed(1)}M km`;
    planetEccentricity.textContent=selectPlants.eccentricity.toFixed(5);
    planetInclination.textContent=`${selectPlants.inclination.toFixed(2)}°`;
    planetAxialTilt.textContent=`${selectPlants.axialTilt.toFixed(2)}°`
    planetTemp.textContent=`${selectPlants.avgTemp}°C`;
    planetEscape.textContent=`${(selectPlants.escape/1000).toFixed(2)} km/s`
}
async function getApiPlants(){
const apiPlants=await fetch(plantsUrl);
const responsePlants =await apiPlants.json();
console.log(responsePlants);
 
return responsePlants;
}

export async function displayPlants(){
    const dataPlants=await getApiPlants();
    getDataPlants(dataPlants);
}