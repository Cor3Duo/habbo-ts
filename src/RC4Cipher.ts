import ByteArray from "./flash/utils/ByteArray";

export default class RC4Cipher {
  private readonly SBOX_SIZE = 256;
  private sbox!: ByteArray;

  // Índices 'i' e 'j' usados no algoritmo de geração de keystream (PRGA).
  private i = 0;
  private j = 0;

  /**
   * Construtor. Inicializa a cifra com a chave fornecida.
   * @param key A chave secreta a ser usada para a criptografia/descriptografia.
   */
  constructor(key: ByteArray) {
    // A chave é usada para preparar o estado interno da cifra.
    this.initialize(key);
  }

  /**
   * Prepara o estado interno da cifra (S-box) usando a chave.
   * Esta é a fase conhecida como "Key-Scheduling Algorithm" (KSA).
   * @param key A chave para inicializar o S-box.
   */
  public initialize(key: ByteArray): void {
    this.sbox = new ByteArray();
    let keyLength = key.length;

    // 1. Preenche o S-box com valores de 0 a 255.
    for (let k = 0; k < this.SBOX_SIZE; k++) {
      this.sbox.set(k, k);
    }

    // 2. Embaralha o S-box com base na chave fornecida.
    let j_ksa = 0;
    for (let k = 0; k < this.SBOX_SIZE; k++) {
      // A operação '& 255' é uma otimização para o módulo (%) 256.
      j_ksa = (j_ksa + this.sbox.get(k) + key.get(k % keyLength)) & 255;

      // Troca os valores de sbox[k] e sbox[j_ksa].
      var tempSwap = this.sbox.get(k);
      this.sbox.set(k, this.sbox.get(j_ksa));
      this.sbox.set(j_ksa, tempSwap);
    }

    // 3. Reseta os ponteiros para o início, prontos para gerar o keystream.
    this.i = 0;
    this.j = 0;
  }

  /**
   * Aplica a cifra RC4 ao ByteArray de dados fornecido.
   * A mesma função serve tanto para criptografar quanto para descriptografar.
   * O ByteArray é modificado diretamente (in-place).
   * @param data O ByteArray de dados a ser processado.
   */
  public applyCipher(data: ByteArray): void {
    for (let k = 0; k < data.length; k++) {
      // Combina cada byte dos dados com um byte do keystream usando XOR (^).
      data.set(k, data.get(k) ^ this.generateKeystreamByte());
    }
  }

  /**
   * Gera o próximo byte pseudo-aleatório do keystream.
   * Este é o "Pseudo-Random Generation Algorithm" (PRGA).
   * @return Um único byte (0-255) do keystream.
   */
  private generateKeystreamByte(): number {
    // Incrementa os ponteiros e os mantém dentro dos limites do S-box.
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.sbox.get(this.i)) & 255;

    // Troca os valores de sbox[i] e sbox[j].
    var tempSwap = this.sbox.get(this.i);
    this.sbox.set(this.i, this.sbox.get(this.j));
    this.sbox.set(this.j, tempSwap);

    // Calcula o índice do byte de saída e o retorna.
    var keystreamIndex = (this.sbox.get(this.i) + this.sbox.get(this.j)) & 255;
    return this.sbox.get(keystreamIndex);
  }
}