namespace Application.Contracts;

using MediatR;
using SharedKernel.Results;

public interface IQueryHandler<in TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : IQuery<TResponse>;
