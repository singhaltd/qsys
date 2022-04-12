import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Branches extends BaseSchema {
  protected tableName = 'branches'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('branch_code',5).primary().unique().notNullable()
      table.string('description',100)
      table.string('client_ip',16)
      table.string('client_token',16)
      table.boolean('stat')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
      //  */
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
