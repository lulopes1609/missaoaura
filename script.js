const perfis = [
    {
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Gosta de criar soluções e resolver problemas.",
        imagem: "imagens/perfil-1.jpg"
    },
    {
        id: 2,
        nome: "Explorador Planetário",
        categoria: "Exploração",
        descricao: "Gosta de aventuras e lugares novos.",
        imagem: "imagens/perfil-2.jpg"
    },
    {
        id: 3,
        nome: "Cientista Cósmico",
        categoria: "Ciência",
        descricao: "Gosta de pesquisar e descobrir coisas.",
        imagem: "imagens/perfil-3.jpg"
    },
    {
        id: 4,
        nome: "Comandante de Equipe",
        categoria: "Liderança",
        descricao: "Gosta de organizar e ajudar as pessoas.",
        imagem: "imagens/perfil-4.jpg"
    }
];

const perguntas = [
    {
        titulo: "1. O que você faria na missão?",
        opcoes: ["Construir equipamentos", "Explorar o planeta", "Investigar a vida", "Liderar a equipe"]
    },
    {
        titulo: "2. Como resolveria um problema?",
        opcoes: ["Criaria uma solução", "Procuraria pistas", "Analisaria os dados", "Organizaria a equipe"]
    },
    {
        titulo: "3. Qual ferramenta escolheria?",
        opcoes: ["Robô", "Mapa holográfico", "Laboratório", "Comunicador"]
    },
    {
        titulo: "4. Qual sua maior qualidade?",
        opcoes: ["Criatividade", "Coragem", "Curiosidade", "Liderança"]
    }
];

const formulario = document.getElementById("formulario");
const areaPerguntas = document.getElementById("perguntas");
const resultado = document.getElementById("resultado");
const nascimento = document.getElementById("nascimento");

function hoje() {
    const data = new Date();
    return data.getFullYear() + "-" +
        String(data.getMonth() + 1).padStart(2, "0") + "-" +
        String(data.getDate()).padStart(2, "0");
}

nascimento.max = hoje();

perguntas.forEach((pergunta, i) => {
    const grupo = document.createElement("fieldset");
    const titulo = document.createElement("legend");

    titulo.textContent = pergunta.titulo;
    grupo.appendChild(titulo);

    pergunta.opcoes.forEach((opcao, j) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");

        label.className = "opcao";
        radio.type = "radio";
        radio.name = "p" + i;
        radio.value = j + 1;
        radio.required = j === 0;

        label.append(radio, " " + opcao);
        grupo.appendChild(label);
    });

    areaPerguntas.appendChild(grupo);
});

function calcularIdade(data) {
    const nascimento = new Date(data + "T12:00:00");
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();

    if (hoje.getMonth() < nascimento.getMonth() ||
        (hoje.getMonth() === nascimento.getMonth() &&
         hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const data = nascimento.value;

    if (nome.length < 2 || !data || data > hoje()) {
        alert("Confira seu nome e sua data de nascimento.");
        return;
    }

    const pontos = [0, 0, 0, 0];

    for (let i = 0; i < perguntas.length; i++) {
        const resposta = document.querySelector(
            `input[name="p${i}"]:checked`
        );

        if (!resposta) {
            alert("Responda a todas as perguntas.");
            return;
        }

        pontos[Number(resposta.value) - 1]++;
    }

    const maior = Math.max(...pontos);
    const ganhadores = perfis.filter(
        (perfil, i) => pontos[i] === maior
    );

    resultado.innerHTML = "";
    resultado.hidden = false;

    const titulo = document.createElement("h2");
    titulo.textContent = "Seu resultado";
    resultado.appendChild(titulo);

    const texto = document.createElement("p");
    texto.textContent = "Olá, " +
        nome + "! Você tem " + calcularIdade(data) + " anos.";
    resultado.appendChild(texto);

    if (ganhadores.length > 1) {
        const aviso = document.createElement("p");
        aviso.textContent = "Você ficou entre estes perfis:";
        resultado.appendChild(aviso);
    }

    ganhadores.forEach(perfil => {
        const nomePerfil = document.createElement("h3");
        const categoria = document.createElement("p");
        const descricao = document.createElement("p");
        const imagem = document.createElement("img");

        nomePerfil.textContent = perfil.nome;
        categoria.textContent = "Categoria: " + perfil.categoria;
        descricao.textContent = perfil.descricao;
        imagem.src = perfil.imagem;
        imagem.alt = perfil.nome;

        resultado.append(nomePerfil, categoria, imagem, descricao);
    });

    resultado.scrollIntoView({ behavior: "smooth" });
});