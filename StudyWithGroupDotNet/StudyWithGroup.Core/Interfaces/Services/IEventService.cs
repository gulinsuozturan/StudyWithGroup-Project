using StudyWithGroup.Core.DTOs;
using StudyWithGroup.Core.DTOs.EventDTOs.Create;
using StudyWithGroup.Core.DTOs.EventDTOs.Get;
using System;

namespace StudyWithGroup.Core.Interfaces.Services
{
    public interface IEventService
    {
        public ResultModel<object> Create(CreateRequest request);
        public ResultModel<object> Get(Guid request, DateTime date);

    }
}
