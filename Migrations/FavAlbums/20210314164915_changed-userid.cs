using Microsoft.EntityFrameworkCore.Migrations;

namespace New_Jazz.Migrations.FavAlbums
{
    public partial class changeduserid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                table: "FavAlbums",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "user_id",
                table: "FavAlbums",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
