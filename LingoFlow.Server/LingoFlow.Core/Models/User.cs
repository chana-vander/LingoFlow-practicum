﻿using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LingoFlow.Core.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // אחסון סיסמאות מוצפן
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public List<Conversation> Conversations { get; set; } = new();

    }
}
