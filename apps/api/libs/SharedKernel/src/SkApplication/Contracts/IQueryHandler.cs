namespace SkApplication.Contracts;

using MediatR;
using SkDomain.Results;

public interface IQueryHandler<in TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : IQuery<TResponse>;
