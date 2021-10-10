using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace HouseCustomerAPI.Models
{
    public partial class HouseConsumersDBContext : DbContext
    {
        public HouseConsumersDBContext()
        {
        }

        public HouseConsumersDBContext(DbContextOptions<HouseConsumersDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AddressesHouse> AddressesHouses { get; set; }
        public virtual DbSet<Apartment> Apartments { get; set; }
        public virtual DbSet<ColdWaterReading> ColdWaterReadings { get; set; }
        public virtual DbSet<Consumer> Consumers { get; set; }
        public virtual DbSet<HotWaterReading> HotWaterReadings { get; set; }
        public virtual DbSet<Street> Streets { get; set; }
        public virtual DbSet<StreetType> StreetTypes { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseSqlServer("Server=DESKTOP-FVKQGTU\\SQLEXPRESS;Database=HouseConsumersDB;Trusted_Connection=True;");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<AddressesHouse>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.HouseNumber)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.Street)
                    .WithMany(p => p.AddressesHouses)
                    .HasForeignKey(d => d.StreetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Addresses__Stree__245D67DE");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.AddressesHouses)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Addresses__TypeI__236943A5");
            });

            modelBuilder.Entity<Apartment>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.HasOne(d => d.AddressHouse)
                    .WithMany(p => p.Apartments)
                    .HasForeignKey(d => d.AddressHouseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Apartment__Addre__282DF8C2");
            });

            modelBuilder.Entity<ColdWaterReading>(entity =>
            {
                entity.ToTable("ColdWaterReading");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.HasOne(d => d.Apartment)
                    .WithMany(p => p.ColdWaterReadings)
                    .HasForeignKey(d => d.ApartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ColdWater__Apart__29221CFB");

                entity.HasOne(d => d.ConsumerWriter)
                    .WithMany(p => p.ColdWaterReadings)
                    .HasForeignKey(d => d.ConsumerWriterId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ColdWater__Consu__2A164134");
            });

            modelBuilder.Entity<Consumer>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.LastName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Patronymic)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.Apartment)
                    .WithMany(p => p.Consumers)
                    .HasForeignKey(d => d.ApartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Consumers__Apart__25518C17");
            });

            modelBuilder.Entity<HotWaterReading>(entity =>
            {
                entity.ToTable("HotWaterReading");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.HasOne(d => d.Apartment)
                    .WithMany(p => p.HotWaterReadings)
                    .HasForeignKey(d => d.ApartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__HotWaterR__Apart__2645B050");

                entity.HasOne(d => d.ConsumerWriter)
                    .WithMany(p => p.HotWaterReadings)
                    .HasForeignKey(d => d.ConsumerWriterId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__HotWaterR__Consu__2739D489");
            });

            modelBuilder.Entity<Street>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.StreetName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<StreetType>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.StreetTypeName)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("StreetTypeName")
                    .IsFixedLength(true);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
