//* Global Variables
const DOGS_URL = "http://localhost:3000/dogs";
let editId;
const tableBody = document.getElementById("table-body");
const dogForm = document.getElementById("dog-form");

const handleSubmit = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const breed = e.target.breed.value;
  const sex = e.target.sex.value;
  const payload = { name, breed, sex };
  patchData(`${DOGS_URL}/${editId}`, payload)
    .then((dog) => {
      document.querySelector(`#tr-${dog.id} > td:nth-child(1)`).textContent =
        dog.name;
      document.querySelector(`#tr-${dog.id} > td:nth-child(2)`).textContent =
        dog.breed;
      document.querySelector(`#tr-${dog.id} > td:nth-child(3)`).textContent =
        dog.sex;
      e.target.reset();
      editId = null;
    })
    .catch((err) => console.log("Error: ", err));
};

const appendEditInfo = (dogObj) => {
  dogForm.name.value = dogObj.name;
  dogForm.breed.value = dogObj.breed;
  dogForm.sex.value = dogObj.sex;
  editId = dogObj.id;
};

const appendAllDogs = (dogsArr) => {
  dogsArr.forEach((dog) => {
    const tr = document.createElement("tr");
    tr.id = `tr-${dog.id}`;

    const name = document.createElement("td");
    name.textContent = dog.name;

    const breed = document.createElement("td");
    breed.textContent = dog.breed;

    const sex = document.createElement("td");
    sex.textContent = dog.sex;

    const edit = document.createElement("td");
    const btn = document.createElement("button");
    btn.addEventListener("click", () => getOneDog(dog.id));
    btn.textContent = "Edit Dog";
    edit.appendChild(btn);

    tr.append(name, breed, sex, edit);

    tableBody.appendChild(tr);
  });
};

const getOneDog = (_id) => {
  getData(`${DOGS_URL}/${_id}`)
    .then((dog) => appendEditInfo(dog))
    .catch((err) => console.log("Error: ", err));
};

const getAllDogs = () => {
  getData(DOGS_URL)
    .then((allDogs) => appendAllDogs(allDogs))
    .catch((err) => console.log("Error: ", err));
};

const init = () => {
  getAllDogs();
  dogForm.addEventListener("submit", handleSubmit);
};

init();
