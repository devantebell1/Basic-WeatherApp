window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescripton = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");





    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/5c2789efe3ec153889e7e7a156a4bb25/${lat},${long}`;

            fetch(api)
            .then(data =>{
                return data.json();
            })
            .then(data =>{
                const {temperature, summary, icon } = data.currently;
                //set DOM elements from the API
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDescripton.textContent = summary;
                locationTimeZone.textContent = data.timezone;
                //CELSIUS FORMULA
                let celsius = (temperature - 32) * (5 / 9);


                //set Icon
                setIcons(icon, document.querySelector(".icon"));

                //Change Temperature
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                        
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temperature);


                    }
                })


            });
        });





    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});