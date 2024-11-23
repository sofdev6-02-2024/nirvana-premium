namespace Infrastructure.Seed.Attributes.Data;

using Domain.Attributes.Skills;
using Ids;
using SkInfrastructure.Seed;

internal sealed class SkillsSeed : BaseSeedEntity<Skill>
{
    protected override IEnumerable<Skill> GetData()
    {
        return
        [
            new Skill { Id = SkillsId.CSharp, Name = "C#" },
            new Skill { Id = SkillsId.JavaScript, Name = "JavaScript" },
            new Skill { Id = SkillsId.TypeScript, Name = "TypeScript" },
            new Skill { Id = SkillsId.Python, Name = "Python" },
            new Skill { Id = SkillsId.Java, Name = "Java" },
            new Skill { Id = SkillsId.Sql, Name = "Sql" },
            new Skill { Id = SkillsId.Html, Name = "Html" },
            new Skill { Id = SkillsId.Css, Name = "Css" },
        ];
    }
}
