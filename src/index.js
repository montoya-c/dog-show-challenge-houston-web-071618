document.addEventListener('DOMContentLoaded', () => {




// fetch and render a list of already registered dogs in the table.
// The dog should be put on the table as a table row
   fetch('http://localhost:3000/dogs')
   .then( response => response.json() )
   .then( function(dogs){
      addDogsToPage(dogs)
   });
})

function addDogsToPage(dogs){
  const table = document.querySelector('#table-body');
  dogs.forEach((dog)=> {
  table.innerHTML +=
    `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id}>Edit</button></td></tr>`
  });
    // let dogId = dog.id
    // let dogName = dog.Name
    // let dogBreed = dog.breed
    // let dogSex =

    table.addEventListener('click', function(e){
      if (e.target.innerHTML === "Edit"){

      let dogId = e.target.dataset.id
      let dogSex = e.target.parentElement.previousElementSibling.innerText
      let dogBreed = e.target.parentElement.previousElementSibling.previousElementSibling.innerText
      let dogName = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
        //console.log(dogId,dogBreed,dogSex,dogName)
        return populateFormToEdit(dogId,dogName,dogBreed,dogSex)
      }

    });
 }

// Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.

// // //render info on form
function populateFormToEdit(dogId,dogName,dogBreed,dogSex){
  console.log(dogId,dogBreed,dogSex,dogName)
  let form = document.querySelector('#dog-form')
  
  fetch(`http://localhost:3000/dogs/${dogId} `, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json"
    },
      body: JSON.stringify({
        "name": dogName,
        "breed": dogBreed,
        "sex": dogSex
      })
  });
}

// //
// // On submit of the form, a PATCH request should be made
// // Once the form is submitted, the table should reflect the updated dog information.
// function postUpdatedInfo(){
//   let form = document.querySelector('#dog-form')
//   form.addEventListener('submit', function(e){
//     e.preventDefault()
//   })
//   let formData = new formData();
// }







//  can either use the response from the PATCH request for this or use _optimistic rendering_.
