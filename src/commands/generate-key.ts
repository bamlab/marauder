import { Command } from "@oclif/command";
import CliUx from "cli-ux";
import { Git } from "../git/git";

import { ConfigService } from "../services/config";
import { CryptoService } from "../services/crypto";

/**
 * Generate the repository secret
 *
 *
 * This command will generate the **secret keys** used in secret key cryptography to encrypt
 * the files specified in `.gitattributes`.
 *
 * If the repository is not initialized, initialized it and print a warning.
 *
 * Log an error and exit, if used in a non terminal interactive environment.
 *
 * @export
 * @class GenerateKey
 * @extends {Command}
 */
export default class GenerateKey extends Command {
  static description = "Init marauder";

  static usage = "generate-key";

  static examples = [
    `$ marauder generate-key

todo`,
  ];

  async run(): Promise<void> {
    // TODO: Check if environnement is terminal interactive

    // TODO: check we are insides git repository (later determine the backend)

    // TODO: if marauder is installed locally, install using "yarn marauder"
    const isMarauderInstalled = await ConfigService.isMarauderInstalled();
    if (!isMarauderInstalled) {
      // TODO: later determine the backend (git, hg, ect)
      // TODO: show the path relative to HOME https://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way
      const gitRepositoryPath = await Git.showTopLevel();
      // TODO: extract message so they can be translated
      this.warn(`The current repository ${gitRepositoryPath} was not initialized.`);
      // TODO: extract message so they can be translated
      const shallInitialize = await CliUx.confirm("Initialized it ? (y/n) ");
      if (!shallInitialize) {
        // TODO: extract message so they can be translated
        throw new Error("Repository is not initialized");
      }
      this.warn(`The current repository ${gitRepositoryPath} was not initialized.`);
      await ConfigService.installMarauder();
    }

    const isSecretKeyConfigured = await ConfigService.getSecretKey();
    if (isSecretKeyConfigured) {
      // TODO: extract message so they can be translated
      const shallOverrideSecretKey = await CliUx.confirm(
        "Repository is already configured with a secret key. Would you like to generate it again ? (y/n) "
      );
      // TODO: extract message so they can be translated
      if (!shallOverrideSecretKey) {
        throw new Error("Secret key already generated for this repository.");
      }
    }
    const secretKey = await CryptoService.generateRepositorySecretKey();
    await ConfigService.storeSecretKey(secretKey);
    // TODO: log if the secret key is successfully generated
  }
}

// TODO: remove that dead code
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
