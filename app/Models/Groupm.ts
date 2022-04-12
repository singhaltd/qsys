// import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Groupm extends BaseModel {
  public static table = "groups"
  @column({ isPrimary: true,columnName:'gid' })
  public id: number
  @column()
  public title:string
  // @column.dateTime({ autoCreate: true })
  // public createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // public updatedAt: DateTime
}
