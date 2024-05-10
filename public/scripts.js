import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import {
  visao_do_produto,
  levantamento_de_requisitos,
  criar_historias_de_usuario,
  priorizar_historias_de_usuario,
  criar_product_backlog,
  criar_lista_itens_backlog,
  criar_backlog_de_tarefas,
  criar_testes,
} from "../core/productOwnerAI";

function getElementOfPage() {
  const product = document.getElementById("product").value;
  const targetAudience = document.getElementById("target-audience").value;
  const benefits = document.getElementById("benefits").value;
  const containerResult = document.getElementById("containerResult");
  const textarea = document.getElementById("product-vision");
  const titulo = document.getElementById("titulo").textContent;
  return {
    product,
    targetAudience,
    benefits,
    containerResult,
    textarea,
    titulo,
  };
}

function savePDF() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const { textarea, titulo } = getElementOfPage();

  const lines = textarea.value.split("\n");

  // Processa cada linha
  const formatText = (line) => {
    const titulos = line.startsWith("**") && line.endsWith("**");
    const subtitulos = line.startsWith("**") && line.includes(":**");
    const topico_simples = line.startsWith("* ");
    const topico_item = line.startsWith("* **") && line.includes(":**");

    if (topico_item) {
      const parts = line.split(":**");
      return {
        text: [
          {
            text: parts[0].slice(4) + ":",
            bold: true,
          },
          { text: parts[1] },
        ],
        margin: [10, 0, 0, 5],
      };
    } else if (subtitulos) {
      const parts = line.split(":**");
      return {
        text: [
          {
            text: parts[0].slice(2) + ":",
            bold: true,
          },
          { text: parts[1] },
        ],
        margin: [0, 0, 0, 5],
      };
    } else if (topico_simples) {
      return { text: line.slice(2), margin: [10, 0, 0, 5] };
    } else if (titulos) {
      return {
        text: line.slice(2, -2),
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 10],
      };
    } else {
      // Linha normal
      return { text: line, margin: [0, 0, 0, 5] };
    }
  };

  const content = lines.map(formatText);
  const docDefinition = {
    content: content,
  };

  const pdfDoc = pdfMake.createPdf(docDefinition);

  pdfDoc.download(`${titulo}.pdf`);
}

async function createProductVision() {
  const element = getElementOfPage();
  element.containerResult.style.display = "block";

  await visao_do_produto(
    element.textarea,
    element.product,
    element.targetAudience,
    element.benefits,
  );
}

async function createLevantamentoDeRequisitos() {
  const { textarea } = getElementOfPage();
  levantamento_de_requisitos(textarea);
}

async function createHistoriasDeUsuarios() {
  const { textarea } = getElementOfPage();
  criar_historias_de_usuario(textarea);
}

async function createHistoriasDeUsuariosPriorizadas() {
  const { textarea } = getElementOfPage();
  priorizar_historias_de_usuario(textarea);
}

async function createProductBacklog() {
  const { textarea } = getElementOfPage();
  criar_product_backlog(textarea);
}

async function createListaItensBacklog() {
  const { textarea } = getElementOfPage();
  criar_lista_itens_backlog(textarea);
}

async function createTarefasDoBacklog() {
  const { textarea } = getElementOfPage();
  criar_backlog_de_tarefas(textarea);
}

async function createTestes() {
  const { textarea } = getElementOfPage();
  criar_testes(textarea);
}

export {
  savePDF,
  createProductVision,
  createLevantamentoDeRequisitos,
  createHistoriasDeUsuarios,
  createHistoriasDeUsuariosPriorizadas,
  createProductBacklog,
  createListaItensBacklog,
  createTarefasDoBacklog,
  createTestes,
};
