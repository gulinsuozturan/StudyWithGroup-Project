using System;
using System.ComponentModel.DataAnnotations;

namespace StudyWithGroup.Core.DTOs.EventDTOs.Create
{
    public class CreateRequest
    {
        public Guid UserID { get; set; }
        
        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime AlarmDate { get; set; }
        
        [Required]
        public bool IsOn { get; set; }

        [Required]
        public string Color { get; set; }
        
        [Required]
        public string Description { get; set; }

        [Required]
        public string Title { get; set; }
    }
}
