const countries = document.getElementById("countrySelect");
const states = document.getElementById('stateSelect');
const getPost = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
  );
  const data = response.json();
  return data;
};

const displayOption = async () => {
  const options = await getPost();
  states.style.display = 'none';
  localStorage.setItem('apiData',JSON.stringify(options))
  localStorage.setItem('form',"");
  options.forEach((option) => {
    const newOption = document.createElement("option");
    newOption.value = option.name;
    newOption.text = option.name;
    countries.appendChild(newOption);
  });
};
displayOption();

const setState = async ()=>{
  states.innerHTML = '';
  let apiData = JSON.parse(localStorage.getItem('apiData'));
  let isStatePresent = false;
  apiData.forEach((option)=>{
    if(option.name == countries.value) {
      if(option.states.length > 0) {
        isStatePresent = true;
      }
      option.states.forEach((state)=>{
        const newState = document.createElement("option");
        newState.value = state.name;
        newState.text = state.name;
        states.appendChild(newState);
      })
    }
  })
  if(!isStatePresent) {
    states.style.display = "none";
  }
  else {
    states.style.display = "block";
  }
}


let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("name");
  let dob = document.getElementById("dob");
  let contactNumber = document.getElementById("contactnumber");
  let country = document.getElementById("countrySelect");
  let state = document.getElementById("stateSelect");
  let email = document.getElementById("email");
  let obj = {};
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let isValid = true;
  if (name.value.length < 4 || name.value.length > 10) { 
    obj.Name = {"error":"Length should be between 4-10 characters."};
    isValid = false;
  }
  if(!email.value.match(validRegex)) {
    obj.email = {"error":"should only support valid email address"};
    isValid = false;
  } 
  if(contactNumber.value.length != 10) {
    obj.contactnumber = {"error":"mobile number should be of 10 digits."}
    isValid = false;
  }
  if(country.value == '' || state.value == '') {
    obj.countryState = {"error":"country state are mandatory fields"};
    isValid = false;
  }
  if(isValid) {
    obj.form = {"success":"All fields are valid."};
  }
  localStorage.setItem("form",JSON.stringify(obj));
});
