import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique
} from "sequelize-typescript";

@Table
class Plan extends Model<Plan> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @Column
  users: number;

  @Column
  connections: number;

  @Column
  queues: number;

  @Column
  value: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  useSchedules: boolean;   

  @Column
  useCampaigns: boolean; 
  
  @Column
  useInternalChat: boolean;   
  
  @Column
  useExternalApi: boolean;   

  @Column
  useKanban: boolean;

  @Column
  useOpenAi: boolean;

  @Column
  useIntegrations: boolean;
}

export default Plan;
