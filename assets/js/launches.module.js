const lunchesUrl = `https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?format=json&limit=10`;
const nameLunches = document.getElementById("name-lunches");
const abbrevLunches = document.getElementById("abbrev-lunches");
const dateLunches = document.getElementById("date-lunches");
const launchServiceProvider = document.getElementById("launch_service_provider");
const rocketName = document.getElementById("rocket-name");
const timeLunches = document.getElementById("time-lunches");
const locationName = document.getElementById("location-name");
const countryName = document.getElementById("country-name");
const description = document.getElementById("description");
const launchImage = document.getElementById("launch-image");
const daysUntilLaunch = document.getElementById("days-until-launch");
const launchesGrid = document.getElementById("launches-grid");
let dateLunchesApi;
let dateFormattedApi;
let timeFormattedApi;
function getDataLunches(dataLunches) {
  dateLunchesApi = new Date(dataLunches.results[0].net)
  const today = new Date();
  dateFormattedApi = dateLunchesApi.toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric", weekday: "long" })
  timeFormattedApi = dateLunchesApi.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "UTC", hour12: true });
  nameLunches.textContent = dataLunches.results[0].name;
  abbrevLunches.textContent = dataLunches.results[0].status.abbrev;
  dateLunches.textContent = dateFormattedApi;
  launchServiceProvider.textContent = dataLunches.results[0].launch_service_provider.name;
  rocketName.textContent = dataLunches.results[0].rocket.configuration.name;
  timeLunches.innerHTML = `${timeFormattedApi} UTC`;
  locationName.textContent = dataLunches.results[0].pad.location.name;
  countryName.textContent = dataLunches.results[0].pad.country.name;
  description.textContent = dataLunches.results[0].mission.description;

const imageUrlTop = dataLunches.results[0].image?.image_url;

launchImage.src = imageUrlTop || "./assets/images/launch-placeholder.png";

launchImage.onerror = () => {
    launchImage.src = "./assets/images/launch-placeholder.png";
};


  const different = dateLunchesApi - today;
  const days = Math.ceil(different / (24 * 60 * 60 * 1000));
  daysUntilLaunch.textContent = days;
}

async function getApiLaunches() {
  const apiLunches = await fetch(lunchesUrl);
  const responseLunches = await apiLunches.json();
  console.log(responseLunches);
  return responseLunches;
}

export async function displayLunches() {
  const dataLunches = await getApiLaunches();
  getDataLunches(dataLunches);
  displayLaunchesCard(dataLunches)
}

function displayLaunchesCard(dataLunches) {
  let launchesGridsShow = "";

  for (let i = 0; i < dataLunches.results.length; i++) {
    const lunches = dataLunches.results[i];
    const imageUrl = lunches.image ?.image_url || "./assets/images/launch-placeholder.png";
    launchesGridsShow += `
         <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">    
                    <div class="relative h-48 bg-slate-900/50 flex items-center justify-center overflow-hidden">
 <img
    src="${imageUrl}"
    alt="${lunches.name}"
    class="w-full h-full object-cover"
    onerror="this.src='./assets/images/launch-placeholder.png'"
>
                            <div class="absolute top-3 right-3">
                    <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                        ${lunches.status.abbrev}
                    </span>
                </div>
            </div>
            <div class="p-5">
                <div class="mb-3">
                    <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        ${lunches.name}
                    </h4>
                    <p class="text-sm text-slate-400 flex items-center gap-2">
                        <i class="fas fa-building text-xs"></i>
                        ${lunches.launch_service_provider?.name ?? "Unknown"}
                    </p>
                </div>
                <div class="space-y-2 mb-4">
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-calendar text-slate-500 w-4"></i>
                        <span class="text-slate-300">${new Date(lunches.net).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-clock text-slate-500 w-4"></i>
                        <span class="text-slate-300">${new Date(lunches.net).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "UTC" })} UTC</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-rocket text-slate-500 w-4"></i>
                        <span class="text-slate-300">${lunches.rocket?.configuration?.name ?? "Unknown"}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                        <span class="text-slate-300 line-clamp-1">${lunches.pad?.location?.name ?? "TBD"}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                    <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                        Details
                    </button>
                    <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
  }

  launchesGrid.innerHTML = launchesGridsShow;
}