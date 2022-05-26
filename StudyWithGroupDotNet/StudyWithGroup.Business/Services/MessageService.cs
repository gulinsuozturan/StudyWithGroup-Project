using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using StudyWithGroup.Business.Helpers;
using StudyWithGroup.Core.DTOs;
using StudyWithGroup.Core.DTOs.MessageDTOs.Send;
using StudyWithGroup.Core.Entities;
using StudyWithGroup.Core.Interfaces.Services;
using StudyWithGroup.Infrastructure;
using System;
using System.Linq;

namespace StudyWithGroup.Business.Services
{
    public class MessageService : IMessageService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly AppSettings _appSettings;

        public MessageService(
            ApplicationDbContext dbContext,
            IOptions<AppSettings> appSettings)
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
        }

        public ResultModel<object> SendMessage(SendMessageRequest request)
        {
            var user = _dbContext.Users.SingleOrDefault(user => user.Id == request.UserID && user.IsActive);

            if (user is null)
                return new ResultModel<object>(data: "User does not exist!", type: ResultModel<object>.ResultType.FAIL);

            MessageEntity messageEntity = new MessageEntity
            {
                UserID = (Guid)request.UserID,
                Content = request.Content,
                GroupID = request.GroupID
            };

            _dbContext.Messages.Add(messageEntity);
            int result = _dbContext.SaveChanges();

            if (result < 0)
                return new ResultModel<object>(data: "An unexpected error has occurred.", type: ResultModel<object>.ResultType.FAIL);

            return new ResultModel<object>(); // return success
        }

        public ResultModel<object> GetMessages(Guid userId, Guid groupId)
        {
            var user = _dbContext.Users.SingleOrDefault(user => user.Id == userId && user.IsActive);

            if (user is null)
                return new ResultModel<object>(data: "User does not exist!", type: ResultModel<object>.ResultType.FAIL);

            var messages = _dbContext.Messages
                .Include(i => i.User)
                .Where(i => i.GroupID == groupId)
                .OrderBy(item => item.Created)
                .Select(s => new { s.Id, s.Content, s.User})
                .ToList();

            return new ResultModel<object>(data: messages);
        }
    }
}
