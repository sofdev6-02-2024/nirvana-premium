namespace Application.Specializations.GetAll;

using Persistent;
using Domain.Attributes.Specializations;
using Microsoft.EntityFrameworkCore;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetAllQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetAllQuery, IList<Response>>
{
    public async Task<Result<IList<Response>>> Handle(GetAllQuery query,
        CancellationToken cancellationToken)
    {
        IQueryable<Specialization> specializations =
            context.Specializations;

        if (!await specializations.AnyAsync(cancellationToken))
        {
            return Result.Failure<IList<Response>>(SpecializationErrors.NotSpecializationsFound);
        }

        Converter converter = new();

        IList<Response> response =
            await specializations.Select(s => converter.Convert(s)).ToListAsync(cancellationToken);

        return Result.Success(response);
    }
}
