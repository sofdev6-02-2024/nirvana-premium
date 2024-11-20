namespace Domain.Attributes.Languages;

using SkDomain.Errors;

public static class LanguageErrors
{
    public static readonly Error NoLanguagesFound = Error.NotFound(
        "Languages.NoLanguagesFound",
        "No languages were found"
    );
}
