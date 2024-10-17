namespace SkInfrastructure.Authentication;

using FirebaseAdmin.Auth;
using SkApplication.Authentication;
using SkDomain.Errors;
using SkDomain.Results;

public sealed class AuthenticationService : IAuthenticationService
{
    public async Task<Result<string>> RegisterAsync(string email, string password)
    {
        UserRecordArgs userRecordArgs = new() { Email = email, Password = password };

        try
        {
            UserRecord userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(
                userRecordArgs
            );

            return Result.Success(userRecord.Uid);
        }
        catch (FirebaseAuthException e)
        {
            return Result.Failure<string>(Error.Failure(e.ErrorCode.ToString(), e.Message));
        }
    }
}
