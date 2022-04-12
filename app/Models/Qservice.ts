import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Qservice extends BaseModel {
  public static table = "qservices"
  @column({ isPrimary: true, columnName: 'qcode' })
  public qcode: string
  @column({ columnName: 'title' })
  public title: string
}
