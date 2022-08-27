// Week 10 Assignment
// Jair Alcon

// I hard coded some data for testing purposes
const carList = [
	{
		id: 0,
		make: "Ford",
		model: "Fiesta",
		year: "2015"
	},
	{
		id: 1,
		make: "Geo",
		model: "Metro",
		year: "1992"
	},
	{
		id: 2,
		make: "Toyota",
		model: "Celica All-Trac Turbo",
		year: "1993"
	}
];

// console.log('This is the current array of Car Objects:', carList);

//This moves the cursor to the first input text browser is selected
$(document).ready(function () {
	$("#form-make-input").focus();
});

// API STUFF

// const fetchAllVehicles = async () => {
//     // make a GET request and get a response
//     const response = await fetch("http://localhost:3001/products")
//     // parse out the data from the response
//     const data = await response.json();
//     // save the data in the movieList variable
//     carList = data;
//     // render the list of movies
//     renderInventoryList()
// }

// RENDERING
$(() => {
	// IF YOU'RE USING AN API: get the data from the server and save it in our variable
    // fetchAllVehicles()

    // IF NOT: just render the array
	// render the inventory list array
	renderInventoryList()
})

const $vehiclesContainer = $("#vehicles-container");

function renderInventoryList() {
	// console.log('this is my carList in renderInventoryList function:', carList);
	$vehiclesContainer.empty()
	$vehiclesContainer.append(carList.map(car => renderCar(car)))
}


function renderCar(carParam) {
	// console.log('this is renderCar', carParam);
	// console.log(carParam.make);
	// console.log(carParam.model);
	// console.log(carParam.year);
	return $("<tr/>").append(
		$("<td/>").text(carParam.id + 1).attr("id", `${carParam.id}`),
		$("<td/>").text(carParam.make),
		$("<td/>").text(carParam.model),
		$("<td/>").text(carParam.year),
		$("<td/>").addClass("d-grid gap-2 d-md-flex justify-content-md").append(
			$("<button>").addClass("btn btn-primary me-4").text("Edit").on("click", () => onStartVehicleEdit(carParam.id)),
			$("<button/>").addClass("btn btn-danger me-4")/*.attr("id", `${carParam.id}`)*/.text("Delete").on("click", () => onDeleteButtonClick(carParam.id))			
		)
	)
}

//* EVENT LISTENERS
// setting car Id to null for use later
const carModal = new bootstrap.Modal('#car-edit-modal');
const $carModalTitle = $("#car-modal-title");
// for text inputs
const $formMakeInput = $("#form-make-input");
const $formModelInput = $("#form-model-input");
const $formYearInput = $("#form-year-input");
// for modal inputs
const $modalMakeInput = $("#modal-make-input");
const $modalModelInput = $("#modal-model-input");
const $modalYearInput = $("#modal-year-input");

const $addCarId = $("#id")

let editCarId = null;

function onSaveVehicle() {
	console.log('saving data inside of this function')
	// check if we're saving a create or an edit
	if (editCarId === null) {
		// get the name of the new vehicle
		// create a new vehicle and add it to the list
		carList.push({
			//* https://stackoverflow.com/questions/64926946/add-an-autoincrementing-number-in-an-object-to-the-push
			//* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
			//  using optional chaining operator (?)
			id: carList.length ? carList[carList.length - 1].id + 1 : 0,
			make: $formMakeInput.val(),
			model: $formModelInput.val(),
			year: $formYearInput.val()
		});
		console.log('This is the added ID:', carList.length ? carList[carList.length - 1].id + 1 : 0);
		console.log('This is the added Make:', $formMakeInput.val());
		console.log('This is the added Model:', $formModelInput.val());
		console.log('This is the added Year:', $formYearInput.val());
		$formMakeInput.val('');
		$formModelInput.val('');
		$formYearInput.val('');

		// console logging the data that was just added
		let index = -1;
		console.log('Added this vehicle to table:', carList.at(index));
	}
	else {
		// Find the vehicle we're editing
		const car = carList.find(car => car.id === editCarId);
		// Update it with any edited info
		car.make = $modalMakeInput.val();
		car.model = $modalModelInput.val();
		car.year = $modalYearInput.val();
		console.log('Car values were changed to:', car)
	}

	// rerender the list of vehicles
	renderInventoryList();
	// close the modal
	carModal.hide();
}

function onStartVehicleEdit(vehicleId) {
	console.log('starting Edit process with ID:', vehicleId);
	// get the one that matches that id
	const car = carList.find(car => car.id === vehicleId);
	console.log('We are editing:', car)
	// open the modal
	carModal.show();
	// change the title of the modal
	$carModalTitle.text("Edit: " + car.make + ' ' + car.model + ' ' + car.year);
	// Put the vehicle's current data in the form
	$modalMakeInput.val(car.make),
	$modalModelInput.val(car.model),
	$modalYearInput.val(car.year)
	// Say that we're editing this one
	editCarId = car.id;
	console.log(editCarId);
}

function onDeleteButtonClick(carId) {
	console.log('we are inside the delete function', (carId))
	const indexToDelete = carList.findIndex(car => car.id === carId)
	// console logging the delete vehicle
	let index = 1;
	console.log('Deleting this vehicle from table:', carList.at(index));
	// alert('Deleting this vehicle from table:', carList.at(index));
	// removing from table
	carList.splice(indexToDelete, 1);
	renderInventoryList();
	// IF YOU'RE USING AN API: also let the backend know
	// fetch("http://localhost:3001/products/" + carId, { method: "DELETE" })
}

// This moves the cursor back to form-vehicle-make text input for the next entry
$("#add").click(function () {
	$formMakeInput.focus();
});

// Wait for document to load
$(document).ready(() => {
	$('.vehicle-form').on('submit', () => {

		// prevents default behavior
		// Prevents event propagation
		return false;
	});
});
$('.vehicle-form').keypress((e) => {

	// Enter key corresponds to number 13
	if (e.which === 13) {
		onSaveVehicle();
		console.log('Form Successfully Submitted');
	}
	$("#form-make-input").focus();
})


/*
// will delete line in which ID resides in
function onDeleteButtonClick(carIdToDelete) {
	console.log('id from car delete button', carIdToDelete);
	// I need to implement a method to remove the selected item from the array
	//remove element of carlist based on the id of the car
	
	//loop through the carlist array and if the id of the car is
	//equal to the id of the car to be removed, remove the car
	
	for (let i = 0; i < carList.length; i++) {
		if (carList[i].id == carIdToDelete) {
			console.log('car is being deleted:', carList[i])
			carList.splice(i, 1); //remove the car with id of 1
		}
		// rerender  inventory List
		return renderInventoryList();
	}
}
*/