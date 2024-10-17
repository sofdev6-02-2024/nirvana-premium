namespace SkApplication.Contracts;

using MediatR;
using SkDomain.Results;

public interface IQuery<TResponse> : IRequest<Result<TResponse>>;
