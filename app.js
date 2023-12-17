const myKey = "e41f979b7ef04d25b6b185006231111";
let country = prompt("Enter the City");

function getURL(country, myKey){
    return  `http://api.weatherapi.com/v1/current.json?key=${myKey}&q=${country}`
}

let url = getURL(country, myKey);
console.log(url);

async function data(url){
    try{
        let request = await fetch(url, {mode: 'cors'});
        const myData = await request.json();
        // console.log(myData);
        // console.log(myData["location"]);
        return myData;
    }
    catch(err){
        console.log(err);
    }
    
}

let fetchData = async () => {
    try{
        let myData = await data(url);
        const displayData = {name: myData.location.name, tempF: myData.current.temp_f, condition: myData.current.condition.text, feels: myData.current.feelslike_f};
        console.log(displayData);
        return displayData;
    }
    catch(err){
        console.log(err);
    }
};

fetchData();
