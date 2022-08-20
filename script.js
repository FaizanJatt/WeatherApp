const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

async function search(){
    

    searchBtn.addEventListener("click",async () => {
        if(searchInput.value === "") return;
        let city = searchInput.value;
       
        reset();
       
        
          GET(city);

    });
}


async function GET(city){
    const response =  await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=99571560d417f181ee4ead0fa529ca51`)
    
    const weatherData = await response.json();
    getData(weatherData);

  
}
 
function getData(weatherData){
  

    const data = [{
        name: 'City',
        value: "City: " + weatherData.name,
        
    }, {
        name: 'Country',
        value: "Country: " + weatherData.sys.country,
    },{
        name:'Temp',
        value: "Temperature: " + Math.round(weatherData.main.temp -273.15 ) + "°C",
    },{
        name:'Feels_like',
        value: "Feels Like: "+ Math.round(weatherData.main.feels_like -273.15) + "°C",
    },{
        name:'Humidity',
        value:"Humidity: " + weatherData.main.humidity + "%",
    },{
        name: 'Wind',
        value: "Wind: " + weatherData.wind.speed + "KM/H",
    }]
    displayData(data);
}


   
function displayData(data){


    data.forEach(obj => { 
        const info = document.createElement("div");
        info.innerText = obj.value;
        info.id = "show";
        const disp = document.getElementById("searchResult")
   
   disp.appendChild(info);
        
    });
   

}

search();
   
 
function reset(){
    const res = document.getElementById("searchResult");
    removeAllChildNodes(res);

}


function removeAllChildNodes(res) {
    while (res.firstChild) {
       
        res.removeChild(res.firstChild);

    }
}