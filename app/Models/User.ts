import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  public static table = 'sq_user'
  @column({ isPrimary: true, columnName: 'id' })
  public id: number
  @column({ columnName: 'username' })
  public username: string
  @column({ columnName: 'email' })
  public email: string
  @column({ columnName: 'password' })
  public password: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
