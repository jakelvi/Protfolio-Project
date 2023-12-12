let inputLi = document.getElementById("inputLi");
let ul = document.getElementById("ulToLi");
let save = document.getElementById("save");
let load = document.getElementById("load");

let saveFile = [
    {
        name: "",
        value: "",
    }
];

const addItem = () => {
    if (inputLi.value != "") {
        let newElm = document.createElement("li");
        newElm.innerText = inputLi.value;
        newElm.className = "list-group-item";
        ul.appendChild(newElm);
        newElm.addEventListener("mouseenter", (e) => {
            e.target.classList.add("active");
        });
        newElm.addEventListener("mouseleave", (e) => {
            e.target.classList.remove("active");
        });
    };
};

//function that handles the click against pc, on each chosen level.
save.addEventListener("click", () => {
    overlay.style.display = "block";
    optionsMenu.style.top = "20%";
});

saveBtn1.addEventListener("click", () => {
    const saveFileName = prompt("Please enter a save file name:");

    saveFile.name = saveFileName;
    saveFile.value = inputLi.value;

    // Update the file text
    const fileTextSave = document.getElementById("saveBtn1");
    const fileTextLoad = document.getElementById("loadBtn1");
    fileTextSave.innerText = saveFileName;
    fileTextLoad.innerText = saveFileName;

    // Save to localStorage
    localStorage.setItem("saveFile", JSON.stringify(saveFile));
    console.log(localStorage);
    overlay.style.display = "none";
    optionsMenu.style.top = "-100%";
});



load.addEventListener("click", () => {
    overlay.style.display = "block";
    optionsMenu.style.top = "20%";
});

loadBtn1.addEventListener("click", () => {
    const savedData = localStorage.getItem("saveFile");
    if (savedData) {
        saveFile = JSON.parse(savedData);
        // Display the saved data in "save slot 1" or wherever you want
        // For example, if you want to set the inputLi value:
        ulToLi.value = saveFile.slot1.value;
    }
    overlay.style.display = "none";
    optionsMenu.style.top = "-100%";
});


const deleteItem = () => {
    if (inputLi.value != "") {
        let items = ul.getElementsByTagName("li");
        let itemsToRemove = [];
        for (let item of items) {
            if (item.innerText == inputLi.value) {
                itemsToRemove.push(item);
            }
        };
        for (let itemToRemove of itemsToRemove) {
            ul.removeChild(itemToRemove);
        }
    };
};


window.addEventListener("load", () => {
    document.getElementById("form1").addEventListener("submit", (e) => {
        e.preventDefault();
    })
    document.getElementById("btnToLi").addEventListener("click", () => {
        addItem();
    });
    document.getElementById("btnToDelete").addEventListener("click", () => {
        deleteItem();
    });

});