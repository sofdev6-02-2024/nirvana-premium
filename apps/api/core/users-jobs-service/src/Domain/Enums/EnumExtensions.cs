namespace Domain.Enums;

public static class EnumExtensions
{
    public static bool IsEqual(this DeveloperModality userModality, JobModality jobModality)
    {
        return userModality switch
        {
            DeveloperModality.Remote => jobModality == JobModality.Remote,
            DeveloperModality.OnSite => jobModality == JobModality.OnSite,
            DeveloperModality.Hybrid => jobModality is JobModality.Remote or JobModality.OnSite,
            _ => false,
        };
    }
}
