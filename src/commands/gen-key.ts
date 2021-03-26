import { Command } from "@oclif/command";
import { CryptographyKey } from "sodium-plus";

import { ConfigService } from "../services/config";
import { CryptoService } from "../services/crypto";

export default class GenKey extends Command {
  static description = "Init marauder";

  static usage = "gen-key";

  static examples = [
    `$ git-marauder gen-key

todo`,
  ];

  async run() {
    // TODO: check in git repository
    const isMarauderInstalled = await ConfigService.isMarauderInstalled();
    if (!isMarauderInstalled) {
      // TODO: log that gen-key also initialized repository
      await ConfigService.installMarauder();
    }

    // ---- Repository flow ------
    let key = await CryptoService.generateRepositorySecretKey();
    // console.log(key);
    // let key = "HzW0GwUIRekbiPUZiK2Auzo+QpRXL2aDKbUKIuztk3w=";
    let [nonce, ciphertext] = await CryptoService.cipherSecret(key, "text text text text");
    // console.log(ciphertext);
    let cleartext = await CryptoService.decipherSecret(key, nonce, ciphertext);
    // console.log(cleartext);

    // ---- Key exchange ------
    // TODO: is it better to use key exchange, rather that just https://github.com/paragonie/sodium-plus/blob/master/docs/SodiumPlus/sealed-boxes.md
    let clientKeypair = await CryptoService.generateClientKeypair();
    let clientPublicKey = await CryptoService.getPublicKey(clientKeypair);
    let serverKeypair = await CryptoService.generateServerKeypair();
    let serverPublicKey = await CryptoService.getPublicKey(serverKeypair);

    const [_si, serverOutgoingKey] = await CryptoService.getServerExchangeKeypair(serverKeypair, clientPublicKey);
    const [clientIncomingKey, _co] = await CryptoService.getClientExchangeKeypair(clientKeypair, serverPublicKey);

    // console.log(serverOutgoingKey, clientIncomingKey);
    let [xNonce, xCipher] = await CryptoService.cipherSecret(serverOutgoingKey, "text");
    let xClear = await CryptoService.decipherSecret(clientIncomingKey, xNonce, xCipher);
    console.log(xClear);
  }
}
