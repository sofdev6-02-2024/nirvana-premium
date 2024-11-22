namespace Infrastructure.Seed.Attributes;

using Domain.Attributes.Specializations;
using SkInfrastructure.Seed;

internal sealed class SpecializationsSeed : BaseSeedEntity<Specialization>
{
    protected override IEnumerable<Specialization> GetData()
    {
        return
        [
            new Specialization
            {
                Id = Guid.Parse("1069c934-28f4-44c1-9195-6c75acce64f3"),
                Name = "Software Engineering",
            },
            new Specialization
            {
                Id = Guid.Parse("9bbddc30-f2e1-4af1-b711-d4f3717b9cfc"),
                Name = "Data Science",
            },
            new Specialization
            {
                Id = Guid.Parse("ac1d8e38-66c5-4879-862a-57f8a7d23496"),
                Name = "Marketing",
            },
            new Specialization
            {
                Id = Guid.Parse("978db297-3bd1-4559-bd04-758c554089f5"),
                Name = "Design",
            },
            new Specialization
            {
                Id = Guid.Parse("aab6d12f-c562-4c28-9fad-8985520ab90c"),
                Name = "Project Management",
            },
            new Specialization
            {
                Id = Guid.Parse("7d3228ee-0050-4fe9-89d4-554f7a4e4f65"),
                Name = "Cybersecurity",
            },
            new Specialization
            {
                Id = Guid.Parse("c0366c99-cfa1-4ead-890d-cad31902c976"),
                Name = "Cloud Computing",
            },
            new Specialization
            {
                Id = Guid.Parse("1d10f1cc-069a-4702-9c17-efb3cc64fac4"),
                Name = "DevOps",
            },
            new Specialization
            {
                Id = Guid.Parse("7705164b-4749-4e27-ab21-85cd69f40925"),
                Name = "Business Analysis",
            },
            new Specialization
            {
                Id = Guid.Parse("17631e14-57c7-41e9-8c1f-7631b424a3a8"),
                Name = "Content Creation",
            },
        ];
    }
}
