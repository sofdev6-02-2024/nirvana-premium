namespace Application.Contracts;

using MediatR;
using SharedKernel.Results;

public interface IQuery<TResponse> : IRequest<Result<TResponse>>;
