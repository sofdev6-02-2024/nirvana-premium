namespace Domain.Attributes.Languages;

using SkDomain.Errors;

public static class LanguageErrors
{
    public static readonly Error NoLanguagesFound = Error.NotFound(
        "Languages.NoLanguagesFound",
        "No languages were found"
    );

    public static Error LanguageNotFound(Guid languageId)
    {
        return Error.NotFound(
            "Languages.LanguageNotFound",
            $"The language with the ID {languageId} was not found"
        );
    }
}
