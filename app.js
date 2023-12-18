const form = document.querySelector('#cityValue');
const city = document.querySelector('#city-name');
const myKey = "e41f979b7ef04d25b6b185006231111";
const searchBtn = document.querySelector('button');

form.addEventListener("submit", (e) => {
    e.preventDefault();

})

searchBtn.addEventListener('click', ()=>{
    var cityReq = city.value;
    let url = getURL(cityReq, myKey);
    let fetched =  async () => {
        try{
            let fetched_data = await fetchData(url);
            console.log(fetched_data.displayData.name);
        }
        catch(err){
            console.log(err);
        }
    }
    fetched();
})

function getURL(country, myKey){
    return  `http://api.weatherapi.com/v1/current.json?key=${myKey}&q=${country}`
}


async function data(url){
    try{
        let request = await fetch(url);
        const myData = await request.json();
        return myData;
    }
    catch(err){
        console.log(err);
    }
    
}

async function fetchData(url){
    try{
        let myData = await data(url);
        const displayData = {name: myData.location.name, tempF: myData.current.temp_f, condition: myData.current.condition.text, feels: myData.current.feelslike_f};
        // console.log(displayData);
        return {displayData};
    }
    catch(err){
        console.log(err);
    }
};



