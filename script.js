// =========================================================
// === VARIÁVEIS E INICIALIZAÇÃO ===
// =========================================================
const CHAVE_SENHA = 'appSenhaSegura';
const CHAVE_NOME = 'contatoNome';
const CHAVE_NUMERO = 'contatoNumero';

// Garante que a primeira coisa a rodar seja a configuração de LOGIN
document.addEventListener('DOMContentLoaded', configurarTelaInicial);

// =========================================================
// === CONTROLE DE TELAS ===
// =========================================================

function esconderTodasTelas() {
    // Lista de TODOS os IDs das seções principais
    const telas = [
        'tela-login',
        'tela-inicial',
        'container-respiracao',
        'contatos-emergencia',
        'galeria-conforto',
        'cadastro-contato',
        'diario-sentimentos',
        'historico-diario',
        'psicoeducacao',
        'momento-zen'
    ];
    
    telas.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.style.display = 'none';
        }
    });
}

function irParaHome() {
    esconderTodasTelas();
    document.getElementById('tela-inicial').style.display = 'block';
}

// =========================================================
// === LÓGICA DE AUTENTICAÇÃO (LOGIN / CADASTRO) ===
// =========================================================

function configurarTelaInicial() {
    esconderTodasTelas();
    document.getElementById('tela-login').style.display = 'block';

    if (localStorage.getItem(CHAVE_SENHA)) {
        // Senha existe, mostra a área de LOGIN
        document.getElementById('cadastro-senha').style.display = 'none';
        document.getElementById('area-login').style.display = 'block';
    } else {
        // Senha NÃO existe, mostra a área de CADASTRO
        document.getElementById('cadastro-senha').style.display = 'block';
        document.getElementById('area-login').style.display = 'none';
    }
    
    // Roda outras inicializações necessárias (como os links de crise)
    atualizarLinkDeCrise(); 
    carregarMeditacoes(); 
    carregarArtigos();
}

function cadastrarSenha() {
    const senha = document.getElementById('input-senha-nova').value;
    const feedback = document.getElementById('feedback-login');

    if (senha.length < 4) {
        feedback.textContent = 'A senha deve ter pelo menos 4 caracteres.';
        return;
    }

    localStorage.setItem(CHAVE_SENHA, senha);
    feedback.textContent = 'Senha criada com sucesso! Acessando...';

    document.getElementById('input-senha-nova').value = '';
    setTimeout(fazerLoginSucesso, 1000);
}

function fazerLogin() {
    const senhaDigitada = document.getElementById('input-senha-login').value;
    const senhaSalva = localStorage.getItem(CHAVE_SENHA);
    const feedback = document.getElementById('feedback-login');

    if (senhaDigitada === senhaSalva) {
        fazerLoginSucesso();
    } else {
        feedback.textContent = 'Senha incorreta. Tente novamente.';
        document.getElementById('input-senha-login').value = '';
    }
}

function fazerLoginSucesso() {
    esconderTodasTelas();
    document.getElementById('tela-inicial').style.display = 'block';
}

// =========================================================
// === ROTA 1: RESPIRAÇÃO 4-7-8 ===
// =========================================================

function iniciarCiclo() {
    esconderTodasTelas();
    document.getElementById('container-respiracao').style.display = 'flex';
    // Lógica completa do 4-7-8 deve vir aqui (código que você já tinha)
    alert("Iniciando Respiração 4-7-8 (Lógica de animação deve ser inserida aqui)");
}

// =========================================================
// === ROTA 2: CONTATOS DE EMERGÊNCIA / CADASTRO ===
// =========================================================

function irParaAcoesDeCrise() {
    esconderTodasTelas();
    document.getElementById('contatos-emergencia').style.display = 'block'; 
}

function irParaConfiguracoes() {
    esconderTodasTelas();
    document.getElementById('cadastro-contato').style.display = 'block';
    atualizarLinkDeCrise(); 
}

function salvarContato() {
    const nome = document.getElementById('input-nome').value;
    const numero = document.getElementById('input-numero').value;

    if (nome && numero) {
        localStorage.setItem(CHAVE_NOME, nome);
        localStorage.setItem(CHAVE_NUMERO, numero);
        alert(`✅ Contato (${nome}) salvo com sucesso!`);
        document.getElementById('input-nome').value = '';
        document.getElementById('input-numero').value = '';
        atualizarLinkDeCrise();
    } else {
        alert("Preencha nome e telefone.");
    }
}

function atualizarLinkDeCrise() {
    const nomeSalvo = localStorage.getItem(CHAVE_NOME) || 'Contato Pessoal';
    const numeroSalvo = localStorage.getItem(CHAVE_NUMERO);
    const linkElemento = document.getElementById('link-contato-pessoal'); 

    if (linkElemento) {
        if (numeroSalvo) {
            linkElemento.href = `tel:${numeroSalvo}`;
            linkElemento.textContent = `LIGAR PARA ${nomeSalvo.toUpperCase()}`;
            linkElemento.style.backgroundColor = '#4CAF50'; 
            linkElemento.style.cursor = 'pointer';
            linkElemento.onclick = null; // Remove o alerta de não cadastrado
        } else {
            linkElemento.href = '#'; 
            linkElemento.textContent = 'CADASTRE SEU CONTATO DE CONFIANÇA';
            linkElemento.style.backgroundColor = '#FF9800'; 
            linkElemento.style.cursor = 'default';
            linkElemento.onclick = function() {
                alert("Você precisa cadastrar o contato na tela de Configurações!");
                irParaConfiguracoes();
            };
        }
    }
}

// =========================================================
// === GALERIA DE CONFORTO ===
// =========================================================

function irParaGaleria() {
    esconderTodasTelas();
    document.getElementById('galeria-conforto').style.display = 'block';
}

// =========================================================
// === MOMENTO ZEN / MEDITAÇÃO ===
// =========================================================

const meditacoes = [
    { 
        titulo: "Meditação com Foco na Respiração (Seu Short)", 
        descricao: "Use este áudio para voltar ao momento presente e acalmar a mente.",
        embedUrl: "https://www.youtube.com/embed/v9L8Igry5BQ?controls=0" 
    },
    // Adicione mais meditações aqui
];

function irParaMomentoZen() {
    esconderTodasTelas();
    document.getElementById('momento-zen').style.display = 'block';
    carregarMeditacoes();
}

function carregarMeditacoes() {
    const lista = document.getElementById('lista-meditacoes');
    if (!lista) return; // Garante que a lista existe
    lista.innerHTML = ''; 

    meditacoes.forEach(item => {
        const cartao = document.createElement('div');
        cartao.className = 'meditacao-cartao';

        const cartaoHTML = `
            <h3 class="meditacao-titulo">${item.titulo}</h3>
            <p>${item.descricao}</p>
            <div class="meditacao-player">
                <iframe src="${item.embedUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
        `;
        
        cartao.innerHTML = cartaoHTML;
        lista.appendChild(cartao);
    });
}

// =========================================================
// === PSICOEDUCAÇÃO / RECURSOS ===
// =========================================================

const artigos = [
    { titulo: "O que é Ansiedade? Sintomas e Causas", url: "#" }, 
    { titulo: "Depressão: Mitos e Fatos", url: "#" },
];

function irParaPsicoeducacao() {
    esconderTodasTelas();
    document.getElementById('psicoeducacao').style.display = 'block';
    carregarArtigos();
}

function carregarArtigos() {
    const lista = document.getElementById('lista-artigos');
    if (!lista) return;
    lista.innerHTML = ''; 

    artigos.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        a.textContent = item.titulo;
        a.href = item.url;
        a.target = "_blank"; 
        
        li.appendChild(a);
        lista.appendChild(li);
    });
}

// =========================================================
// === DIÁRIO DE SENTIMENTOS / HISTÓRICO ===
// =========================================================

let humorSelecionado = null; 

function irParaDiario() {
    esconderTodasTelas();
    document.getElementById('diario-sentimentos').style.display = 'block';
}

function selecionarHumor(nomeHumor, iconeHumor) {
    humorSelecionado = { nome: nomeHumor, icone: iconeHumor };
    document.getElementById('humor-atual').textContent = `${nomeHumor} ${iconeHumor}`;

    document.querySelectorAll('.btn-humor').forEach(btn => {
        btn.classList.remove('selecionado');
    });
    // Lógica para selecionar o botão visualmente (depende de como você implementou)
    // Se precisar de ajuda para implementar a seleção visual aqui, me avise!
}

function salvarRegistro() {
    const texto = document.getElementById('texto-diario').value;

    if (!humorSelecionado || texto.trim() === '') {
        alert("Por favor, selecione um humor e escreva algo antes de salvar.");
        return;
    }

    // 1. Carregar registros existentes
    const registrosTexto = localStorage.getItem('registrosDiario');
    const registros = registrosTexto ? JSON.parse(registrosTexto) : [];

    // Cria um ID único usando a hora atual e um número aleatório (para garantir exclusão)
    const novoRegistro = {
        id: Date.now() + Math.floor(Math.random() * 1000), 
        data: new Date().toLocaleString(),
        humor: humorSelecionado,
        texto: texto
    };

    // 2. Adicionar e Salvar
    registros.push(novoRegistro);
    localStorage.setItem('registrosDiario', JSON.stringify(registros));

    alert("Registro de diário salvo com sucesso!");
    
    // Limpa a tela
    document.getElementById('texto-diario').value = '';
    document.getElementById('humor-atual').textContent = 'Nenhum';
    humorSelecionado = null;
}

function verHistorico() {
    esconderTodasTelas();
    document.getElementById('historico-diario').style.display = 'block';
    carregarHistorico();
}

function carregarHistorico() {
    const listaRegistrosElemento = document.getElementById('lista-registros');
    if (!listaRegistrosElemento) return;
    
    listaRegistrosElemento.innerHTML = ''; 

    const registrosTexto = localStorage.getItem('registrosDiario');
    let registros = registrosTexto ? JSON.parse(registrosTexto) : [];

    if (registros.length === 0) {
        listaRegistrosElemento.innerHTML = '<p style="text-align: center; color: #777;">Você ainda não tem registros no diário.</p>';
        return;
    }

    // 1. GARANTE O ID (ESSENCIAL PARA A EXCLUSÃO)
    // Mapeia e adiciona um ID para garantir que registros antigos possam ser excluídos
    registros = registros.map((r, index) => ({ 
        ...r, 
        id: r.id !== undefined ? r.id : Date.now() + index 
    }));

    // Inverte a ordem para mostrar os mais recentes primeiro
    registros.slice().reverse().forEach(registro => {
        
        const cartaoHTML = `
            <div class="registro-cartao">
                <div class="registro-cabecalho">
                    <div style="display:flex; align-items:center;">
                        <span class="registro-humor-icone">${registro.humor.icone}</span>
                        <strong>${registro.humor.nome}</strong>
                    </div>
                    <span class="registro-data">${registro.data}</span>
                    <button onclick="excluirRegistro(${registro.id})" class="botao-excluir">X</button>
                </div>
                <p class="registro-texto">${registro.texto}</p>
            </div>
        `;

        listaRegistrosElemento.innerHTML += cartaoHTML;
    });

    // Salva a lista com os IDs atualizados (caso tenha adicionado IDs a registros antigos)
    localStorage.setItem('registrosDiario', JSON.stringify(registros));
}

function excluirRegistro(idDoRegistro) {
    if (!confirm("Tem certeza que deseja excluir este registro do diário?")) {
        return; 
    }
    
    const registrosTexto = localStorage.getItem('registrosDiario');
    let registros = registrosTexto ? JSON.parse(registrosTexto) : [];

    // Filtra: remove o item com o ID correspondente
    const novoArrayRegistros = registros.filter(r => r.id !== idDoRegistro);
    
    // Salva o novo Array
    localStorage.setItem('registrosDiario', JSON.stringify(novoArrayRegistros));

    alert("Registro excluído com sucesso.");
    carregarHistorico(); // Atualiza a tela
}