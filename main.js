// Crear una instancia de JSZip
var zip = new JSZip();

// Crear la primera carpeta
var folder1 = zip.folder("Carpeta1");

// Agregar un archivo dentro de la primera carpeta con el contenido "Hola Mundo 1"
folder1.file("archivo1.txt", "Hola Mundo 1");

// Crear la segunda carpeta
var folder2 = zip.folder("Carpeta2");

// Agregar dos archivos dentro de la segunda carpeta
folder2.file("archivo2.txt", "Contenido del archivo 2");
folder2.file("archivo3.txt", "Contenido del archivo 3");

// Generar el archivo ZIP
/*zip.generateAsync({ type: "blob" }).then(function (content) {
  // Guardar el archivo ZIP usando FileSaver.js
  saveAs(content, "archivos.zip");
});
*/
