// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap’s JS

import{showCountries} from "./components/countryList.js";

import * as bootstrap from 'bootstrap';

//eigen js


document.addEventListener("DOMContentLoaded", ()=>{
    showCountries()
})