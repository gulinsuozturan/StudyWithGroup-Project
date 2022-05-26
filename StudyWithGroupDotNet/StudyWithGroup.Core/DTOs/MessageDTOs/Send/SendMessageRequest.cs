using System;

namespace StudyWithGroup.Core.DTOs.MessageDTOs.Send
{
    public class SendMessageRequest
    {
        public Guid? UserID { get; set; }
        public string Content { get; set; }
        public Guid GroupID { get; set; }
    }
}
