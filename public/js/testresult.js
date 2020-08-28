const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
let max = 4;
let current = 1;

nextBtnFirst.addEventListener("click", function(){
	if (document.getElementById("age").value == 4 ||  document.getElementById("home").value == 2) {
		alert("Please fill in all questions for this section.")
	}
	else {
		slidePage.style.marginLeft = "-25%";
	    current += 1;
	}
});
nextBtnSec.addEventListener("click", function(){
  slidePage.style.marginLeft = "-50%";
  current += 1;
});
nextBtnThird.addEventListener("click", function(){
  slidePage.style.marginLeft = "-75%";
  current += 1;
});
submitBtn.addEventListener("click", function(){
	if (document.getElementById("contact").value == 2 ||  document.getElementById("med").value == 2) {
		alert("Please fill in all questions for this section.")
	} else {
		current += 1;
  	setTimeout(testResult(),800);
	}
});

prevBtnSec.addEventListener("click", function(){
  slidePage.style.marginLeft = "0%";
  current -= 1;
});
prevBtnThird.addEventListener("click", function(){
  slidePage.style.marginLeft = "-25%";
  current -= 1;
});
prevBtnFourth.addEventListener("click", function(){
  slidePage.style.marginLeft = "-50%";
  current -= 1;
});

function testResult(){
	var html = "<h1>Test Results</h1>";
	let agerisk = document.getElementById("age").value;
	let nhome = document.getElementById("home").value; 
	let basic = countBasicSymptoms();
	let adv = advancedSymptoms();
	let contact = document.getElementById("contact").value;
	let med = document.getElementById("med").value; 
	if (adv == 1) { //User is showing severe, advanced symptoms. They should immediately get medical help.
		html += "<h4>Based on your answers, urgent medical attention may be required. Please call 911 or go to the Emergeny Department.</h4>" +
		"<br>One or more of the symptoms you are facing is an indicator of a high likelihood that you are infected with COVID-19 or have another serious medical condition. Please call 911 " +
		"or go to a hospital immediately. Tell the 911 operator or medical staff of your symptoms and inform them if you were exposed to anyone with COVID-19."
	} else if ((contact == 1 || med == 1) && ((basic > 7 && agerisk == 0) || (basic > 5 && agerisk == 1) || (basic > 4 && agerisk == 2)|| (basic > 3 && agerisk == 3))){ //The user has possibly been in contact with COVID, so the bar for showing COVID symtpoms is lower. 
		html += "<h4>Based on your answers, you should stay home and take care of yourself. Your symptom(s) may be related to COVID-19. Please contact a medical provider within 24 hours.</h4>" +
		"<br>Please contact your primary healthcare provider, clinician advice line, or telemedicine provider within 24 hours and inform them of your symptoms. Stay home unless you are seeking medical care." +
		"Do not go to work, school, or public areas, and do not use public transporation or ride sharing. <br>If your symptoms worsen or you believe it is an emergency, please call 911 or go to the Emergency Department." +
		"<br><br>Visit our <a href='/about'>COVID-19 Information</a> page for more information about COVID-19 and its symptoms, and to see what steps to take to care for yourslef and protect others from getting sick." + 
		"<br><br><h4>Testing?</h4>Based on your symptoms, you may be eligible for COVID-10 testing. To find a testing lcoation near you, visit the <a href='https://www.hhs.gov/coronavirus/community-based-testing-sites/index.html'>HHS website</a>.";
	} else if ((basic > 9 && agerisk == 0) || (basic > 7 && agerisk == 1) || (basic > 5 && agerisk == 2)|| (basic > 3 && agerisk == 3)) { // The user displays enough symptoms that displays moderate risk.
		html += "<h4>Based on your answers, you should stay home and take care of yourself. Your symptom(s) may be related to COVID-19. Please contact a medical provider within 24 hours.</h4>" +
			"<br><br>Please contact your primary healthcare provider, clinician advice line, or telemedicine provider within 24 hours and inform them of your symptoms. Stay home unless you are seeking medical care." +
			"Do not go to work, school, or public areas, and do not use public transporation or ride sharing. <br>If your symptoms worsen or you believe it is an emergency, please call 911 or go to the Emergency Department." +
			"<br><br>Visit our <a href='/about'>COVID-19 Information</a> page for more information about COVID-19 and its symptoms, and to see what steps to take to care for yourslef and protect others from getting sick." + 
			"<br><br><h4>Testing?</h4>Based on your symptoms, you may be eligible for COVID-10 testing. To find a testing lcoation near you, visit the <a href='https://www.hhs.gov/coronavirus/community-based-testing-sites/index.html'>HHS website</a>.";
	} else if ((basic > 2 && agerisk == 0) || (basic > 2 && agerisk == 1) || (basic > 1 && agerisk == 2)|| (basic > 1 && agerisk == 3)) { //User is not showing many/any symptoms and has not been exposed to people with the coronvirus. Risk is low.
		html += "<h4>Based on your answers, you should stay home and take care of yourself. Your symptom(s) are most likely not related to COVID-19.</h4>" +
		"<br>You can find more information on COVID-19 symptoms on the <a href='/about'>COVID-19 Information</a> page. If you start to develop any more COVID-19 symptoms or start feeling worse, " +
		"please contact your primary healthcare provider, clinician advice line, or telemedicine provider and inform them of your condition." +
		"<br><br>Please still make sure to cover your stay at home and rest, and wash your hands often until your symptoms are gone."
		"<br><br><h4>Testing?</h4>Based on your symptoms, no COVID-19 testing is required at this time."
	} else { //The user has very little to no symptoms.
		html += "<h4>Based on your answers, you probably do not have COVID-19. As a precaution, stay at home and monitor for symptoms.</h4>" + 
		"<br>You can find more information on COVID-19 symptoms on the <a href='/about'>COVID-19 Information</a> page. If you start to develop any more COVID-19 symptoms or start feeling worse, " +
		"please contact your primary healthcare provider, clinician advice line, or telemedicine provider and inform them of your condition." +
		"<br><br>In the meantime, quarantine yourself for 14 days. Take your temperature twice a day, and practice social distancing. If you begin to develop symptoms mentioned above, COVID-19 testing may be required." +
		"<br><br><h4>Testing?</h4>Based on your symptoms, no COVID-19 testing is required at this time."
	}
	document.getElementById("form").style.display = "none";
	document.getElementById("result").innerHTML = html;
	document.getElementById("result").style.display = "block";
}

function countBasicSymptoms() {
	let count = 0;
	if (document.getElementById("fever").value == 0) {
		count++;
	}
	if (document.getElementById("cough").value == 0) {
		count++;
	}
	if (document.getElementById("short").value == 0) {
		count++;
	}
	if (document.getElementById("fat").value == 0) {
		count++;
	}
	if (document.getElementById("mus").value == 0) {
		count++;
	}
	if (document.getElementById("head").value == 0) {
		count++;
	}
	if (document.getElementById("loss").value == 0) {
		count++;
	}
	if (document.getElementById("sore").value == 0) {
		count++;
	}
	if (document.getElementById("cong").value == 0) {
		count++;
	}
	if (document.getElementById("naus").value == 0) {
		count++;
	}
	if (document.getElementById("dia").value == 0) {
		count++;
	}
	if (document.getElementById("other").value == 0) {
		count++;
	}
	return count;
}

function advancedSymptoms() {
	let status = 0;
	if (document.getElementById("severe0").value == 0 || document.getElementById("severe1").value == 0 || document.getElementById("severe2").value == 0 || document.getElementById("severe3").value == 0 || document.getElementById("severe4").value == 0 || document.getElementById("severe5").value == 0 || document.getElementById("severe6").value == 0 || document.getElementById("severe7").value == 0) {
		status = 1;
	}
	return status;
}