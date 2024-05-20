import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  BelongsTo
} from "sequelize-typescript";
import Files from "./Files";

@Table({
  tableName: "FilesOptions"
})
class FilesOptions extends Model<FilesOptions> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Files)
  @Column
  fileId: number;

  @Column
  name: string;

  @Column
  path: string;

  @Column
  mediaType: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Files)
  file: Files;
}

export default FilesOptions;
