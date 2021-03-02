using System;
using System.Text;

namespace New_Jazz.Services
{
    public static class Encryption
    {
        public static string key = "encryptionkey";

        public static string Encrypt(string password)
        {
            password += key;
            byte[] encPassword = Encoding.UTF8.GetBytes(password);
            return Convert.ToBase64String(encPassword);
        }

        public static string Decrypt(string password)
        {
            var strPassword = Convert.FromBase64String(password);
            string decodedString = Encoding.UTF8.GetString(strPassword);
            var result = decodedString.Substring(0, decodedString.Length - key.Length);
            return result;
        }
    }
}