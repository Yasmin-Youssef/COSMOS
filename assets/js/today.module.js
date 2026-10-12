const apiKey = `q4szx5aw51RRecBTmjlNAZwL77adOqaX9Wuk3vVc`;
const todayURl = `https://api.nasa.gov/planetary/apod`;
const apodDate = document.getElementById("apod-date");
const apodDateInput=document.querySelector(".date-input-wrapper .text-sm");
const apodImage = document.getElementById("apod-image");
const apodTitle = document.getElementById("apod-title");
const apodDateDetail = document.getElementById("apod-date-detail");
const apodExplanation =document.getElementById("apod-explanation");
const apodCopyright =document.getElementById("apod-copyright");
const apodDateInfo=document.getElementById("apod-date-info");
const apodMediaType =document.getElementById("apod-media-type");
const apodLoading = document.getElementById("apod-loading");

//Img Details
function getDataToday(dataToday) {

    let todayDay = new Date(dataToday.date);
    const formattedDate = todayDay.toLocaleDateString("en-Us", { month: "long", day: "numeric", year: "numeric" });
    apodDate.textContent = `Astronomy Picture of the Day - ${formattedDate}`;
    apodDateInput.textContent=todayDay.toLocaleDateString("en-Us", { month: "short", day: "numeric", year: "numeric" });

    apodImage.src= dataToday.hdurl;
    apodTitle.textContent = dataToday.title;
    apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>`+formattedDate;
    apodExplanation.textContent=dataToday.explanation;
    apodCopyright.innerHTML= ` &copy; Copyright: ${dataToday.copyright}` ;
    //Img Details
apodDateInfo.innerHTML=formattedDate;
apodMediaType.textContent=dataToday.media_type;

}

//base URL
async function getAPIToday(date=null) {
    apodImage.classList.add("hidden");
    apodLoading.classList.remove("hidden");
   const url = date
    ? `${todayURl}?api_key=${apiKey}&date=${date}`
    : `${todayURl}?api_key=${apiKey}`;

    const apiToday = await fetch(url);

    const responseToday = await apiToday.json();
    
    console.log(responseToday);
    return responseToday;

}
export async function initToday() {
    
    const dataToday = await getAPIToday();
    apodImage.onload = () => {
        apodImage.classList.remove("hidden");
        apodLoading.classList.add("hidden");
    };

    getDataToday(dataToday);
}

