namespace Infrastructure.Seed;

using Domain.Attributes.Skills;
using SkInfrastructure.Seed;

internal sealed class SkillsSeed
    : BaseSeedEntity<Skill>
{
    protected override IEnumerable<Skill> GetData()
    {
        return
        [
            new Skill
            {
                Name = "C#",
            }
        ];
    }
}
