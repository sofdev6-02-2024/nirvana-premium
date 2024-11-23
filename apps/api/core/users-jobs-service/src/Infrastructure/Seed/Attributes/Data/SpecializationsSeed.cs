namespace Infrastructure.Seed.Attributes.Data;

using Domain.Attributes.Specializations;
using Ids;
using SkInfrastructure.Seed;

internal sealed class SpecializationsSeed : BaseSeedEntity<Specialization>
{
    protected override IEnumerable<Specialization> GetData()
    {
        return
        [
            new Specialization
            {
                Id = SpecializationsId.SoftwareEngineer,
                Name = "Software Engineering",
            },
            new Specialization { Id = SpecializationsId.DataScience, Name = "Data Science" },
            new Specialization { Id = SpecializationsId.Marketing, Name = "Marketing" },
            new Specialization { Id = SpecializationsId.Design, Name = "Design" },
            new Specialization
            {
                Id = SpecializationsId.ProjectManagement,
                Name = "Project Management",
            },
            new Specialization { Id = SpecializationsId.Cybersecurity, Name = "Cybersecurity" },
            new Specialization { Id = SpecializationsId.CloudComputing, Name = "Cloud Computing" },
            new Specialization { Id = SpecializationsId.DevOps, Name = "DevOps" },
            new Specialization
            {
                Id = SpecializationsId.BusinessAnalysis,
                Name = "Business Analysis",
            },
            new Specialization
            {
                Id = SpecializationsId.ContentCreation,
                Name = "Content Creation",
            },
        ];
    }
}
