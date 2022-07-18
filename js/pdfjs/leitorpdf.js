pdfjsLib.GlobalWorkerOptions.workerSrc = "js/pdfjs/build/pdf.worker.js";


async function pageLoaded(PDF_PATH) {
  var loadingTask;
  var erro = 0;
  var encerraCodigo = 0;
  var glTextoFull = "";

  await fetch(PDF_PATH)
  .then( (response) => {
    if(!response.ok){
      encerraCodigo = 1;
    }
  })
  .catch( (error) => {console.log("erro desconhecido - provavel que o servidor nao tenha respondido")})

  if (encerraCodigo) return "Arquivo nao encontrado 404";

  loadingTask = await pdfjsLib.getDocument({ url: PDF_PATH })
  const pdfDocument = await loadingTask.promise;
  var page = await pdfDocument.getPage(1);
  var j = 1;
  var excecao = 0;
  while( (page != null) ){
    if (excecao){break}
    try{ page = await pdfDocument.getPage(j++);}
    catch(e){excecao = 1;}
    var textContent = await page.getTextContent();
    for(var i = 0; i < textContent.items.length; i++){
        glTextoFull = glTextoFull + textContent.items[i].str;
    }
    page.cleanup();
  }
  console.log(glTextoFull);
  return glTextoFull;
}

document.addEventListener("DOMContentLoaded", function () {
  if (typeof pdfjsLib === "undefined") {
    console.log("Please build the pdfjs-dist library using\n  `gulp dist-install`");
    return;
  }
});