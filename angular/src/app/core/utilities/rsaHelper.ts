import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';
// Add comment
@Injectable({
    providedIn: 'root',
})
export class RSAHelper {
    publicKey: string = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDzP0JD0ZGJv/OUn19YTVax2cgs
    /JgIPfLfggwEJ77IWLddkQCWPWIqgwiuaRiMvJ2/nmX5hVK8Ze3dLQw7hXaCdvJK
    Et4p4ghr/CXXIwaCUkAz/sTlELTBBfyZ4nLlYc3EhIGGPZncVpn4NaOPXRTCkvy6
    HvKifxBEdolD7L/57QIDAQAB
  -----END PUBLIC KEY-----`;

    constructor() { }

    encryptWithPublicKey(valueToEncrypt: string): string {
        const rsa = Forge.pki.publicKeyFromPem(this.publicKey);
        return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
    }
}