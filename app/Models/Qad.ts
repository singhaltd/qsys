import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Qad extends BaseModel {
  public static table="qeue_ads";
  @column({ isPrimary: true })
  public id: number
  @column({columnName:'title'})
  public title: string
  @column({columnName:'file'})
  public file:string
  @column({columnName:'status'})
  public stat:boolean
  @column({columnName:'type'})
  public type:string;

  // @column.dateTime({ autoCreate: true })
  // public createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // public updatedAt: DateTime
}
