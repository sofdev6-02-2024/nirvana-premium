FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

USER app
WORKDIR /app
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release

WORKDIR /src

COPY ["core/users-jobs-service/Directory.Build.props", "core/users-jobs-service/."]
COPY ["core/users-jobs-service/src/Domain/Domain.csproj", "core/users-jobs-service/src/Domain/"]
COPY ["core/users-jobs-service/src/Application/Application.csproj", "core/users-jobs-service/src/Application/"]
COPY ["core/users-jobs-service/src/Infrastructure/Infrastructure.csproj", "core/users-jobs-service/src/Infrastructure/"]
COPY ["core/users-jobs-service/src/Users.Jobs.Service.Api/Users.Jobs.Service.Api.csproj", "core/users-jobs-service/src/Users.Jobs.Service.Api/"]

COPY ["libs/SharedKernel/Directory.Build.props", "libs/SharedKernel/."]
COPY ["libs/SharedKernel/src/SkDomain/SkDomain.csproj", "libs/SharedKernel/src/SkDomain/"]
COPY ["libs/SharedKernel/src/SkApplication/SkApplication.csproj", "libs/SharedKernel/src/SkApplication/"]
COPY ["libs/SharedKernel/src/SkInfrastructure/SkInfrastructure.csproj", "libs/SharedKernel/src/SkInfrastructure/"]
COPY ["libs/SharedKernel/src/SkWeb.Api/SkWeb.Api.csproj", "libs/SharedKernel/src/SkWeb.Api/"]

RUN dotnet restore "./core/users-jobs-service/src/Users.Jobs.Service.Api/Users.Jobs.Service.Api.csproj"
COPY . .

WORKDIR "/src/core/users-jobs-service/src/Users.Jobs.Service.Api"
RUN dotnet build "./Users.Jobs.Service.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Users.Jobs.Service.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "Users.Jobs.Service.Api.dll"]
