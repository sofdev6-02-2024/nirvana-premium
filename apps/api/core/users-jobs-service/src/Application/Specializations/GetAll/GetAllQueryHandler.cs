namespace Application.Specializations.GetAll;

using Application.Persistent;
using Domain.Attributes.Specializations;
using Microsoft.EntityFrameworkCore;
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

        if (!await specializations.AnyAsync(cancellationToken))
        {
            return Result.Failure<Response>(SpecializationErrors.NotSpecializationsFound);
        }

        List<Specialization> specializationsList =
            await specializations.ToListAsync(cancellationToken);

        Response response = converter.Convert(specializationsList);
        return Result.Success(response);
    }
}
