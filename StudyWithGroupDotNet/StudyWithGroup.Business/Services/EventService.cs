using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using StudyWithGroup.Business.Helpers;
using StudyWithGroup.Core.DTOs;
using StudyWithGroup.Core.DTOs.EventDTOs.Create;
using StudyWithGroup.Core.DTOs.EventDTOs.Get;
using StudyWithGroup.Core.Entities;
using StudyWithGroup.Core.Interfaces.Services;
using StudyWithGroup.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StudyWithGroup.Business.Services
{
    public class EventService : IEventService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly AppSettings _appSettings;

        public EventService(
            ApplicationDbContext dbContext,
            IOptions<AppSettings> appSettings)
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
        }
        
        public ResultModel<object> Create(CreateRequest request)
        {
            var user = _dbContext.Users.SingleOrDefault(user => user.Id == request.UserID && user.IsActive);

            if (user is null)
                return new ResultModel<object>(data: "User does not exist!", type: ResultModel<object>.ResultType.FAIL);

            EventEntity eventEntity = new EventEntity
            {
                Creator = request.UserID.ToString(),
                StartDate = request.StartDate,
                AlarmDate = request.AlarmDate,
                Description = request.Description,
                Title = request.Title,
                IsOn = request.IsOn,
                Color = request.Color
            };

            //_dbContext.Events.Add(eventEntity);
            //_dbContext.SaveChanges();

            GroupEntity groupEntity = new GroupEntity
            {
                Name = request.Title,
                Event = eventEntity,
                Users = new List<UserEntity> { user }
            };

            
            _dbContext.Groups.Add(groupEntity);
            eventEntity.GroupId = groupEntity.Id;
            _dbContext.Events.Add(eventEntity);
            int result = _dbContext.SaveChanges();

            if (result < 0)
                return new ResultModel<object>(data: "An unexpected error has occurred.", type: ResultModel<object>.ResultType.FAIL);

            return new ResultModel<object>(); // return success
        }

        public ResultModel<object> Get(Guid userId, DateTime date)
        {
            var user = _dbContext.Users.SingleOrDefault(user => user.Id == userId && user.IsActive);

            if (user is null)
                return new ResultModel<object>(data: "User does not exist!", type: ResultModel<object>.ResultType.FAIL);

            var events = _dbContext.Groups
                .Include(i => i.Event)
                .Where(i => i.Event.StartDate.Date == date.Date && i.Users.Contains(user))
                .OrderByDescending(item => item.Created)
                .Select(s => new { s.Id, s.Name, s.Event })
                .ToList();

            return new ResultModel<object>(data:events);
        }
       
    }
}
