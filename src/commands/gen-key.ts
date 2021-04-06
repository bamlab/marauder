import { Command } from "@oclif/command";
import CliUx from "cli-ux";

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

    const existingKey = await ConfigService.getSecretKey();
    if (existingKey) {
      const override = await CliUx.confirm(
        "Repository is already configured with a secret key. Would you like to generate it again ? (y/n) "
      );
      if (!override) {
        throw new Error("Secret key already generated for this repository.");
      }
    }
    const key = await CryptoService.generateRepositorySecretKey();
    await ConfigService.storeSecretKey(key);
  }
}

// // ---- Repository flow ------
// // console.log(key);
// // const key = "HzW0GwUIRekbiPUZiK2Auzo+QpRXL2aDKbUKIuztk3w=";
// const [nonce, ciphertext] = await CryptoService.cipherSecret(key, "text text text text");
// // console.log(ciphertext);
// const _cleartext = await CryptoService.decipherSecret(key, nonce, ciphertext);
// // console.log(cleartext);

// // ---- Key exchange ------
// // TODO: is it better to use key exchange, rather that just https://github.com/paragonie/sodium-plus/blob/master/docs/SodiumPlus/sealed-boxes.md
// const clientKeypair = await CryptoService.generateClientKeypair();
// const clientPublicKey = await CryptoService.getPublicKey(clientKeypair);
// const serverKeypair = await CryptoService.generateServerKeypair();
// const serverPublicKey = await CryptoService.getPublicKey(serverKeypair);

// const [_si, serverOutgoingKey] = await CryptoService.getServerExchangeKeypair(serverKeypair, clientPublicKey);
// const [clientIncomingKey, _co] = await CryptoService.getClientExchangeKeypair(clientKeypair, serverPublicKey);

// // console.log(serverOutgoingKey, clientIncomingKey);
// const [xNonce, xCipher] = await CryptoService.cipherSecret(serverOutgoingKey, "text");
// const xClear = await CryptoService.decipherSecret(clientIncomingKey, xNonce, xCipher);
// console.log(xClear);
