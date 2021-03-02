using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using New_Jazz.Data;
using New_Jazz.Models;

namespace New_Jazz.Services
{
    public interface IAuthentication
    {
        User Authenticate(string username, string password);
        (bool success, string message) LookForExistingUser(string username, string email);

    }
    public class Authentication : IAuthentication
    {
        private readonly UsersContext _context;

        public Authentication(UsersContext context)
        {
            _context = context;
        }

        // AUTHENTICATE USER
        public User Authenticate(string username, string password)
        {

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var existingUser = _context.Users
                .Where(u => u.username == username)
                .SingleOrDefault();

            var decodedPassword = Encryption.Decrypt(existingUser.password);

            // check if username exists
            if (existingUser == null)
                return null;

            // check if password is correct
            if (decodedPassword != password)
                return null;

            // authentication successful
            return existingUser;
        }


        // FIND A USER
        public (bool success, string message) LookForExistingUser(string username, string email)
        {
            var user = _context.Users
                    .Where(u => u.username == username | u.email == email)
                    .FirstOrDefault();

            if (username == user?.username)
            {
                return (true, "Username already exists");
            }
            else if (email == user?.email)
            {
                return (true, "Email already exists");
            }

            return (false, "No user found");

        }
    }
}
