import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class QeueAds extends BaseSchema {
  protected tableName = 'qeue_ads'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title',100)
      table.text('file')
      table.string('type',10)
      table.boolean('status')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
