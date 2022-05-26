using StudyWithGroup.Core.DTOs;
using System;

namespace StudyWithGroup.Core.Interfaces.Services
{
    public interface IGroupService
    {
        public ResultModel<object> GetGroups(Guid userId);
        public ResultModel<object> GetAllGroups(Guid userId);
        public ResultModel<object> GetDetails(Guid userId, Guid groupId);
        public ResultModel<object> Join(Guid userId, Guid groupId);
    }
}
