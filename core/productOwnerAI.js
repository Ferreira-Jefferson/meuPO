const { GoogleGenerativeAI } = require("@google/generative-ai");
import redefineTextAreaSize from "../utils";

let API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

async function asnwer(prompt, textarea) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const system_instruction =
    "Você é um product owner da metodolodia scrum, sempre segue o que o usuário solicitou, considerando o máximo de detalhes possíveis para responder com a maior exatidão possível, sempre utilizando uma linguagem clara e objetiva. \n\n";
  const prompt_with_system_instruction = system_instruction + prompt;
  const result = await model.generateContentStream(
    prompt_with_system_instruction,
  );

  textarea.value = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    textarea.value += chunkText;
    redefineTextAreaSize(textarea);
  }
}

async function visao_do_produto(textarea, product, targetAudience, benefits) {
  const prompt = `
  ## Crie um Documento de Visão do Produto de acordo com as seguintes informações.

  Produto: ${product}.
  Público Alvo: ${targetAudience}.
  Benefícios: ${benefits}.

  # O documento deve incluir os seguintes elementos:

  * **Título:** O título será sempre o seguinte, Documento de Visão do Produto.
  * 1. **Introdução:** Descreva o propósito e o escopo do produto.
  * 2. **Posicionamento:** Explique a oportunidade de negócio, a declaração do problema e a declaração de posicionamento.
  * 3. **Descrição dos Usuários e das Partes Interessadas:** Forneça o perfil dos usuários e das partes interessadas.
  * 4. **Visão Geral do Produto:** Dê uma perspectiva do produto e um resumo das capacidades.
  * 5. **Recursos do Produto:** Liste e descreva em detalhes os recursos do produto.
  * 6. **Restrições:** Liste as restrições de design, implementação, interface e uso do produto.
  * 7. **Faixas de Qualidade:** Descreva as faixas de qualidade do produto.
  * 8. **Precedência e Prioridade:** Liste os recursos em ordem de prioridade.
  * **Conclusão:** Resumo do que foi levantado e conclusões obtidas.

  # Importante

  * Responda como um Product Owner (PO)
  * Lembre-se, o documento deve ser claro, completo e profissional.
  * O tom deve ser positivo e confiante.
  * A indentação e formatação do texto deve ser bem definida.
  * Não deve possuir tabelas
  * Deve possuir o título, todos os 8 elementos e a conclusão.

  # Cada elemento deve possuir o máximo de informação importante possível
  # Siga todas as regras definidas neste documento para pesquisar e formatar o resultado
  `;

  asnwer(prompt, textarea);
}

async function levantamento_de_requisitos(textarea) {
  const doc_visao_produto = textarea.value;
  const prompt = `
  # Com base no seguinte Documento de Visão do Produto, crie uma lista completa de requisitos funcionais e não funcionais para o produto. Além disso, considere outros requisitos que podem ser necessários para o projeto.

  ## Documento de Visão do Produto

    ${doc_visao_produto}

  # Importante

  * Responda como um Product Owner (PO)
  * Lembre-se, o documento deve ser claro, completo e profissional.
  * O tom deve ser positivo e confiante.
  * A indentação e formatação do texto deve ser bem definida.
  * Lembre-se, cada requisito deve incluir uma descrição clara do recurso ou funcionalidade, os critérios de aceitação e qualquer outra informação relevante. Além disso, os requisitos devem ser priorizados de acordo com a importância para o projeto.
  `;
  asnwer(prompt, textarea);
}

async function criar_historias_de_usuario(textarea) {
  const requisitos = textarea.value;
  const prompt = `
  Com base na seguinte lista de requisitos, crie histórias de usuários correspondentes para cada requisito. Cada história de usuário deve incluir um papel (como um usuário ou sistema), uma ação e um benefício.

  ## Lista de Requisitos

    ${requisitos}

  # Importante

  * Responda como um Product Owner (PO)
  * Lembre-se, o documento deve ser claro, completo e profissional.
  * O tom deve ser positivo e confiante.
  * A indentação e formatação do texto deve ser bem definida.
  * Lembre-se, cada história de usuário deve ser clara e concisa, e deve descrever quem está realizando a ação, o que eles estão tentando alcançar e por que isso é valioso para eles.
  * Siga o padrão: Como um [tipo de usuário], eu quero [uma meta] para que [uma razão].
  `;
  return asnwer(prompt, textarea);
}

async function priorizar_historias_de_usuario(textarea) {
  const historias = textarea.value;
  const prompt = `
  Com base na seguinte lista de histórias de usuários, priorize-as de acordo com a importância. Lembre-se, você não deve adicionar nenhuma nova história de usuário ou alterar o que foi definido, apenas ordená-las.

  ## Lista de Histórias de Usuários

    ${historias}

  # Importante

  * Responda como um Product Owner (PO)
  * Lembre-se, o documento deve ser claro, completo e profissional.
  * O tom deve ser positivo e confiante.
  * A indentação e formatação do texto deve ser bem definida.
  * Lembre-se, a priorização deve levar em consideração o valor que cada história de usuário traz para o produto, a complexidade de implementação e a urgência.
  `;
  asnwer(prompt, textarea);
}

async function criar_product_backlog(textarea) {
  const historias_priorizadas = textarea.value;
  const prompt = `  
  Com base na seguinte lista de histórias de usuários priorizadas, crie um Product Backlog. Lembre-se, você não deve adicionar nenhuma nova história de usuário ou alterar o que foi definido, apenas organize-as em um formato de Product Backlog.

  ## Lista de Histórias de Usuários Priorizadas

    ${historias_priorizadas}

  # Importante

  * Responda como um Product Owner (PO)
  * Lembre-se, o documento deve ser claro, completo e profissional.
  * O tom deve ser positivo e confiante.
  * A indentação e formatação do texto deve ser bem definida.
  * Lembre-se, o Product Backlog deve incluir cada história de usuário, juntamente com sua prioridade, estimativa de esforço e quaisquer outros detalhes relevantes.
  `;
  asnwer(prompt, textarea);
}

async function criar_lista_itens_backlog(textarea) {
  const product_backlog = textarea.value;
  prompt = `
  Com base nas seguintes histórias de usuários do backlog, crie uma lista concisa de itens de backlog. Lembre-se, você não deve adicionar nenhuma nova história de usuário ou alterar o que foi definido, apenas simplifique-as.

  ## Histórias de Usuários

  ${product_backlog}

  # Importante

  * O resultado deve ser uma lista de itens de backlog no seguinte formato:
    1. [Nome da História de Usuário] [Esforço]
    exemplo:
      1. item 1 [x]
      2. item 2 [y]

  * Caso tenham subitens deve seguir o seguinte padrão:
    1. [Nome da História de Usuário] [Esforço]
      1.1. [Nome da sub História de Usuário] [Esforço]
    exemplo:
      1. item 1 [x]
        1.1. subitem 1.1 [y]
      2. item 2 [x]
        2.1. subitem 1.1 [y]`;
  asnwer(prompt, textarea);
}

async function criar_backlog_de_tarefas(textarea) {
  const lista_itens_backlog = textarea.value;
  prompt = `
  Tomando o a lista de itens do product backlog determine quais são os requisitos ou tarefas para cumprir cada item. Lembre-se, você não adicione ou crie nenhum outro item, apenas use os que foram passados como referência.

  ## Lista de itens do Product Backlog

  ${lista_itens_backlog}

  # Importante

  * Essas tarefas ou requisitos devem ser mais específicas e abordar cada parte da funcionalidade de maneira detalhada.
  * Cada uma dessas tarefas representa uma parte específica da funcionalidade geral da ferramenta de gerenciamento de projetos e ajuda a alcançar a conclusão da história de usuário.
  * O resultado deve ser uma lista de tarefas no seguinte formato:
    1. [Item] [Esforço]
    exemplo:

      #1. item 1 [x]
        1.1 tarefa 1
        1.2 tarefa 2

      #2. item 2 [x]
        2.1 tarefa 1
        2.2 tarefa 2

  * Caso tenham subitens deve seguir o seguinte padrão:
    1. [Item] [Esforço]
      1.1. [Subitem] [Esforço]
    exemplo:

      #1. item 1 [x]
        1.1. subitem 1.1 [y]
          1.1.1 tarefa 1
          1.1.2 tarefa 2

      #2. item 2 [x]
        2.1. subitem 1.1 [y]
          2.1.1 tarefa 1
          2.1.2 tarefa 2

      * A tarefa não deve ter o esforço informado
      * Cada item principal deve iniciar com uma hashtag #, isso não se aplica a primeira tarefa
      * As tarefas não dever iniciar com hashtag, somente com o número de identificação
      * Todos os itens devem possuir tarefas claras`;
  asnwer(prompt, textarea);
}

async function criar_testes(textarea) {
  const tarefas = textarea.value;
  prompt = `
    ## Desenvolva o algorítmo dos testes de unidade para a funcionalidade ${tarefas}. O teste deve verificar se a funcionalidade está corretamente implementada e atende aos requisitos especificados. Considere diferentes cenários e casos de uso para garantir a robustez do teste.

    # Importante

    * Linguagem de desenvolvimento: NodeJs
    * Lib de teste: Jest
    * Certifique-se de incluir casos de teste positivos e negativos para abordar todos os possíveis resultados.
    * informe na descrição do teste se ele é um testes positivo ou negativo
    * Os comentários devem estar localizado sempre acima do código
    `;
  asnwer(prompt, textarea);
}

export {
  visao_do_produto,
  levantamento_de_requisitos,
  criar_historias_de_usuario,
  priorizar_historias_de_usuario,
  criar_product_backlog,
  criar_lista_itens_backlog,
  criar_backlog_de_tarefas,
  criar_testes,
};
