namespace Infrastructure.Configurations;

#pragma warning disable S1075
public static class Constants
{
    public const string FirebaseApiKey = "FIREBASE_API_KEY";
    public const string FirebaseAuthUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

    public const string Authority = "ISSUER";
    public const string Audience = "AUDIENCE";
    public const string Issuer = "ISSUER";

    public const string ConnectionString = "DefaultConnection";
    public const string FirebaseFilePath = "FilePaths:Firebase";
}
