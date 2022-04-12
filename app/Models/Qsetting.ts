import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Qsetting extends BaseModel {
  public static table="qeue_settings"
  @column({ isPrimary: true })
  public id: string
  @column({columnName:'val'})
  public val:string;
  @column({columnName:'desc'})
  public descript:string;
  @column({columnName:'title'})
  public title:string
  @column({columnName:'filed_seq'})
  public sq:number
}
