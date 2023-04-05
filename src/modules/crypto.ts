import CryptoJS from 'crypto-js';
import config from '../config';

const encodeId = (userId: number) => {
  let encodedId = CryptoJS.AES.encrypt(
    userId.toString(),
    config.cryptoKey,
  ).toString();

  encodedId = encodedId
    .replace(/\+/g, 'p1L2u3S')
    .replace(/\//g, 's1L2a3S4h')
    .replace(/=/g, 'e1Q2u3A4l')
    .replace(/&/g, 'ieklip34')
    .replace(/%/g, 'eir33r');

  return encodedId;
};

const decodeId = (encodedId: string) => {
  let decodedId = encodedId
    .replace(/p1L2u3S/g, '+')
    .replace(/s1L2a3S4h/g, '/')
    .replace(/e1Q2u3A4l/g, '=')
    .replace(/ieklip34/g, '&')
    .replace(/eir33r/g, '%');

  const userId = CryptoJS.AES.decrypt(decodedId, config.cryptoKey).toString(
    CryptoJS.enc.Utf8,
  );

  return userId;
};

export default {
  encodeId,
  decodeId,
};
