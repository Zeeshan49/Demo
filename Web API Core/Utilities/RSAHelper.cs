﻿using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;
using System.Security.Cryptography;
using System.Text;
namespace BusinessCore.Services
{
    public interface IRSAHelper
    {
        string Decrypt(string value);
    }
    public class RSAHelper : IRSAHelper
    {
        private readonly RSACryptoServiceProvider PrivateKey;
        private readonly string privateKeyName = "private.key.pem";
        private readonly string privateKeyPath = "RSA";

        public RSAHelper() => PrivateKey = GetPrivateKeyFromPemFile();

        public string Decrypt(string encrypted)
        {
            try
            {
                var decryptedBytes = PrivateKey.Decrypt(Convert.FromBase64String(encrypted), false);
                return Encoding.UTF8.GetString(decryptedBytes, 0, decryptedBytes.Length);

            }
            catch (Exception ex)
            {

                throw;
            }
         
        }

        private RSACryptoServiceProvider GetPrivateKeyFromPemFile()
        {
            using TextReader privateKeyStringReader = new StringReader(File.ReadAllText(GetPath(privateKeyName, privateKeyPath)));
            AsymmetricCipherKeyPair pemReader = (AsymmetricCipherKeyPair)new PemReader(privateKeyStringReader).ReadObject();
            RSAParameters rsaPrivateCrtKeyParameters = DotNetUtilities.ToRSAParameters((RsaPrivateCrtKeyParameters)pemReader.Private);
            RSACryptoServiceProvider rsaCryptoServiceProvider = new RSACryptoServiceProvider();
            rsaCryptoServiceProvider.ImportParameters(rsaPrivateCrtKeyParameters);
            return rsaCryptoServiceProvider;
        }

        private string GetPath(string fileName, string filePath)
        {
            var path = Path.Combine(".", filePath);
            return Path.Combine(path, fileName);
        }
    }
}

