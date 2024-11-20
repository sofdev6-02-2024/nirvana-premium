namespace Application.Specializations;

using Domain.Attributes.Specializations;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetAllQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetAllQuery, Response>
{

    public async Task<Result<Response>> Handle(GetAllQuery query,
        CancellationToken cancellationToken)
    {
        Converter converter = new();

        IQueryable<Specialization> specializations =
            context.Specializations.OrderBy(specialization => specialization.Name);

        List<Specialization> specializationsList =
            await specializations.ToListAsync(cancellationToken);


        if (!await specializations.AnyAsync(cancellationToken))
        {
            return Result.Failure<Response>(SpecializationErrors.NotSpecializationsFound);
        }

        Response response = converter.Convert(specializationsList);
        return Result.Success(response);
    }
}
