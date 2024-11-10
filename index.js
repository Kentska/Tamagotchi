const iconIds = ["eat", "pause", "play", "syringe", "poop", "scale", "diss", "warning"];
const submenuIds = {
	eat: "eatsub",
	pause: "pausesub",
	play: "playsub",
	syringe: "syringesub",
	poop: "poopsub",
	scale: "scalesub",
	diss: "disssub",
	warning: "warningsub"
};


let currentSelectionIndex = 0; // Huvudmeny index
let currentSubmenuId = null; // För att hålla reda på den aktuella submenyn
let subIconSelectionIndex = 0; // Submeny index

function toggleSelection() {
	if (currentSubmenuId) {
		// Om en submeny är aktiv, toggla mellan subikoner
		const submenuIcons = document.querySelectorAll(`#${currentSubmenuId} .submenu-icon`);

		// Ta bort selektion från alla subikoner
		submenuIcons.forEach(icon => icon.classList.remove("selected"));

		// Uppdatera index och lägg till selektion på den aktuella subikonen
		subIconSelectionIndex = (subIconSelectionIndex + 1) % submenuIcons.length;
		const currentSelectedIcon = submenuIcons[subIconSelectionIndex];
		currentSelectedIcon.classList.add("selected");

		// Logga markerad subikon för debugging
		console.log("Togglesub: markerad subikon:", currentSelectedIcon.id);
	} else {
		// Annars, toggla mellan huvudikoner
		iconIds.forEach(id => {
			document.getElementById(id).classList.remove("selected");
		});

		// Markera den aktuella huvudikonen
		const currentIconId = iconIds[currentSelectionIndex];
		const iconElement = document.getElementById(currentIconId);
		iconElement.classList.add("selected");

		// Växla till nästa huvudikon
		currentSelectionIndex = (currentSelectionIndex + 1) % iconIds.length;
	}
}


// Funktion för att bekräfta huvudikon eller subikon
function confirmSelection() {
	if (currentSubmenuId) {
		// Om en submeny är aktiv, bekräfta valet i submenyn
		const submenuIcons = document.querySelectorAll(`#${currentSubmenuId} .submenu-icon`);
		const selectedSubIcon = submenuIcons[subIconSelectionIndex];

		// Bekräfta den valda subikonen i loggen
		console.log("Bekräftat subval:", selectedSubIcon ? selectedSubIcon.id : "Ingen subikon vald");

		// Ta bort alla "selected"-klasser
		submenuIcons.forEach(icon => icon.classList.remove("selected"));

		// Lägg till en bekräftad klass för att visa visuellt att den valda subikonen är bekräftad
		selectedSubIcon.classList.add("confirmed");  // Lägg till en bekräftad klass här

		// För att ge visuell feedback kan vi ändra något, som färg eller stil på den bekräftade subikonen
		selectedSubIcon.style.border = "2px solid green";  // Exempel på visuell feedback, t.ex. en grön kant

		// Om du vill ge en annan typ av visuell feedback kan du lägga till en animation eller ändra färg etc.
	} else {
		// Annars, bekräfta valet i huvudmenyn och visa submeny
		const selectedIconId = iconIds[(currentSelectionIndex - 1 + iconIds.length) % iconIds.length];

		// Dölj alla submenyer
		Object.values(submenuIds).forEach(subId => {
			const submenuElement = document.getElementById(subId);
			submenuElement.classList.add("hidden");
			submenuElement.style.visibility = "hidden";  // Säkerställer att den är osynlig
		});

		// Visa vald submeny och spara dess ID
		currentSubmenuId = submenuIds[selectedIconId];
		const submenuElement = document.getElementById(currentSubmenuId);
		submenuElement.classList.remove("hidden");
		submenuElement.style.visibility = "visible";  // Gör submenyn synlig på skärmen

		// Återställ subikon index när en ny submeny öppnas
		subIconSelectionIndex = 0;

		// Första subikonen markeras direkt när submenyn öppnas (om det finns subikoner)
		const submenuIcons = document.querySelectorAll(`#${currentSubmenuId} .submenu-icon`);
		if (submenuIcons.length > 0) {
			submenuIcons[subIconSelectionIndex].classList.add("selected");
			console.log("Första subikon markerad:", submenuIcons[subIconSelectionIndex].id);
		}

		console.log("Bekräftat huvudval, visar submeny:", currentSubmenuId);
	}
}
// Funktion för att avbryta och återgå till huvudmenyn
function cancelSelection() {
	// Ta bort 'selected' från huvudikoner
	iconIds.forEach(id => {
		document.getElementById(id).classList.remove("selected");
	});

	// Dölj alla submenyer och ta bort 'selected' från subikoner
	Object.values(submenuIds).forEach(subId => {
		const submenuElement = document.getElementById(subId);
		submenuElement.classList.add("hidden");        // Döljer submenyn
		submenuElement.style.visibility = "hidden";    // Säkerställer att den är osynlig

		// Ta bort 'selected' från alla subikoner i varje submeny
		const submenuIcons = submenuElement.querySelectorAll('.submenu-icon');
		submenuIcons.forEach(icon => icon.classList.remove("selected"));
	});

	// Återställ variabler
	currentSelectionIndex = 0;
	currentSubmenuId = null;
	subIconSelectionIndex = 0;

	console.log("Selection cancelled, returning to main menu.");
}

// Event-lyssnare för knappar
document.getElementById("select").addEventListener("click", toggleSelection); // Växla mellan ikoner
document.getElementById("confirm").addEventListener("click", confirmSelection); // Bekräfta valet
document.getElementById("cancel").addEventListener("click", cancelSelection); // Avbryt och återgå



































































// Funktion för att växla mellan subikoner
/*function toggleSelection() {
	if (currentSubmenuId) {
		// Om en submeny är aktiv, toggla mellan subikoner
		const submenuIcons = document.querySelectorAll(`#${currentSubmenuId} .submenu-icon`);

		// Ta bort selektion från alla subikoner
		submenuIcons.forEach(icon => icon.classList.remove("selected"));

		// Uppdatera index och lägg till selektion på den aktuella subikonen
		subIconSelectionIndex = (subIconSelectionIndex + 1) % submenuIcons.length;
		const currentSelectedIcon = submenuIcons[subIconSelectionIndex];
		currentSelectedIcon.classList.add("selected");

		// Logga markerad subikon för debugging
		console.log("Togglesub: markerad subikon:", currentSelectedIcon.id);
	} else {
		// Annars, toggla mellan huvudikoner
		iconIds.forEach(id => {
			document.getElementById(id).classList.remove("selected");
		});

		// Markera den aktuella huvudikonen
		const currentIconId = iconIds[currentSelectionIndex];
		const iconElement = document.getElementById(currentIconId);
		iconElement.classList.add("selected");

		// Växla till nästa huvudikon
		currentSelectionIndex = (currentSelectionIndex + 1) % iconIds.length;
	}
}

// Funktion för att bekräfta huvudikon eller subikon
function confirmSelection() {
	if (currentSubmenuId) {
		// Om en submeny är aktiv, bekräfta valet i submenyn
		const submenuIcons = document.querySelectorAll(`#${currentSubmenuId} .submenu-icon`);
		const selectedSubIcon = submenuIcons[subIconSelectionIndex];

		// Bekräfta den valda subikonen
		console.log("Bekräftat subval:", selectedSubIcon ? selectedSubIcon.id : "Ingen subikon vald");

		// Här säkerställer vi att den valda subikonen är markerad när den bekräftas
		submenuIcons.forEach(icon => icon.classList.remove("selected"));
		selectedSubIcon.classList.add("selected");

		// Du kan lägga till en visuell bekräftelse här om det behövs
		alert("Subikon bekräftad: " + selectedSubIcon.id);  // För att visa vilken subikon som valdes
	} else {
		// Annars, bekräfta valet i huvudmenyn och visa submeny
		const selectedIconId = iconIds[(currentSelectionIndex - 1 + iconIds.length) % iconIds.length];

		// Dölj alla submenyer
		Object.values(submenuIds).forEach(subId => {
			const submenuElement = document.getElementById(subId);
			submenuElement.classList.add("hidden");
			submenuElement.style.visibility = "hidden";  // Säkerställer att den är osynlig
		});

		// Visa vald submeny och spara dess ID
		currentSubmenuId = submenuIds[selectedIconId];
		const submenuElement = document.getElementById(currentSubmenuId);
		submenuElement.classList.remove("hidden");
		submenuElement.style.visibility = "visible";  // Gör submenyn synlig på skärmen

		// Återställ subikon index när en ny submeny öppnas
		subIconSelectionIndex = 0;

		// Första subikonen markeras direkt när submenyn öppnas (om det finns subikoner)
		const submenuIcons = document.querySelectorAll(`#${currentSubmenuId} .submenu-icon`);
		if (submenuIcons.length > 0) {
			submenuIcons[subIconSelectionIndex].classList.add("selected");
			console.log("Första subikon markerad:", submenuIcons[subIconSelectionIndex].id);
		}

		console.log("Bekräftat huvudval, visar submeny:", currentSubmenuId);
	}
}

// Funktion för att avbryta och återgå till huvudmenyn
function cancelSelection() {
	// Ta bort 'selected' från huvudikoner
	iconIds.forEach(id => {
		document.getElementById(id).classList.remove("selected");
	});

	// Dölj alla submenyer och ta bort 'selected' från subikoner
	Object.values(submenuIds).forEach(subId => {
		const submenuElement = document.getElementById(subId);
		submenuElement.classList.add("hidden");        // Döljer submenyn
		submenuElement.style.visibility = "hidden";    // Säkerställer att den är osynlig

		// Ta bort 'selected' från alla subikoner i varje submeny
		const submenuIcons = submenuElement.querySelectorAll('.submenu-icon');
		submenuIcons.forEach(icon => icon.classList.remove("selected"));
	});

	// Återställ variabler
	currentSelectionIndex = 0;
	currentSubmenuId = null;
	subIconSelectionIndex = 0;

	console.log("Selection cancelled, returning to main menu.");
}

// Event-lyssnare för knappar
document.getElementById("select").addEventListener("click", toggleSelection); // Växla mellan ikoner
document.getElementById("confirm").addEventListener("click", confirmSelection); // Bekräfta valet
document.getElementById("cancel").addEventListener("click", cancelSelection); // Avbryt och återgå*/






// Rutin för submeny slutar här ////////////////////////



/*const maxHunger = 100
let hunger = 0

const maxEnergy = 100
let energy = 100

const intervalTime = 10000

const pet = document.querySelector('.pet')

function hungerInterval() {
	if(hunger >= maxHunger){
		console.log('You are dead')

		clearInterval(setHungerInterval)
	}
	else {
		hunger++
	}

	if(hunger >= 50) {


 }
 console.log('Du är så här hungrig: ' + hunger + '/' + maxHunger)
}

// gör någonting efter en viss tid har gått
const ourTimeout = setTimeout(ourFunction, 1000)

// clearTimeout stänger av vår timeout innan den hinner köra (om clearTimout kör innan timeouten har körts)
clearTimeout(ourTimeout)

// gör någonting vid varje intervall
const setHungerInterval = setInterval(hungerInterval, intervalTime)

// clearInterval stänger av vår intervall när vi inte längre vill att den ska köra!
// clearInterval(setHungerInterval)

const setEnergyInterval = setInterval(() => {
	energy--

	if (energy <= 0) {
		console.log("du har slut på energi och faller ihop, tråkigt.")
		clearInterval(setEnergyInterval)
	}

	console.log("du är såhär energiig fortfarande: " + energy + "/" + maxEnergy)
}, intervalTime)



/*const playButton = document.querySelector('.eat')

playButton.addEventListener('click', () => {
	hunger -= 10

	if (hunger < 0) {
		hunger = 0
	}

	playButton.disabled = true
	setTimeout(() => {
		playButton.disabled = false
	}, 5000)
})*/










// Här provar vi nytt //////////////////////////////////////////////////////////////////



/*let isInSubmenu = false;
let submenuSelectionIndex = 0;  // Tracks submenu selection

// Main menu selection (btn-1)
function toggleSelection() {
	console.log("currentSelectionIndex in toggle:", currentSelectionIndex); // Debugging log

	if (isInSubmenu) {
		// Scroll through items within the submenu if open
		const selectedIconId = iconIds[currentSelectionIndex];
		const items = submenuIds[selectedIconId].items;
		if (items.length > 0) {
			submenuSelectionIndex = (submenuSelectionIndex + 1) % items.length;
		}
	} else {
		// Scroll through main menu items
		iconIds.forEach(id => document.getElementById(id).classList.remove("selected"));
		const currentIconId = iconIds[currentSelectionIndex];
		document.getElementById(currentIconId).classList.add("selected");

		// Move to next icon, wrapping around
		currentSelectionIndex = (currentSelectionIndex + 1) % iconIds.length;
	}
}

// Confirm selection (btn-2)
function confirmSelection() {
	console.log("currentSelectionIndex in confirm:", currentSelectionIndex); // Debugging log

	if (isInSubmenu) {
		// Commit the submenu item selection
		const selectedIconId = iconIds[currentSelectionIndex];
		const selectedSubmenuItem = submenuIds[selectedIconId].items[submenuSelectionIndex];
		console.log("Confirmed submenu item:", selectedSubmenuItem);

		// Return to the main menu
		isInSubmenu = false;
		submenuSelectionIndex = 0;  // Reset submenu selection
		toggleMenuDisplay(false);  // Hide submenu
	} else {
		// Open submenu for the selected icon
		const selectedIconId = iconIds[currentSelectionIndex];
		console.log("Opened submenu for:", selectedIconId); // Debugging log
		const submenu = submenuIds[selectedIconId];

		if (submenu && submenu.items.length > 0) {
			isInSubmenu = true;
			submenuSelectionIndex = 0;  // Reset submenu selection when opening it
			toggleMenuDisplay(true);  // Show submenu
		} else {
			// If no submenu items, simply confirm the action
			console.log("Confirmed action:", selectedIconId);
		}
	}
}

// Cancel selection (btn-3) and return to the main menu
function cancelSelection() {
	console.log("Cancel pressed, returning to main menu.");

	if (isInSubmenu) {
		// Exit submenu and return to main menu
		isInSubmenu = false;
		submenuSelectionIndex = 0;
		toggleMenuDisplay(false);  // Hide submenu
	}
}

// Function to show/hide submenus based on current selection
function toggleMenuDisplay(showSubmenu) {
	Object.keys(submenuIds).forEach(icon => {
		const element = document.getElementById(submenuIds[icon].id);
		if (element) {
			// Show the submenu for the selected icon, hide others
			element.classList.toggle("hidden", !(showSubmenu && icon === iconIds[currentSelectionIndex]));
		}
	});
}

// Event listeners for buttons
document.getElementById("select").addEventListener("click", toggleSelection);
document.getElementById("confirm").addEventListener("click", confirmSelection);
document.getElementById("cancel").addEventListener("click", cancelSelection);*/




// Här slutar det /////////////////////////////////////////////////////////////////////////






/*const maxHunger = 100
let hunger = 0

const maxEnergy = 100
let energy = 100




function ourFunction(){
console.log("Vår funktion i setTimeout körs")

}

function hungerInterval() {
	
	if (hunger >= maxHunger) {
		console.log("du svalt ihjäl")
		clearInterval(setHungerInterval)
	}
	else {
		hunger++
	}
	
	console.log("du är så här hungrig" + hunger + "/" + maxHunger)
}

// gör något efter viss tid har gått
const ourTimeout = setTimeout (ourFunction, 10000)

// clearTimeout stänger av vår timeout innan den hinner köra (om clearTimeout kör innan timeouten har körts )
clearTimeout(ourTimeout)

// gör någonting vid varje intervall
const setHungerInterval = setInterval (hungerInterval, 2000)

// clearInterval stänger av vår intervall när vi inte längre vill köra
//clearInterval(setHungerInterval)


const setEnergyInterval = setInterval(() => {
	energy--

	if(energy <= 0) {
		console.log("du har slut på energi")
		clearInterval(setEnergyInterval)
	}

	console.log("du är så här energilös" + energy + "/" + maxEnergy)

}, 2000)




const eatButton = document.querySelector('.eat')

eatButton.addEventListener('click', ()=> {
	hunger-= 10

	if(hunger < 0){
		hunger = 0
	}
	eatButton.disabled = true
	setTimeout(() => {
		eatButton.disabled = false
	},5000)
})*/
