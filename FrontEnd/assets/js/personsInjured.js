window.onload = () => {
    document.getElementById('search-btn').onclick = search
}


search = ()=>{
    lat = document.getElementById('LATITUDE').value;
    long = document.getElementById('LONGITUDE').value;
    get_nearby(long,lat)
}



get_nearby=(long,lat)=>{
long=long;
lat=lat;


const api_url = `http://localhost:4000/posts/perinjured/${long}/${lat}`;


async function getapi(url) {

    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    console.log(long);
    console.log(lat);
    if (response) {
        hideloader();
    }
    show(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
    document.getElementById('loading');
}


// Function to define innerHTML for HTML table
function show(data) {

    let tab = 
        `<tr>
          <th>People Injured</th>
          <th>Accidents Count</th>
          
         
         </tr>`;
     
    // Loop to access all rows 
    for (let r of data) {
        
        tab += `<tr> 
    
    <td>${r._id} </td>
    <td>${r.count}</td>
   

    
   
           
    </tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("personsInjured").innerHTML = tab;
}
}
    
