const form = document.querySelector('#cityValue');
const city = document.querySelector('#city-name');
const myKey = "e41f979b7ef04d25b6b185006231111";
const searchBtn = document.querySelector('button');
const displayName = document.querySelector('#displayCity #text');
const displayTemp = document.querySelector('#temp #text');
const displaytFeels = document.querySelector('#feels #text');
const displayCondition = document.querySelector('#condition #text');
const loadingPage = document.querySelector(".loading");


form.addEventListener("submit", (e) => {
    e.preventDefault();

})

searchBtn.addEventListener('click', (e)=>{
    loadingPage.classList.add("active");
    var cityReq = city.value;
    let url = getURL(cityReq, myKey);
    let fetched =  async () => {
        try{
            let fetched_data = await fetchData(url);
            return fetched_data.displayData;
        }
        catch(err){
            console.log(err);
        }
    }
    
    let htmlUpdate = async () =>{
        try{
            let useData = await fetched();
            if(isRaining(useData.condition)){
                 document.body.style.backgroundImage = `url('./img/rainBg.gif')`
            }
            else{
                document.body.style.backgroundImage = `url('./img/background.jpg')`
            }
            loadingPage.classList.remove("active")
            displayName.innerHTML = useData.name;
            displayTemp.innerHTML = useData.tempF;
            displayCondition.innerHTML = useData.condition;
            displaytFeels.innerHTML = useData.feels;
        }
        catch(err){
            console.log(err);
            return;
        }
    }
    htmlUpdate();
})

function getURL(country, myKey){
    return  `https://api.weatherapi.com/v1/current.json?key=${myKey}&q=${country}`
}


async function data(url){
    try{
        let request = await fetch(url);
        if (!request.ok){
            location.reload();
            alert("Invalid City!");
            
        }
        const myData = await request.json();
        return myData;
    }
    catch(err){
        alert("Invalid City :')");
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


function isRaining(main){
    const regex = /\b(?:drizzle|rain)\b/;
    return regex.test(main);
}
