import type { Container } from "pixi.js";
import RC4Cipher from "./RC4Cipher";
import ByteArray from "./flash/utils/ByteArray";

// §_o_-_--§
export default class DomainLock {
  // §_o_--_§
  private EncryptedDomainListAsset: new () => ByteArray;
  // §_o_----§
  private DecryptionKeyAsset: new () => ByteArray;

  constructor() {
    // Todo o código ofuscado no construtor original foi removido.
    // Estas eram as duas únicas linhas de código que realmente faziam algo.
    this.EncryptedDomainListAsset = class extends ByteArray {
      constructor() {
        super(new Uint8Array([0x89, 0xAC]));
      }
    }; // Asset com a lista de domínios criptografada
    this.DecryptionKeyAsset = class extends ByteArray {
      constructor() {
        super(new Uint8Array([0x08, 0x4A, 0x38, 0x5F, 0x20, 0x63]));
      }
    }; // Asset com a chave de descriptografia
  }

  public validateLocation(targetSprite: Container): boolean {
    var isLocalhostAllowed = false;
    var isAnyDomainAllowed = false;
    var allowedFullURLs: string[] = [];
    var domainRegexParts = "";

    var swfURL = window.location.host;
    var hostDomain = 'localhost';
    // var hostDomain: String = new LocalConnection().domain;
    var allowedDomainsList: string[] = this.getDecryptedDomainList().split("|");

    // 1. Processa a lista de domínios descriptografada para criar regras.
    for (const rule of allowedDomainsList) {
      var cleanRule = rule.toLocaleLowerCase();

      if (cleanRule == "?") {
        isAnyDomainAllowed = true;
      } else if (cleanRule.indexOf("localhost") > -1) {
        isLocalhostAllowed = true;
      } else if (cleanRule.indexOf("http:") == 0 || cleanRule.indexOf("https:") == 0) {
        // Adiciona URLs completas a uma lista separada
        allowedFullURLs.push(cleanRule);
      } else {
        // Constrói uma parte da expressão regular para domínios (e subdomínios)
        if (domainRegexParts != "") {
          domainRegexParts += "|";
        }
        // Transforma "*.exemplo.com" em uma regex que aceita subdomínios.
        var regexRule: String = cleanRule.replace("*.", "((\\w|-|_)+\\.)*");
        domainRegexParts += regexRule;
      }
    }

    // 2. Executa as verificações de validação.

    // Se o SWF está em um ambiente local (localhost)
    if (hostDomain.toLowerCase() == "localhost") {
      if (isLocalhostAllowed || isAnyDomainAllowed) {
        return true;
      } else {
        // Efeito colateral: esconde o conteúdo se a validação falhar em localhost
        targetSprite.width = 0;
        targetSprite.height = 0;
        return false;
      }
    }

    // Se houver domínios para verificar via Regex, testa a URL do SWF
    if (domainRegexParts.length > 0) {
      var domainRegex: RegExp = new RegExp("^https?://((www)+\\.)*(" + domainRegexParts + ")", "i");
      if (domainRegex.test(swfURL)) {
        return true;
      }
    }

    // Verifica se a URL do SWF corresponde a alguma das URLs completas permitidas
    for (let allowedURL of allowedFullURLs) {
      if (swfURL.indexOf(allowedURL) == 0) {
        return true;
      }
    }

    // Verificação final: se nenhuma regra de domínio ou URL foi definida,
    // a validação só passa se a regra "?" (qualquer domínio) foi encontrada.
    if (domainRegexParts.length == 0 && allowedFullURLs.length == 0) {
      if (isAnyDomainAllowed) {
        return true;
      }
    }

    // Se nenhuma das condições acima for satisfeita, a validação falha.
    // Efeito colateral: esconde o conteúdo.
    targetSprite.width = 0;
    targetSprite.height = 0;
    return false;
  }

  /**
   * Descriptografa a lista de domínios usando a chave embutida.
   * @return Uma string contendo a lista de domínios permitidos, separados por "|".
   */
  private getDecryptedDomainList(): string {
    // Instancia os assets embutidos
    var encryptedData = new this.EncryptedDomainListAsset();
    var key = new this.DecryptionKeyAsset();

    // A classe §_o_-__§ é o "descriptografador"
    var decryptor = new RC4Cipher(key);

    // O método §_o_-___-§ do descriptografador modifica o ByteArray 'encryptedData'
    decryptor.applyCipher(encryptedData);

    // Reseta a posição do cursor do ByteArray para o início
    encryptedData.position = 0;

    // Lê o conteúdo agora descriptografado como uma string UTF-8
    return encryptedData.readUTFBytes(encryptedData.length);
  }


}