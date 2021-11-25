// api url
const api_url ="http://localhost:4000/posts/accidents";

// Defining async function
async function getapi(url) {
	
	// Storing response
	const response = await fetch(url);
	
	// Storing data in form of JSON
	var data = await response.json();
	console.log(data);
	if (response) {
		hideloader();
	}
	show(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
    let tab = 
        `<tr>
          <th>BOROUGH</th>
          <th>COMPLAINTS</th>
         
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data) {
        tab += `<tr> 
    <td>${r._id} </td>
    <td>${r.count}</td>         
    </tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("accidents").innerHTML = tab;
}
