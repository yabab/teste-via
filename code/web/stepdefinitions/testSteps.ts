import * as cucumber from "cucumber";
import * as generalUtils from "../../general/support/generalUtils_logic";
import * as protractor from "protractor";

const driver: protractor.ProtractorBrowser = protractor.browser;
const conditions: protractor.ProtractorExpectedConditions = protractor.ExpectedConditions;
const searchStrategy: protractor.ProtractorBy = protractor.By;

cucumber.Given(
    'que eu acesse o site das Casas Bahia', 
    async function (this: cucumber.World): Promise<void> {           
        await driver.waitForAngularEnabled(false);
        await driver.manage().window().maximize();
        await driver.get(generalUtils.getFromMemory("#dados.endereco_home$"));

        const campoBusca = protractor.element(
            searchStrategy.css(generalUtils.getFromMemory("#casas_bahia.home.campo_busca.css$"))
        );

        await driver.wait(
            conditions.elementToBeClickable(campoBusca),
            15000
        );
    }
);

cucumber.When(
    'busco por um produto',
    async function (this: cucumber.World): Promise<void> {
        const campoBusca = protractor.element(
            searchStrategy.css(
                generalUtils.getFromMemory("#casas_bahia.home.campo_busca.css$")
            )
        );

        await driver.wait(
            conditions.elementToBeClickable(campoBusca),
            15000
        );

        await campoBusca.sendKeys(generalUtils.getFromMemory("#dados.chaveBusca$"));

        const botaoBusca = protractor.element(
            searchStrategy.cssContainingText(
                generalUtils.getFromMemory("#casas_bahia.home.botao_busca.css$"),
                generalUtils.getFromMemory("#casas_bahia.home.botao_busca.texto$")
            )
        );

        await driver.wait(
            conditions.elementToBeClickable(botaoBusca),
            15000
        );

        await botaoBusca.click();
    }
);

cucumber.Then(
    'devo encontrar resultados',
    async function (this: cucumber.World): Promise<void> {
        const primeiroResultado = protractor.element(
            searchStrategy.css(
                generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.css$")
            )
        )

        await driver.wait(
            conditions.elementToBeClickable(primeiroResultado),
            15000
        );

        const primeiroResultadoNome = protractor.element(
            searchStrategy.css(
                `${generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.css$")} ${generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.nome_produto.css$")}`
            )
        );

        const nomeProduto = await primeiroResultadoNome.getText();
        
        if (!nomeProduto.includes(generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.nome_produto.texto$"))) {
            throw new Error("Produto relevante não encontrado!");
        }
    }
);

cucumber.Given(
    'que eu acesse a página do primeiro resultado',
    async function (this: cucumber.World): Promise<void> {
        const primeiroResultadoNome = protractor.element(
            searchStrategy.css(
                `${generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.css$")} ${generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.nome_produto.css$")}`
            )
        );

        await driver.wait(
            conditions.elementToBeClickable(primeiroResultadoNome),
            15000
        );

        await primeiroResultadoNome.click();

        const caixaDeCompra = protractor.element(
            searchStrategy.css(
                generalUtils.getFromMemory("#casas_bahia.pdp.caixa_de_compra.css$")
            )
        );

        await driver.wait(
            conditions.elementToBeClickable(caixaDeCompra),
            15000
        );
    }
);

cucumber.When(
    'clicar no botão do carrinho',
    async function (this: cucumber.World): Promise<void> {
        const adicionarAoCarrinho = protractor.element(
            searchStrategy.css(
                `${generalUtils.getFromMemory("#casas_bahia.pdp.caixa_de_compra.css$")} ${generalUtils.getFromMemory("#casas_bahia.pdp.caixa_de_compra.botao_adicionar_carrinho.css$")}`
            )
        );

        await driver.wait(
            conditions.elementToBeClickable(adicionarAoCarrinho),
            15000
        );

        await adicionarAoCarrinho.click();
    }
);

cucumber.Then(
    'tenho que chegar ao carrinho com o produto escolhido',
    async function (this: cucumber.World): Promise<void> {
        const tituloItemCarrinho = protractor.element(
            searchStrategy.css(
                generalUtils.getFromMemory("#casas_bahia.carrinho.titulo_item_carrinho.css$")
            )
        );

        await driver.wait(
            conditions.elementToBeClickable(tituloItemCarrinho),
            15000
        );
    }
);