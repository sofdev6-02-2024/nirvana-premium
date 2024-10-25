using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Migrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "public");

            migrationBuilder.CreateTable(
                name: "languages",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_languages", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "skills",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_skills", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "specializations",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_specializations", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    do_onboarding = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    identity_id = table.Column<Guid>(type: "uuid", nullable: false),
                    role = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "developers",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    last_name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    years_of_experience = table.Column<double>(type: "double precision", nullable: false),
                    salary_per_hour_expected = table.Column<double>(type: "double precision", nullable: false),
                    modality_preferred = table.Column<string>(type: "text", nullable: false),
                    profile_picture_url = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    specialization_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_developers", x => x.id);
                    table.ForeignKey(
                        name: "fk_developers_specializations_specialization_id",
                        column: x => x.specialization_id,
                        principalSchema: "public",
                        principalTable: "specializations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_developers_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "recruiter",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    is_verified = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    location = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    profile_picture_url = table.Column<string>(type: "text", nullable: true),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_recruiter", x => x.id);
                    table.ForeignKey(
                        name: "fk_recruiter_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "developer_languages",
                schema: "public",
                columns: table => new
                {
                    developers_id = table.Column<Guid>(type: "uuid", nullable: false),
                    languages_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_developer_languages", x => new { x.developers_id, x.languages_id });
                    table.ForeignKey(
                        name: "fk_developer_languages_developers_developers_id",
                        column: x => x.developers_id,
                        principalSchema: "public",
                        principalTable: "developers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_developer_languages_languages_languages_id",
                        column: x => x.languages_id,
                        principalSchema: "public",
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "developer_skills",
                schema: "public",
                columns: table => new
                {
                    developers_id = table.Column<Guid>(type: "uuid", nullable: false),
                    skills_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_developer_skills", x => new { x.developers_id, x.skills_id });
                    table.ForeignKey(
                        name: "fk_developer_skills_developers_developers_id",
                        column: x => x.developers_id,
                        principalSchema: "public",
                        principalTable: "developers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_developer_skills_skills_skills_id",
                        column: x => x.skills_id,
                        principalSchema: "public",
                        principalTable: "skills",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "jobs",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    salary_per_hour = table.Column<double>(type: "double precision", nullable: false),
                    due_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    modality = table.Column<string>(type: "text", nullable: false),
                    schedule = table.Column<string>(type: "text", nullable: false),
                    status = table.Column<string>(type: "text", nullable: false),
                    location = table.Column<string>(type: "text", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    recruiter_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_jobs", x => x.id);
                    table.ForeignKey(
                        name: "fk_jobs_recruiter_recruiter_id",
                        column: x => x.recruiter_id,
                        principalSchema: "public",
                        principalTable: "recruiter",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "job_languages",
                schema: "public",
                columns: table => new
                {
                    jobs_id = table.Column<Guid>(type: "uuid", nullable: false),
                    languages_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_job_languages", x => new { x.jobs_id, x.languages_id });
                    table.ForeignKey(
                        name: "fk_job_languages_jobs_jobs_id",
                        column: x => x.jobs_id,
                        principalSchema: "public",
                        principalTable: "jobs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_job_languages_languages_languages_id",
                        column: x => x.languages_id,
                        principalSchema: "public",
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "job_skills",
                schema: "public",
                columns: table => new
                {
                    jobs_id = table.Column<Guid>(type: "uuid", nullable: false),
                    skills_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_job_skills", x => new { x.jobs_id, x.skills_id });
                    table.ForeignKey(
                        name: "fk_job_skills_jobs_jobs_id",
                        column: x => x.jobs_id,
                        principalSchema: "public",
                        principalTable: "jobs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_job_skills_skills_skills_id",
                        column: x => x.skills_id,
                        principalSchema: "public",
                        principalTable: "skills",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_developer_languages_languages_id",
                schema: "public",
                table: "developer_languages",
                column: "languages_id");

            migrationBuilder.CreateIndex(
                name: "ix_developer_skills_skills_id",
                schema: "public",
                table: "developer_skills",
                column: "skills_id");

            migrationBuilder.CreateIndex(
                name: "ix_developers_specialization_id",
                schema: "public",
                table: "developers",
                column: "specialization_id");

            migrationBuilder.CreateIndex(
                name: "ix_developers_user_id",
                schema: "public",
                table: "developers",
                column: "user_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_job_languages_languages_id",
                schema: "public",
                table: "job_languages",
                column: "languages_id");

            migrationBuilder.CreateIndex(
                name: "ix_job_skills_skills_id",
                schema: "public",
                table: "job_skills",
                column: "skills_id");

            migrationBuilder.CreateIndex(
                name: "ix_jobs_recruiter_id",
                schema: "public",
                table: "jobs",
                column: "recruiter_id");

            migrationBuilder.CreateIndex(
                name: "ix_recruiter_user_id",
                schema: "public",
                table: "recruiter",
                column: "user_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_email",
                schema: "public",
                table: "users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_identity_id",
                schema: "public",
                table: "users",
                column: "identity_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "developer_languages",
                schema: "public");

            migrationBuilder.DropTable(
                name: "developer_skills",
                schema: "public");

            migrationBuilder.DropTable(
                name: "job_languages",
                schema: "public");

            migrationBuilder.DropTable(
                name: "job_skills",
                schema: "public");

            migrationBuilder.DropTable(
                name: "developers",
                schema: "public");

            migrationBuilder.DropTable(
                name: "languages",
                schema: "public");

            migrationBuilder.DropTable(
                name: "jobs",
                schema: "public");

            migrationBuilder.DropTable(
                name: "skills",
                schema: "public");

            migrationBuilder.DropTable(
                name: "specializations",
                schema: "public");

            migrationBuilder.DropTable(
                name: "recruiter",
                schema: "public");

            migrationBuilder.DropTable(
                name: "users",
                schema: "public");
        }
    }
}
