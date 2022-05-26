using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using StudyWithGroup.Business.Helpers;
using StudyWithGroup.Core.DTOs;
using StudyWithGroup.Core.Entities;
using StudyWithGroup.Core.Interfaces.Services;
using StudyWithGroup.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StudyWithGroup.Business.Services
{
    public class GroupService: IGroupService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly AppSettings _appSettings;

        public GroupService(
            ApplicationDbContext dbContext,
            IOptions<AppSettings> appSettings)
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
        }

        public ResultModel<object> GetGroups(Guid userId)
        {
            var user = _dbContext.Users.SingleOrDefault(user => user.Id == userId && user.IsActive);

            if (user is null)
                return new ResultModel<object>(data: "User does not exist!", type: ResultModel<object>.ResultType.FAIL);

            var groups = _dbContext.Groups
                .Include(i => i.Users)
                .Where(u => u.Users.Contains(user))
                .OrderByDescending(item => item.Created)
                .Select(s => new { s.Id, s.Name, })
                .ToList();

            return new ResultModel<object>(data: groups);
        }

        public ResultModel<object> GetAllGroups(Guid userId)
        {
            var user = _dbContext.Users.SingleOrDefault(user => user.Id == userId && user.IsActive);

            if (user is null)
                return new ResultModel<object>(data: "User does not exist!", type: ResultModel<object>.ResultType.FAIL);

            var groups = _dbContext.Groups
                .Include(i => i.Users)
                .Where(i => !i.Users.Contains(user))
                .OrderByDescending(item => item.Created)
                .Select(s => new { s.Id, s.Name, })
                .ToList();

            return new ResultModel<object>(data: groups);
        }

        public ResultModel<object> GetDetails(Guid userId, Guid groupId)
        {
            var user = _dbContext.Users.SingleOrDefault(user => user.Id == userId && user.IsActive);

            if (user is null)
                return new ResultModel<object>(data: "User does not exist!", type: ResultModel<object>.ResultType.FAIL);

            var groupDetails = _dbContext.Groups
                .Include(i => i.Users)
                .Include(i => i.Messages)
                .Where(i => i.Id == groupId)
                .OrderByDescending(item => item.Created)
                .Select(s => new { s.Id, s.Name, s.Users, s.Messages })
                .ToList();

            return new ResultModel<object>(data: groupDetails);
        }

        public ResultModel<object> Join(Guid userId, Guid groupId)
        {
            var user = _dbContext.Users.SingleOrDefault(user => user.Id == userId && user.IsActive);

            if (user is null)
                return new ResultModel<object>(data: "User does not exist!", type: ResultModel<object>.ResultType.FAIL);

            var group = _dbContext.Groups.Find(groupId);

            if (group is null)
                return new ResultModel<object>(data: "Group does not exist!", type: ResultModel<object>.ResultType.FAIL);

            group.Users.Add(user);

            int result = _dbContext.SaveChanges();

            if (result < 0)
                return new ResultModel<object>(data: "An unexpected error has occurred.", type: ResultModel<object>.ResultType.FAIL);

            return new ResultModel<object>(); // return success
        }
    }
}
