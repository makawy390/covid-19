

// Extract Data )+ Avialable Data about intensive_case beds
const hospitalsData = JSON.parse(document.getElementById("availableHospitals").textContent);
console.log("--------------------------------------------- + Available Hosptials -----------------------------------------------------");
console.table(hospitalsData);
console.log("--------------------------------------------- + Available Hosptials -----------------------------------------------------");

// console.log(hospitalsData.length);
// console.log(hospitalsData);

let patientLocation = {};
let shorestHospitals = [];
let locationSelector = false;
// Sortest hospitals
let ShortestHospitals;
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      patientLocation.latitude = position.coords.latitude,
      patientLocation.longitude = position.coords.longitude,
      exeDistance = calculateDistances(),
      sortDistances = sortShortestHospitals(exeDistance),
      displayHospitalsTPatient = displayAvailalbeHospitals(sortDistances)
    });
    // if ( patientLocation == {} ) {
    //   console.log("No Location");
    // }else {
    //   console.log("There's Location");
    // }    
  } else { 
    // x.innerHTML = "Geolocation is not supported by this browser.";
    console.log("Doesn't Support");
  }
  console.log(patientLocation);
}

// Define the distances between each hospital & patient's location
// const computeDistances = () => {
  
// }

// Bakri Location
// let coords2 = {
//   latitude: 30.5712174,
//   longitude: 31.4118596
// }


// Haversine Algorithm
function haversine_distance(coords1, coords2) {

  function toRad(x) {
      return x * Math.PI / 180;
 }

  var dLat = toRad(coords2.latitude - coords1.latitude);
  var dLon = toRad(coords2.longitude - coords1.longitude)
  
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(toRad(coords1.latitude)) * 
         Math.cos(toRad(coords2.latitude)) *
         Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
// haversine_distance()

let handleCoordinates = (coordinates) => {
  const crdVls = coordinates.split(","); ["", ""]
  return {
    latitude: parseFloat(crdVls[0]),
    longitude: parseFloat(crdVls[1]),
  }
}
// console.log(hospitalsData[0].coordination);
// console.log(handleCoordinates(hospitalsData[0].coordination))


function calculateDistances() {
  for ( let y = 0; y <= hospitalsData.length - 1; y++ ) {
    // console.log(handleCoordinates(hospitalsData[y].coordination));
    // console.log(patientLocation);
    let hospitalPatientDistance = haversine_distance(patientLocation, handleCoordinates(hospitalsData[y].coordination));
    hospitalsData[y].distance = hospitalPatientDistance;
  }
  console.log("-------------------------------------- + Add Distances ------------------------------------------------");
  console.table(hospitalsData);
  console.log("-------------------------------------- + Add Distances ------------------------------------------------");
  return hospitalsData;
}




// Sort hospitals + Linear Alg
const sortShortestHospitals = (list) => {
  // let max = list[0].Num_intensive_case_beds;
  // frm left to right....
  for ( let y = 0; y <= list.length-1; y++ ) {
    for ( let x = y+1; x <= list.length-1; x++ ) {
      if ( list[y].distance > list[x].distance ) {
        let swap = list[y];
        list[y] = list[x];
        list[x] = swap;
      }
    }
  }
  // console.table(list);
  ShortestHospitals = list;
  console.log("----------------------------------------------------------- + Shortest Hospitals -------------------------------------------------------");
  console.table(ShortestHospitals);
  console.log("----------------------------------------------------------- + Shortest Hospitals -------------------------------------------------------");
  // console.log(ShortestHospitals.length);
  return list;
}


// console.log(handleCoordinates("30.43109,31.55994"));
// Show the hospitals


// Redirect to Map






// // Display a message 
// const animateMessage = (msg) => {
//   console.log("animations");
//   const errorMessage = document.querySelector(".error-message");
//   let messageCntr;
//   // console.log(errorMessage); 
//   if ( errorMessage == null ) {
//     // console.log(errorMessage); 
//     // Create DOM of Message
//     messageCntr = document.createElement("p");
//     messageCntr.innerHTML = msg;
//     messageCntr.style.padding = "8px",
//     messageCntr.style.textAlign = "center";
//     messageCntr.style.backgroundColor = "green";
//     messageCntr.style.color = "white";
//     messageCntr.style.width = "367px";
//     messageCntr.style.height = "37px";
//     messageCntr.style.fontSize = "20px";
//     messageCntr.style.position = "absolute";
//     messageCntr.style.top = "-200px";
//     messageCntr.style.left = "50%";
//     messageCntr.style.zIndex = "5";
//     messageCntr.style.borderRadius = "7px";
//     messageCntr.style.fontSize = "15px";
//     // messageCntr.style.display = "none";
//     messageCntr.style.transform = "translate(-50%, -50%)";
//     messageCntr.style.boxShadow = "1px 1px 18px #ee6c6c";
//     messageCntr.classList.add("error-message");
//     document.body.prepend(messageCntr);
//   }else {
//     messageCntr = errorMessage;
//   }
   
  
  
//   messageCntr.animate([
//     { top: "-100px", 
//       // display: "none"
//     },
//     { top: "100px",
//       // display: "block"
//     },
//   ], {
//     delay: 0,
//     duration: 700,
//     iterations: 1,  
//     endDelay : 0,
//     easing: "ease-in-out",
//   })
//   messageCntr.style.top = "200px";
//   setTimeout( () => {
//     messageCntr.style.top = "-200px";
//     // errAnimate = true;
//   }, 5000)
//   // setTimeout( () => {
//   //   messageCntr.style.display = "none";
//   // }, 2000)
  
//   // messageCntr
// }


let displayAvailalbeHospitals = ( avlblHospitals ) => {
  
  let hospitalMdl1 = displayAvailalbeHospitals_helper();
  
  // Create conteiner element
  const ul = document.createElement("ul");
  // Import all "availalbe and shortest" hosptials
  let hospitalsElmnt = hospitalMdl1.storeHospitals( ul,  avlblHospitals );
  // console.table(hospitalsElmnt.outerHTML);  
  // Delete warn message
  hospitalMdl1.warnMsg.style.display = "none";
  // Display hospitals
  // console.log(hospitalMdl1.hospitalsCntr);
  hospitalMdl1.hospitalsCntr.style.height = "200px";
  hospitalMdl1.hospitalsCntr.style.overflowY = "scroll";
  // hospitalMdl1.hospitalsCntr.style.marginBottom = "20px";
  hospitalMdl1.hospitalsCntr.innerHTML = hospitalsElmnt.outerHTML;
  // Display map option
  hospitalMdl1.mapOption.hidden = false;
  hospitalMdl1.mapOption.style.margin = "36px 1px";
  hospitalMdl1.mapOption.style.borderTop = "1px solid black";
  hospitalMdl1.mapOption.style.padding = "14px 0px";
}

// Helpers of )+ Display available hospitals
let displayAvailalbeHospitals_helper = () => {
  
  let storeHospitals = ( ul, avlblHospitals  ) => {
    
    
    for ( let y = 0; y <= avlblHospitals.length - 1; y++ ) {
      let hospitalElement = document.createElement("li");
      hospitalElement.textContent = avlblHospitals[ y ].H_name;
      ul.appendChild( hospitalElement );
    }
    // console.table(ul.outerHTML);
    return ul;
  }
  
  let getHospitalsCntr = document.querySelector(".available_hospitals_list");
  let getWarnMsg =  getHospitalsCntr.querySelector(".warn");
  let getMapOption = document.querySelector(".selectedHospitals_sctns .show_map_info");
  
  return {
    storeHospitals : storeHospitals,
    hospitalsCntr: getHospitalsCntr,
    warnMsg : getWarnMsg,
    mapOption : getMapOption,
    
    
  }
  
}



// Documentation of Map
let map_documentation = {
  hospitalsData: "Avialable Hospitals Sent by Server Side",
  getLocation: "Define the location of user or patient",
  haversine_distance: "Algoriithm to get the distance between the location and each hospital",
  calculateDistances: "Calculate the Distances between the user and each hospitals",
  sortShortestHospitals: "Sort the hospitals based on its distance",
  displayAvailalbeHospitals: "Display hosptials to patient",  
}