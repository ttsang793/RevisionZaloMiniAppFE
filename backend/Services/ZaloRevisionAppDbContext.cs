using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using backend.Models;

namespace backend.Services;

public partial class ZaloRevisionAppDbContext : DbContext
{
    public ZaloRevisionAppDbContext()
    {
    }

    public ZaloRevisionAppDbContext(DbContextOptions<ZaloRevisionAppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Subject> Subjects { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("subjects");

            entity.HasIndex(e => e.Name, "name").IsUnique();

            entity.Property(e => e.Id)
                .HasMaxLength(4)
                .HasColumnName("id");
            entity.Property(e => e.Classes)
                .HasColumnType("json")
                .HasConversion(
                      v => JsonSerializer.Serialize(v, new JsonSerializerOptions()),
                      v => JsonSerializer.Deserialize<List<int>>(v!, new JsonSerializerOptions())
                  )
                .HasColumnName("classes");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.IsVisible)
                .HasColumnType("boolean")
                .HasDefaultValue("true")
                .HasColumnName("isVisible");
            entity.Property(e => e.QuestionTN)
                .HasColumnType("boolean")
                .HasColumnName("questionTN");
            entity.Property(e => e.QuestionDS)
                .HasColumnType("boolean")
                .HasColumnName("questionDS");
            entity.Property(e => e.QuestionTLN)
                .HasColumnType("boolean")
                .HasColumnName("questionTLN");
            entity.Property(e => e.QuestionDVCT)
                .HasColumnType("boolean")
                .HasColumnName("questionDVCT");
            entity.Property(e => e.QuestionTL)
                .HasColumnType("boolean")
                .HasColumnName("questionTL");
            entity.Property(e => e.QuestionSX)
                .HasColumnType("boolean")
                .HasColumnName("questionSX");
            entity.Property(e => e.UpdateAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("update_at");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
