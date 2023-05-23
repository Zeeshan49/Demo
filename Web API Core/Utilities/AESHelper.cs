using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;
using System.Security.Cryptography;
using System.Text;
namespace BusinessCore.Services
{
    public interface IAESHelper
    {
        string Decrypt(string value, string aesKey);
    }
    public class AESHelper : IAESHelper
    {
        public AESHelper() { }

        private readonly string ivKey = "@qwertyuiop12344";

        public string Decrypt(string encryptedValue, string aesKey)
        {
            var encrypted = Convert.FromBase64String(encryptedValue);
            return DecryptStringFromBytes(encrypted, Encoding.UTF8.GetBytes(aesKey), Encoding.UTF8.GetBytes(ivKey)).ToString();
        }

        private static string DecryptStringFromBytes(byte[] cipherText, byte[] key, byte[] iv)
        {
            if (cipherText == null || cipherText.Length <= 0)
                throw new ArgumentNullException("Cipher Text");

            if (key == null || key.Length <= 0)
                throw new ArgumentNullException("Key");

            if (iv == null || iv.Length <= 0)
                throw new ArgumentNullException("Iv");

            string plaintext = null;

            using (var rijAlg = new RijndaelManaged())
            {
                rijAlg.Mode = CipherMode.ECB;
                rijAlg.Padding = PaddingMode.ISO10126;
                rijAlg.FeedbackSize = 128;

                rijAlg.Key = key;
                rijAlg.IV = iv;

                var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);

                try
                {
                    using var msDecrypt = new MemoryStream(cipherText);
                    using var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read);
                    using var srDecrypt = new StreamReader(csDecrypt);
                    plaintext = srDecrypt.ReadToEnd();
                }
                catch (Exception)
                {
                    plaintext = "Invalid Key";
                }
            }

            return plaintext;
        }
    }
}

