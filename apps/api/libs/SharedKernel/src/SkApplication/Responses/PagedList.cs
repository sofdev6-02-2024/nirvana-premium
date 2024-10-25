namespace SkApplication.Responses;

using Contracts;
using Microsoft.EntityFrameworkCore;

public static class PagedList
{
    public static async Task<PagedList<TTo>> CreateAsync<TFrom, TTo>(
        IQueryable<TFrom> query,
        IConverter<TFrom, TTo> converter,
        int page,
        int pageSize
    )
    {
        int totalCount = await query.CountAsync();
        IList<TTo> items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(itm => converter.Convert(itm))
            .ToListAsync();

        return new PagedList<TTo>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount,
        };
    }
}

public class PagedList<T>
{
    internal PagedList() { }

    public IList<T> Items { get; init; } = [];

    public int Page { get; init; }

    public int PageSize { get; init; }

    public int TotalCount { get; init; }

    public bool HasNextPage => Page * PageSize < TotalCount;

    public bool HasPreviousPage => Page > 1;
}
