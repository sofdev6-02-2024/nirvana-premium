namespace Infrastructure.Seed.Attributes;

using Domain.Attributes.Skills;
using SkInfrastructure.Seed;

internal sealed class SkillsSeed : BaseSeedEntity<Skill>
{
    protected override IEnumerable<Skill> GetData()
    {
        return
        [
            new Skill { Id = Guid.Parse("cd0ca3f7-b03c-474b-b1ff-5bc3d32ba811"), Name = "C#" },
            new Skill
            {
                Id = Guid.Parse("6243d90f-2a61-4e23-b663-8112a62534a6"),
                Name = "JavaScript",
            },
            new Skill
            {
                Id = Guid.Parse("67f4c73f-ceaf-469c-8ee4-3d07226ed1d0"),
                Name = "TypeScript",
            },
            new Skill { Id = Guid.Parse("efe3c053-8251-4a5f-9582-4e9a55bd29d1"), Name = "Python" },
            new Skill { Id = Guid.Parse("7ac5720c-141a-4f65-b8db-bee28f9491a5"), Name = "Java" },
            new Skill { Id = Guid.Parse("909825f1-7beb-4584-b891-94c689fd551e"), Name = "SQL" },
            new Skill { Id = Guid.Parse("b2090ff4-6e37-47c4-8c95-74a4083488be"), Name = "HTML" },
            new Skill { Id = Guid.Parse("f843250b-7f3b-4962-affd-da23454d2372"), Name = "CSS" },
        ];
    }
}
