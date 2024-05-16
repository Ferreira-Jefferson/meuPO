import styles from "../../public/index.module.css";

function Sidebar({ isOpen }) {
  const options = [
    "Visão do Produto",
    "Levantamento de Requisitos",
    "Histórias de Usuários",
    "Histórias de Usuários Priorizadas",
    "Backlog do Produto",
    "Lista de Itens do Backlog",
    "Tarefas do Backlog",
    "Criar Testes",
  ];

  const selectOption = (option) => {
    console.log(option);
  };

  return (
    <div className={styles.sidebar} hidden={!isOpen}>
      {options.map((option, id) => (
        <pre key={id} onClick={() => selectOption(option)}>
          {option}
        </pre>
      ))}
    </div>
  );
}

export default Sidebar;
