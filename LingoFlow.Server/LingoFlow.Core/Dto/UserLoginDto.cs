﻿using LingoFlow.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LingoFlow.Core.Dto
{
    public class UserLoginDto
    {
        //public int Id { get; set; } 
        public string Email { get; set; }
        public string Password { get; set; }
        //public DateTime CreatedAt { get; set; }
        //public List<Conversation> Conversations { get; set; } = new();
    }
}
