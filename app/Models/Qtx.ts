// import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Qtx extends BaseModel {
  public static table = "transection"
  @column({ isPrimary: true, columnName: 'id' })
  public id: number
  @column({ columnName: 'counter' })
  public counter: number
  @column({ columnName: 'number' })
  public qnumber: number
  @column({ columnName: 'trandate' })
  public trn_dt: Date
  @column({ columnName: 'trantrime' })
  public trn_tm: String
  @column({ columnName: 'recall' })
  public recall: boolean
  @column()
  public branch:string
  @column({ columnName: 'status' })
  public status: number
  @column({ columnName: 'service' })
  public service: string

  // @column.dateTime({ autoCreate: true })
  // public createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // public updatedAt: DateTime
}
