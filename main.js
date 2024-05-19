// Crear una instancia de JSZip
var zip = new JSZip();

// Extraccion de etiquetas
const basic = document.getElementById("basic");
const structure = document.getElementById("structure");
const btnGenerateArquitecture = document.getElementById(
  "generate-arquitecture"
);
const btnDowloadArquitecture = document.getElementById("dowload-arquitecture");
const btnCloseDowload = document.getElementById("close-dowload");
const btnNewRequirement = document.getElementById("new-requirement");

// Acciones
btnGenerateArquitecture.onclick = () => {
  toogleViewPrincipal();
};
btnDowloadArquitecture.onclick = () => {
  dowloadArquitecture();
};
btnCloseDowload.onclick = () => {
  toogleViewPrincipal();
};

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 27 && basic.classList.contains("hidden")) {
    toogleViewPrincipal();
  }
  if (event.ctrlKey && event.keyCode === 13) {
    if (basic.classList.contains("hidden")) {
      dowloadArquitecture();
    } else {
      toogleViewPrincipal();
    }
  }
  // Verifica si se presionó la tecla "R" y la tecla "Ctrl" al mismo tiempo
  if (event.ctrlKey && (event.key === "r" || event.key === "R")) {
    // Hacer algo cuando se presiona Ctrl + R
    alert("Ctrl + R presionado");

    // Evitar el comportamiento predeterminado de recargar la página
    event.preventDefault();
  }
});

// Funciones reutilizables
function toogleViewPrincipal() {
  basic.classList.toggle("hidden");
  structure.classList.toggle("hidden");
}
function dowloadArquitecture() {
  // Generar el archivo ZIP
  zip.generateAsync({ type: "blob" }).then(function (content) {
    // Guardar el archivo ZIP usando FileSaver.js
    saveAs(content, "archivos.zip");
  });
}

function addToZip(zip, fileSystem, parentId = null, parentFolder = zip) {
  fileSystem
    .filter((item) => item.parent === parentId)
    .forEach((item) => {
      if (item.type === "folder") {
        const folder = parentFolder.folder(item.name);
        addToZip(zip, fileSystem, item.id, folder);
      } else if (item.type === "file") {
        parentFolder.file(item.name, item.content);
      }
    });
}

// Bosquejo
const fileSystem = [
  {
    id: 1,
    name: ".mvm",
    type: "folder",
    content: "",
    parent: null, // Indica que está en la raíz
  },
  {
    id: 5,
    name: "src",
    type: "folder",
    content: "",
    parent: null, // Indica que está en la raíz
  },
  {
    id: 6,
    name: "main.java",
    type: "file",
    content: "hola mundo",
    parent: 5, // Indica que pertenece a 'Carpeta 2'
  },
  {
    id: 7,
    name: "pom.xml",
    type: "file",
    content: "",
    parent: null, // Indica que está en la raíz
  },
  {
    id: 8,
    name: ".gitignore",
    type: "file",
    content: "",
    parent: null, // Indica que está en la raíz
  },
];

const rootElement = document.getElementById("fileSystem");

function createFileSystemElement(item) {
  const element = document.createElement("div");
  element.classList.add(
    "flex",
    "justify-start",
    "items-baseline",
    "flex-col",
    "cursor-pointer",
    "w-full",
    "file-system-item"
  );

  const subElement = document.createElement("div");
  subElement.classList.add(
    "flex",
    "justify-start",
    "items-center",
    "w-full",
    "py-2",
    "hover:bg-bg-primary-live"
  );

  element.appendChild(subElement);

  const icon = document.createElement("i");
  const text = document.createElement("p");
  text.classList.add("text-slate-300", "text-sm", "font-medium");
  text.textContent = item.name;

  if (item.type === "folder") {
    icon.classList.add("bx", "bxs-folder", "text-xl", "pl-4", "pr-3");
    icon.style.color = "#fcf7f7";
  } else if (item.type === "file") {
    icon.classList.add("bx", "bxs-file-blank", "text-xl", "pl-4", "pr-3");
    icon.style.color = "#fcf7f7";
  }

  if (item.parent != null) {
    element.classList.add("ml-2");
  }

  subElement.appendChild(icon);
  subElement.appendChild(text);
  return element;
}

function appendFileSystemElements(parentElement, parentId) {
  fileSystem
    .filter((item) => item.parent === parentId)
    .forEach((item) => {
      const element = createFileSystemElement(item);
      parentElement.appendChild(element);
      if (item.type === "folder") {
        const childrenContainer = document.createElement("div");
        appendFileSystemElements(childrenContainer, item.id);
        element.appendChild(childrenContainer);
      }
    });
}

appendFileSystemElements(rootElement, null);

// Contruir zip
addToZip(zip, fileSystem);
