import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  ForeignKey
} from "sequelize-typescript";
import Company from "./Company";
import FilesOptions from "./FilesOptions";

@Table({
  tableName: "Files"
})
class Files extends Model<Files> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @Column
  name: string;

  @Column
  message: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => FilesOptions)
  options: FilesOptions[];
}

export default Files;
