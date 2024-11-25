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
                name: "landing_infos",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    banner_title = table.Column<string>(type: "text", nullable: false),
                    banner_description = table.Column<string>(type: "text", nullable: false),
                    banner_logo_url = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    info_title = table.Column<string>(type: "text", nullable: false),
                    info_description = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_landing_infos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "languages",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
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
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
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
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
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
                    identity_id = table.Column<string>(type: "text", nullable: false),
                    role = table.Column<int>(type: "integer", nullable: false),
                    do_onboarding = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
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
                    modality_preferred = table.Column<int>(type: "integer", nullable: false),
                    location = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    portfolio_url = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    profile_picture_url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    specialization_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
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
                name: "recruiters",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    location = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    profile_picture_url = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    is_verified = table.Column<bool>(type: "boolean", nullable: true, defaultValue: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_recruiters", x => x.id);
                    table.ForeignKey(
                        name: "fk_recruiters_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_follows",
                schema: "public",
                columns: table => new
                {
                    user_followed_id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_follower_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_follows", x => new { x.user_followed_id, x.user_follower_id });
                    table.ForeignKey(
                        name: "fk_user_follows_users_user_followed_id",
                        column: x => x.user_followed_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_user_follows_users_user_follower_id",
                        column: x => x.user_follower_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_reviews",
                schema: "public",
                columns: table => new
                {
                    user_reviewed_id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_reviewer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    rating = table.Column<int>(type: "integer", nullable: false),
                    comment = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_reviews", x => new { x.user_reviewed_id, x.user_reviewer_id });
                    table.ForeignKey(
                        name: "fk_user_reviews_users_user_reviewed_id",
                        column: x => x.user_reviewed_id,
                        principalSchema: "public",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_user_reviews_users_user_reviewer_id",
                        column: x => x.user_reviewer_id,
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
                    developer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    language_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_developer_languages", x => new { x.developer_id, x.language_id });
                    table.ForeignKey(
                        name: "fk_developer_languages_developers_developer_id",
                        column: x => x.developer_id,
                        principalSchema: "public",
                        principalTable: "developers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_developer_languages_languages_language_id",
                        column: x => x.language_id,
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
                    developer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    skill_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_developer_skills", x => new { x.developer_id, x.skill_id });
                    table.ForeignKey(
                        name: "fk_developer_skills_developers_developer_id",
                        column: x => x.developer_id,
                        principalSchema: "public",
                        principalTable: "developers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_developer_skills_skills_skill_id",
                        column: x => x.skill_id,
                        principalSchema: "public",
                        principalTable: "skills",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "educations",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    degree = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    institution = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    start_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    end_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    developer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_educations", x => x.id);
                    table.ForeignKey(
                        name: "fk_educations_developers_developer_id",
                        column: x => x.developer_id,
                        principalSchema: "public",
                        principalTable: "developers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "experiences",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    employer = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    start_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    end_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    developer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_experiences", x => x.id);
                    table.ForeignKey(
                        name: "fk_experiences_developers_developer_id",
                        column: x => x.developer_id,
                        principalSchema: "public",
                        principalTable: "developers",
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
                    salary_per_hour = table.Column<double>(type: "double precision", nullable: false),
                    schedule = table.Column<int>(type: "integer", nullable: false),
                    modality = table.Column<int>(type: "integer", nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false),
                    description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    location = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    recruiter_id = table.Column<Guid>(type: "uuid", nullable: false),
                    specialization_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_jobs", x => x.id);
                    table.ForeignKey(
                        name: "fk_jobs_recruiters_recruiter_id",
                        column: x => x.recruiter_id,
                        principalSchema: "public",
                        principalTable: "recruiters",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_jobs_specializations_specialization_id",
                        column: x => x.specialization_id,
                        principalSchema: "public",
                        principalTable: "specializations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "job_attachments",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    url = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    job_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_job_attachments", x => x.id);
                    table.ForeignKey(
                        name: "fk_job_attachments_jobs_job_id",
                        column: x => x.job_id,
                        principalSchema: "public",
                        principalTable: "jobs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "job_developers",
                schema: "public",
                columns: table => new
                {
                    job_id = table.Column<Guid>(type: "uuid", nullable: false),
                    developer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_job_developers", x => new { x.developer_id, x.job_id });
                    table.ForeignKey(
                        name: "fk_job_developers_developers_developer_id",
                        column: x => x.developer_id,
                        principalSchema: "public",
                        principalTable: "developers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_job_developers_jobs_job_id",
                        column: x => x.job_id,
                        principalSchema: "public",
                        principalTable: "jobs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "job_languages",
                schema: "public",
                columns: table => new
                {
                    job_id = table.Column<Guid>(type: "uuid", nullable: false),
                    language_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_job_languages", x => new { x.job_id, x.language_id });
                    table.ForeignKey(
                        name: "fk_job_languages_jobs_job_id",
                        column: x => x.job_id,
                        principalSchema: "public",
                        principalTable: "jobs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_job_languages_languages_language_id",
                        column: x => x.language_id,
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
                    job_id = table.Column<Guid>(type: "uuid", nullable: false),
                    skill_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_job_skills", x => new { x.job_id, x.skill_id });
                    table.ForeignKey(
                        name: "fk_job_skills_jobs_job_id",
                        column: x => x.job_id,
                        principalSchema: "public",
                        principalTable: "jobs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_job_skills_skills_skill_id",
                        column: x => x.skill_id,
                        principalSchema: "public",
                        principalTable: "skills",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_developer_languages_language_id",
                schema: "public",
                table: "developer_languages",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "ix_developer_skills_skill_id",
                schema: "public",
                table: "developer_skills",
                column: "skill_id");

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
                name: "ix_educations_developer_id",
                schema: "public",
                table: "educations",
                column: "developer_id");

            migrationBuilder.CreateIndex(
                name: "ix_experiences_developer_id",
                schema: "public",
                table: "experiences",
                column: "developer_id");

            migrationBuilder.CreateIndex(
                name: "ix_job_attachments_job_id",
                schema: "public",
                table: "job_attachments",
                column: "job_id");

            migrationBuilder.CreateIndex(
                name: "ix_job_developers_job_id",
                schema: "public",
                table: "job_developers",
                column: "job_id");

            migrationBuilder.CreateIndex(
                name: "ix_job_languages_language_id",
                schema: "public",
                table: "job_languages",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "ix_job_skills_skill_id",
                schema: "public",
                table: "job_skills",
                column: "skill_id");

            migrationBuilder.CreateIndex(
                name: "ix_jobs_recruiter_id",
                schema: "public",
                table: "jobs",
                column: "recruiter_id");

            migrationBuilder.CreateIndex(
                name: "ix_jobs_specialization_id",
                schema: "public",
                table: "jobs",
                column: "specialization_id");

            migrationBuilder.CreateIndex(
                name: "ix_languages_name",
                schema: "public",
                table: "languages",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_recruiters_name",
                schema: "public",
                table: "recruiters",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_recruiters_user_id",
                schema: "public",
                table: "recruiters",
                column: "user_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_skills_name",
                schema: "public",
                table: "skills",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_specializations_name",
                schema: "public",
                table: "specializations",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_user_follows_user_follower_id",
                schema: "public",
                table: "user_follows",
                column: "user_follower_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_reviews_user_reviewer_id",
                schema: "public",
                table: "user_reviews",
                column: "user_reviewer_id");

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
                name: "educations",
                schema: "public");

            migrationBuilder.DropTable(
                name: "experiences",
                schema: "public");

            migrationBuilder.DropTable(
                name: "job_attachments",
                schema: "public");

            migrationBuilder.DropTable(
                name: "job_developers",
                schema: "public");

            migrationBuilder.DropTable(
                name: "job_languages",
                schema: "public");

            migrationBuilder.DropTable(
                name: "job_skills",
                schema: "public");

            migrationBuilder.DropTable(
                name: "landing_infos",
                schema: "public");

            migrationBuilder.DropTable(
                name: "user_follows",
                schema: "public");

            migrationBuilder.DropTable(
                name: "user_reviews",
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
                name: "recruiters",
                schema: "public");

            migrationBuilder.DropTable(
                name: "specializations",
                schema: "public");

            migrationBuilder.DropTable(
                name: "users",
                schema: "public");
        }
    }
}
