import React, { useState } from "react";

import {
  savePDF,
  createProductVision,
  createLevantamentoDeRequisitos,
  createHistoriasDeUsuarios,
  createHistoriasDeUsuariosPriorizadas,
  createProductBacklog,
  createListaItensBacklog,
  createTarefasDoBacklog,
  createTestes,
} from "../public/scripts";

import styles from "../public/index.module.css";

function Home() {
  const [titulo, setTitulo] = useState("Documento de Visão do Produto");
  const [acao, setAcao] = useState("Gerar Requisitos");

  const realizarAcao = (gerarDocVisao = false) => {
    if (gerarDocVisao) {
      setTitulo("Documento de Visão do Produto");
      setAcao("Gerar Requisitos");
      createProductVision();
      return;
    }

    switch (acao) {
      case "Gerar Requisitos":
        setTitulo("Levantamento de Requisitos");
        createLevantamentoDeRequisitos();
        setAcao("Histórias de Usuários");
        break;
      case "Histórias de Usuários":
        setTitulo("Histórias de Usuários");
        createHistoriasDeUsuarios();
        setAcao("Priorizar Histórias");
        break;
      case "Priorizar Histórias":
        setTitulo("Histórias de Usuários Priorizadas");
        createHistoriasDeUsuariosPriorizadas();
        setAcao("Product Backlog");
        break;
      case "Product Backlog":
        setTitulo("Product Backlog");
        createProductBacklog();
        setAcao("Itens Prod. Back.");
        break;
      case "Itens Prod. Back.":
        setTitulo("Itens do Product Backlog");
        createListaItensBacklog();
        setAcao("Tarefas Prod. Back.");
        break;
      case "Tarefas Prod. Back.":
        setTitulo("Tarefas do Product Backlog");
        createTarefasDoBacklog();
        setAcao("Criar Testes");
        break;
      case "Criar Testes":
        setTitulo("Testes");
        createTestes();
        break;
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.scrumIcon} src="./scrum-icon.png" alt="MeuPO" />
      <pre className={styles.titulo}>MeuPO</pre>

      <form id="product-vision-form">
        <label className="label" htmlFor="product">
          Produto:
        </label>
        <input
          className={styles.input}
          type="text"
          id="product"
          name="product"
          required
        />
        <label htmlFor="target-audience">Público Alvo:</label>
        <input
          className={styles.input}
          type="text"
          id="target-audience"
          name="target-audience"
          required
        />
        <label className={styles.label} htmlFor="benefits">
          Benefícios:
        </label>
        <textarea
          className={styles.textarea}
          id="benefits"
          name="benefits"
          required
        ></textarea>
        <button
          className={styles.button}
          type="button"
          data-name="createProductVision"
          onClick={() => realizarAcao(true)}
        >
          Criar Documento
        </button>
      </form>
      <div id="containerResult" className={styles.containerResult}>
        <h3 id="titulo" className={styles.titulo}>
          {titulo}
        </h3>
        <textarea
          className={styles.textarea}
          id="product-vision"
          rows="10"
        ></textarea>

        <div className={styles.containerButton}>
          <button
            className={styles.button}
            type="button"
            data-name="savePDF"
            onClick={savePDF}
          >
            Salvar PDF
          </button>
          <button
            className={styles.button}
            type="button"
            data-name="proximaAcao"
            onClick={() => realizarAcao(false)}
          >
            {acao}
          </button>
        </div>
      </div>
      <footer className={styles.footer}>
        <p>
          ⭐Me ajude na votação.
          <a
            href="https://discord.com/channels/1228404913705451612/1228406162618060913/1238665143827562547"
            target="_blank"
          >
            {"  "}
            Clique aqui ⭐
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
