FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

USER app
WORKDIR /app
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release

WORKDIR /src

COPY ["core/iam-service/Directory.Build.props", "core/iam-service/."]
COPY ["core/iam-service/src/Domain/Domain.csproj", "core/iam-service/src/Domain/"]
COPY ["core/iam-service/src/Application/Application.csproj", "core/iam-service/src/Application/"]
COPY ["core/iam-service/src/Infrastructure/Infrastructure.csproj", "core/iam-service/src/Infrastructure/"]
COPY ["core/iam-service/src/Iam.Service.Api/Iam.Service.Api.csproj", "core/iam-service/src/Iam.Service.Api/"]

COPY ["libs/SharedKernel/Directory.Build.props", "libs/SharedKernel/."]
COPY ["libs/SharedKernel/src/SkDomain/SkDomain.csproj", "libs/SharedKernel/src/SkDomain/"]
COPY ["libs/SharedKernel/src/SkApplication/SkApplication.csproj", "libs/SharedKernel/src/SkApplication/"]
COPY ["libs/SharedKernel/src/SkInfrastructure/SkInfrastructure.csproj", "libs/SharedKernel/src/SkInfrastructure/"]
COPY ["libs/SharedKernel/src/SkWeb.Api/SkWeb.Api.csproj", "libs/SharedKernel/src/SkWeb.Api/"]

RUN dotnet restore "./core/iam-service/src/Iam.Service.Api/Iam.Service.Api.csproj"
COPY . .

WORKDIR "/src/core/iam-service/src/Iam.Service.Api"
RUN dotnet build "./Iam.Service.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Iam.Service.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "Iam.Service.Api.dll"]
