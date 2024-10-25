FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

USER app
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release

WORKDIR /src

COPY ["core/api-gateway/Directory.Build.props", "core/api-gateway/."]
COPY ["core/api-gateway/src/Api.Gateway/Api.Gateway.csproj", "core/api-gateway/src/Api.Gateway/"]

COPY ["libs/SharedKernel/Directory.Build.props", "libs/SharedKernel/."]
COPY ["libs/SharedKernel/src/SkDomain/SkDomain.csproj", "libs/SharedKernel/src/SkDomain/"]
COPY ["libs/SharedKernel/src/SkApplication/SkApplication.csproj", "libs/SharedKernel/src/SkApplication/"]
COPY ["libs/SharedKernel/src/SkInfrastructure/SkInfrastructure.csproj", "libs/SharedKernel/src/SkInfrastructure/"]
COPY ["libs/SharedKernel/src/SkWeb.Api/SkWeb.Api.csproj", "libs/SharedKernel/src/SkWeb.Api/"]

RUN dotnet restore "./core/api-gateway/src/Api.Gateway/Api.Gateway.csproj"
COPY . .

WORKDIR "/src/core/api-gateway/src/Api.Gateway"
RUN dotnet build "./Api.Gateway.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Api.Gateway.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "Api.Gateway.dll"]
