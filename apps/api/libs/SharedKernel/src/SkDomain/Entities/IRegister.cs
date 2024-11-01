namespace SkDomain.Entities;

public interface IRegister
{
    DateTime CreatedAt { get; }
    DateTime UpdatedAt { get; }

    bool IsActive { get; }
}
