import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Branch extends BaseModel {
  public static table = 'branches'
  @column({ isPrimary: true })
  public branch_code: string
  @column()
  public description: string
  @column()
  public client_ip: string
  @column()
  public client_token: string
  @column()
  public stat: boolean

  // @column.dateTime({ autoCreate: true })
  // public createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // public updatedAt: DateTime
}
