class ModelList {
	constructor(name, year){
		this.name = name;
		this.year = year;
	}
}

class Make{
	constructor(id, name){
		this.id = id;
		this.name = name;
		this.models = [];
	}
	addModel(model){
		this.models.push(model);
	}
	deleteModel(model){
		let index = this.models.indexOf(model);
		this.models.splice(index,1);
	}
	
	editModelName(newModelName){
		this.name = newModelName;
	}
}

let makes = [];
let makeId = 0;

//function to create new Make in DOM
onClick('new-make', () => {
	makes.push(new Make(makeId++, getValue('new-make-name')));
	drawDOM();
});

function getValue(id) {
	return document.getElementById(id).value;
}

function onClick(id,action) {
	let element = document.getElementById(id);
	element.addEventListener('click',action);
	return element;
}
// function to create DOM element
function drawDOM() {
	let makeDiv = document.getElementById('makes');
	clearElement(makeDiv);
	for (make of makes){
		let table = createMakeTable(make);
		let title = document.createElement('h2');
		title.innerHTML = make.name;
		title.appendChild(createEditMakeButton(make));
		title.appendChild(createDeleteMakeButton(make));
		makeDiv.appendChild(title);
		makeDiv.appendChild(table);
		for (model of make.models){
			createModelRow(make,table,model);
		}
	}
}
// function to create a new model in the make div
function createModelRow(make, table, model){
	let row = table.insertRow(2);
	row.insertCell(0).innerHTML = model.name;
	row.insertCell(1).innerHTML = model.year;
	let actions = row.insertCell(2);
	actions.appendChild(createDeleteRowButton(make, model));
}
// function to delete a model from the make div
function createDeleteRowButton(make, model){
	let btn = document.createElement('button');
	btn.className = ' btn btn-primary';
	btn.innerHTML = 'Delete';
	
	btn.onclick = () => {
		let index = make.models.indexOf(model);
		make.models.splice(index,1);
		drawDOM();
	};
	return btn;
}
// function to delete Make divs
function createDeleteMakeButton(make){
	let btn = document.createElement('button');
	btn.className = 'btn btn-danger';
	btn.innerHTML = 'Delete Make';

	// code to get confirmation before deleting make
	btn.onclick = () => { 
		let result = confirm('Are you sure you want to delete ' + make.name + ' ?');
		if (result){
			window.alert('Ok, now deleting ' + make.name);
			let index = makes.indexOf(make);
			makes.splice(index,1);
			drawDOM();
		}
		else {
				window.alert('Ok, we will leave ' + make.name + ' alone.' );
		}
	}
	return btn; 
}

// function to Edit the Make button
function createEditMakeButton(make){
	let btn = document.createElement('button');
	btn.className = 'btn btn-secondary';
	btn.innerHTML = 'Edit Make';
// prompt to confirm edit being made
	btn.onclick = () => { 
		let newModelName = prompt('What name would you like to rename this make to?');
		window.alert('Ok, now we will change the make name to ' + newModelName);
		let index = makes.indexOf(make);
		makes[index].editModelName(newModelName);
		drawDOM();
	}
	return btn; 
}
// function to add new vehicle to the table
function createNewModelButton(make) {

	let btn = document.createElement('button');
	btn.className = 'btn btn-primary';
	btn.innerHTML = 'Create';
	btn.onclick = () => {
		make.models.push(new ModelList(getValue(`name-input-${make.id}`), getValue(`year-input-${make.id}`)));
		drawDOM();
	};
	return btn;
}
//function to create and display the array of each Make
function createMakeTable(make){
	let table = document.createElement('table');
	table.setAttribute('class', 'table table-dark table-striped');
	let row = table.insertRow(0);
	let nameColumn = document.createElement('th');
	let yearColumn = document.createElement('th');
	nameColumn.innerHTML = 'Model';
	yearColumn.innerHTML = 'Year';
	row.appendChild(nameColumn);
	row.appendChild(yearColumn);
	let formRow = table.insertRow(1);
	let nameTh = document.createElement('th');
	let yearTh = document.createElement('th');
	let createTh = document.createElement('th');
	let nameInput = document.createElement('input');
	nameInput.setAttribute('id', `name-input-${make.id}`);
	nameInput.setAttribute('type', 'text');
	nameInput.setAttribute('class', 'form-control');
	let yearInput = document.createElement('input');
	yearInput.setAttribute('id', `year-input-${make.id}`);
	yearInput.setAttribute('type', 'text');
	yearInput.setAttribute('class', 'form-control');
	let newModelButton = createNewModelButton(make);
	nameTh.appendChild(nameInput);
	yearTh.appendChild(yearInput);
	createTh.appendChild(newModelButton);
	formRow.appendChild(nameTh);
	formRow.appendChild(yearTh);
	formRow.appendChild(createTh);
	return table;
}

function clearElement(element) {
	while(element.firstChild){
		element.removeChild(element.firstChild);
		// console.log(element.firstChild);
	}
}