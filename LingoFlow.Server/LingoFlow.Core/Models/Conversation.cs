using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LingoFlow.Core.Models
{
    public class Conversation
    {
        public int Id { get; set; }

        // מזהה המשתמש שהתחיל את השיחה
        public int UserId { get; set; }
        public User User { get; set; }

        // מזהה הנושא של השיחה
        public int TopicId { get; set; }
        public Topic Topic { get; set; }

        // זמן התחלת ההקלטה
        public DateTime StartTime { get; set; }

        // סטטוס השיחה (Recording, Completed וכו')
        public string Status { get; set; }

        // זמן סיום ההקלטה (אופציונלי, לשימוש עתידי)
        public DateTime? EndTime { get; set; }

        // משוב לשיחה
        public Feedback Feedback { get; set; }
    }
}
