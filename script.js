/* Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//var PDF_PATH = "livro.pdf";
//var PAGE_NUMBER = 13;
var glTextoFull = "";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "js/build/pdf.worker.js";


async function pageLoaded(PDF_PATH) {
  // Loading document and page text content
  const loadingTask = pdfjsLib.getDocument({ url: PDF_PATH });
  const pdfDocument = await loadingTask.promise;
  var page = await pdfDocument.getPage(1);
  var j = 1;
  var excecao = 0;
  while( (page != null) ){
    if (excecao){break}
    try{ page = await pdfDocument.getPage(j++);}
    catch(e){console.log("estourou com j valendo: " + j);excecao = 1;}
    var textContent = await page.getTextContent();
    console.log(textContent);
    for(var i = 0; i < textContent.items.length; i++){
        glTextoFull = glTextoFull + textContent.items[i].str;
    }
  }
  console.log(glTextoFull);
  page.cleanup();
  return glTextoFull;
}

document.addEventListener("DOMContentLoaded", function () {
  if (typeof pdfjsLib === "undefined") {
    alert("Please build the pdfjs-dist library using\n  `gulp dist-install`");
    return;
  }
});