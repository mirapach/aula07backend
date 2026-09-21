import express from 'express';
const app = express();

const PORT = 3000;

app.use(express.json());

// ===============================================================================
// 1. Rota GET que responde com o status e regra da loja
// ===============================================================================

app.get('/', (req, res) => {
    res.json({ 
        "laboratorio": "PhoneFix Reparos Rápidos",
        "tempoDiagnosticoHoras": 4,
        "tecnicosCertificados": 3,
        "pecasOriginaisGarantidas": true
    });
});

// ===============================================================================
// NÍVEL 2: Array em Memória + Rota GET de Listagem
// ===============================================================================

 const servicos = [
    { id: 1, 
    "modeloAparelho": "Galaxy S23 Ultra", 
    "defeitoRelatado": "Vidro frontal trincado após queda",
    "nomeCliente": "Leandro Martins",
    "telaOriginalSolicitada": true,
    "orcamentoPrevisto": 750
},

    { id: 2, 
    "modeloAparelho": "IPhone 14 Pro", 
    "defeitoRelatado": "Troca de Bateria",
    "nomeCliente": "Bianca Silva",
    "telaOriginalSolicitada": true,
    "orcamentoPrevisto": 400
    },

    { id: 3, 
    "modeloAparelho": "Xiaomi 17 Ultra", 
    "defeitoRelatado": "Desoxidação pós cair na piscina",
    "nomeCliente": "Murilo Oliveira",
    "telaOriginalSolicitada": false,
    "orcamentoPrevisto": 320
    },
];

app.get('/servicos', (req, res) => {
    res.json({
        total: servicos.length,
        itens: servicos
    });
});

// ===============================================================================
// 3. NÍVEL 3: Rota POST com Validação de Payload (Status 400 vs 201)
// ===============================================================================

app.post('/servicos', (req, res) => {
    const dados = req.body;

    if (!dados.defeitoRelatado || !dados.orcamentoPrevisto || dados.orcamentoPrevisto <= 0) {
        return res.status(400).json({
            sucesso: false,
            erro: "Campos obrigatórios ausentes ou inválidos!",
            camposExigidos: ["defeitoRelatado", "orcamentoPrevisto"]
        });
    }

    const novoServico = {
        id: servicos.length + 1,
        modeloAparelho: dados.modeloAparelho,
        defeitoRelatado:dados.DefeitoRelatado,
        nomeCliente: dados.nomeCliente,
        telaOriginalSolicitada: Boolean(dados.telaOriginalSolicitada),
        orcamentoPrevisto: Number(dados.orcamentoPrevisto),
        cadastradoEm: new Date().toLocaleTimeString()
    };

    // 3. Salva no array em memÃ³ria
    servicos.push(novoServico);

    // 4. Responde com status 201 Created
    res.status(201).json({
        sucesso: true,
        mensagem: "Serviço cadastrado com sucesso!",
        servico: novoServico
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});