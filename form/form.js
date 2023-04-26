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
  // console.log("options",options);
  localStorage.setItem('apiData',JSON.stringify(options))
  options.forEach((option) => {
    const newOption = document.createElement("option");
    // console.log(option);
    newOption.value = option.name;
    newOption.text = option.name;
    countries.appendChild(newOption);
  });
};
displayOption();

const setState = async ()=>{
  console.log("sadsa");
  // let countries = document.getElementById('countrySelect');
  // let states = document.getElementById('stateSelect');
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
