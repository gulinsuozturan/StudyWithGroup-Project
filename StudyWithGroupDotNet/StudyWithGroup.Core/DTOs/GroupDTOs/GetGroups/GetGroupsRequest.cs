using System;

namespace StudyWithGroup.Core.DTOs.GroupDTOs.GetGroups
{
    public class GetGroupsRequest
    {
        public Guid UserID { get; set; }
        public Guid GroupID { get; set; }
        public string GroupName { get; set; }
    }
}
