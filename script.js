// Início do bloco JavaScript
        // Adiciona um 'ouvinte de evento' que espera o HTML inteiro ser carregado
        // antes de executar o código JS dentro dele. Boa prática para evitar erros.
        document.addEventListener('DOMContentLoaded', function() {

            // --- Variáveis Globais ---
            // Mantêm o 'estado' da aplicação.
            let fila = []; // Array (lista) para guardar as senhas que estão na fila. Começa vazio.
            let proximaSenhaNum = 1; // Contador para saber qual o número da próxima senha a gerar. Começa em 1.
            let senhaEmAtendimento = null; // Guarda a senha que está sendo atendida. Começa como null (ninguém).

            // --- Referências aos Elementos do DOM ---
            // Guarda em variáveis as referências aos elementos HTML que vamos manipular.
            // Fazemos isso uma vez aqui para não ter que procurar ('getElementById') toda hora.
            const senhaAtualElement = document.getElementById('senhaAtual'); // O <p> da senha atual.
            const filaEsperaElement = document.getElementById('filaEspera'); // A <div> da fila.
            const btnGerarSenha = document.getElementById('btnGerarSenha'); // O botão de gerar.
            const btnChamarSenha = document.getElementById('btnChamarSenha'); // O botão de chamar.

            // --- Funções ---
            // Blocos de código reutilizáveis.

            /**
             * Atualiza a interface do usuário (o que é mostrado na tela)
             * com base nos valores atuais das variáveis 'fila' e 'senhaEmAtendimento'.
             */
            function atualizarDisplays() {
                // Atualiza o texto da senha atual. Se 'senhaEmAtendimento' tiver valor, mostra ele, senão mostra '--'.
                senhaAtualElement.textContent = senhaEmAtendimento ? senhaEmAtendimento : '--';

                // Atualiza a lista de senhas na fila.
                if (fila.length > 0) { // Se a fila NÃO está vazia...
                    // Cria o HTML para mostrar cada senha como um 'span' estilizado.
                    // map() transforma cada senha em um 'span', join() junta tudo em uma string HTML.
                    filaEsperaElement.innerHTML = fila.map(senha => `<span class="senha-item">${senha}</span>`).join('');
                    // Remove a classe 'empty' (se existir) para tirar o estilo de fila vazia.
                    filaEsperaElement.classList.remove('empty');
                } else { // Se a fila ESTÁ vazia...
                    // Mostra o texto "Fila vazia".
                    filaEsperaElement.textContent = 'Fila vazia';
                    // Adiciona a classe 'empty' para aplicar o estilo CSS correspondente.
                    filaEsperaElement.classList.add('empty');
                }

                // Desabilita o botão "Chamar Próxima Senha" SE a fila estiver vazia.
                // A propriedade 'disabled' do botão se torna 'true' se fila.length for 0.
                btnChamarSenha.disabled = fila.length === 0;
            }

            /**
             * Gera uma nova senha, adiciona ao final da fila e atualiza a tela.
             */
            function gerarNovaSenha() {
                // Formata o número da senha com 3 dígitos (ex: 1 -> "001", 12 -> "012", 123 -> "123").
                const numeroFormatado = String(proximaSenhaNum).padStart(3, '0');
                // Cria a string da senha completa (ex: "S001").
                const novaSenha = "S" + numeroFormatado;

                // Adiciona a nova senha ao FINAL do array 'fila'.
                fila.push(novaSenha);
                // Incrementa o contador para a próxima senha ser gerada com o número seguinte.
                proximaSenhaNum++;

                // Atualiza a interface para mostrar a nova senha na fila.
                atualizarDisplays();
            }

            /**
             * Remove a primeira senha da fila, a define como 'senhaEmAtendimento' e atualiza a tela.
             */
            function chamarProximaSenha() {
                if (fila.length > 0) { // Só chama se houver alguém na fila.
                    // `fila.shift()`: Remove o PRIMEIRO elemento do array 'fila' e retorna esse elemento.
                    // Armazena a senha removida (a chamada) na variável 'senhaEmAtendimento'.
                    senhaEmAtendimento = fila.shift();
                } else { // Se a fila já estava vazia...
                    // Garante que 'senhaEmAtendimento' seja null.
                    senhaEmAtendimento = null;
                }
                // Atualiza a interface para mostrar a senha chamada (ou '--') e a fila restante.
                atualizarDisplays();
            }

            // --- Adicionar Ouvintes de Evento (Event Listeners) ---
            // Diz aos botões para executarem uma função quando forem clicados.
            // Quando 'btnGerarSenha' for clicado, chama a função 'gerarNovaSenha'.
            btnGerarSenha.addEventListener('click', gerarNovaSenha);
            // Quando 'btnChamarSenha' for clicado, chama a função 'chamarProximaSenha'.
            btnChamarSenha.addEventListener('click', chamarProximaSenha);

            // --- Inicialização ---
            // Chama a função 'atualizarDisplays' uma vez logo que a página carrega.
            // Isso garante que a tela comece mostrando o estado inicial correto
            // (ex: "Fila vazia", botão "Chamar" desabilitado).
            atualizarDisplays();
        });