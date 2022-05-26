using StudyWithGroup.Core.DTOs;
using StudyWithGroup.Core.DTOs.MessageDTOs.Send;
using System;

namespace StudyWithGroup.Core.Interfaces.Services
{
    public interface IMessageService
    {
        public ResultModel<object> SendMessage(SendMessageRequest request);
        public ResultModel<object> GetMessages(Guid userId, Guid groupId);
    }
}
