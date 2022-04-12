import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Groupcon extends BaseModel {
  public static table = 'service_groups'
  @column({ isPrimary: true })
  public id: number
  @column({columnName:'service_code'})
  public service:string
  @column({columnName:'branch_code'})
  public branch:string
  @column({columnName:'group_id'})
  public group:string

  // @column.dateTime({ autoCreate: true })
  // public createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // public updatedAt: DateTime
}
