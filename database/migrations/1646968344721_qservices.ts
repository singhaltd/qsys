import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Qservices extends BaseSchema {
  protected tableName = 'qservices'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('qcode',5).primary().notNullable().unique()
      table.string('title')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
