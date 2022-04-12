import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServiceGroups extends BaseSchema {
  protected tableName = 'service_groups'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable()
      table.string('service_code',5)
      table.string('branch_code',5)
      table.string('group_id',5)

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
