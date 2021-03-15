﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using New_Jazz.Data;

namespace New_Jazz.Migrations.FavAlbums
{
    [DbContext(typeof(FavAlbumsContext))]
    [Migration("20210314164915_changed-userid")]
    partial class changeduserid
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.3");

            modelBuilder.Entity("New_Jazz.Models.FavAlbum", b =>
                {
                    b.Property<int>("fav_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("spotify_id")
                        .HasColumnType("longtext");

                    b.Property<int>("user_id")
                        .HasColumnType("int");

                    b.HasKey("fav_id");

                    b.ToTable("FavAlbums");
                });
#pragma warning restore 612, 618
        }
    }
}
