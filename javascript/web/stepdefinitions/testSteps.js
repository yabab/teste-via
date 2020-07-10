"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber = __importStar(require("cucumber"));
const generalUtils = __importStar(require("../../general/support/generalUtils_logic"));
const protractor = __importStar(require("protractor"));
const driver = protractor.browser;
const conditions = protractor.ExpectedConditions;
const searchStrategy = protractor.By;
cucumber.Given('que eu acesse o site das Casas Bahia', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield driver.waitForAngularEnabled(false);
        yield driver.manage().window().maximize();
        yield driver.get(generalUtils.getFromMemory("#dados.endereco_home$"));
        const campoBusca = protractor.element(searchStrategy.css(generalUtils.getFromMemory("#casas_bahia.home.campo_busca.css$")));
        yield driver.wait(conditions.elementToBeClickable(campoBusca), 15000);
    });
});
cucumber.When('busco por um produto', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const campoBusca = protractor.element(searchStrategy.css(generalUtils.getFromMemory("#casas_bahia.home.campo_busca.css$")));
        yield driver.wait(conditions.elementToBeClickable(campoBusca), 15000);
        yield campoBusca.sendKeys(generalUtils.getFromMemory("#dados.chaveBusca$"));
        const botaoBusca = protractor.element(searchStrategy.cssContainingText(generalUtils.getFromMemory("#casas_bahia.home.botao_busca.css$"), generalUtils.getFromMemory("#casas_bahia.home.botao_busca.texto$")));
        yield driver.wait(conditions.elementToBeClickable(botaoBusca), 15000);
        yield botaoBusca.click();
    });
});
cucumber.Then('devo encontrar resultados', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const primeiroResultado = protractor.element(searchStrategy.css(generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.css$")));
        yield driver.wait(conditions.elementToBeClickable(primeiroResultado), 15000);
        const primeiroResultadoNome = protractor.element(searchStrategy.css(`${generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.css$")} ${generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.nome_produto.css$")}`));
        const nomeProduto = yield primeiroResultadoNome.getText();
        if (!nomeProduto.includes(generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.nome_produto.texto$"))) {
            throw new Error("Produto relevante não encontrado!");
        }
    });
});
cucumber.Given('que eu acesse a página do primeiro resultado', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const primeiroResultadoNome = protractor.element(searchStrategy.css(`${generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.css$")} ${generalUtils.getFromMemory("#casas_bahia.busca.primeiro_resultado.nome_produto.css$")}`));
        yield driver.wait(conditions.elementToBeClickable(primeiroResultadoNome), 15000);
        yield primeiroResultadoNome.click();
        const caixaDeCompra = protractor.element(searchStrategy.css(generalUtils.getFromMemory("#casas_bahia.pdp.caixa_de_compra.css$")));
        yield driver.wait(conditions.elementToBeClickable(caixaDeCompra), 15000);
    });
});
cucumber.When('clicar no botão do carrinho', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const adicionarAoCarrinho = protractor.element(searchStrategy.css(`${generalUtils.getFromMemory("#casas_bahia.pdp.caixa_de_compra.css$")} ${generalUtils.getFromMemory("#casas_bahia.pdp.caixa_de_compra.botao_adicionar_carrinho.css$")}`));
        yield driver.wait(conditions.elementToBeClickable(adicionarAoCarrinho), 15000);
        yield adicionarAoCarrinho.click();
    });
});
cucumber.Then('tenho que chegar ao carrinho com o produto escolhido', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const tituloItemCarrinho = protractor.element(searchStrategy.css(generalUtils.getFromMemory("#casas_bahia.carrinho.titulo_item_carrinho.css$")));
        yield driver.wait(conditions.elementToBeClickable(tituloItemCarrinho), 15000);
    });
});
//# sourceMappingURL=testSteps.js.map