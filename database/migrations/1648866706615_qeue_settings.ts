import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class QeueSettings extends BaseSchema {
  protected tableName = 'qeue_settings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id',5)
      table.string('val',10),
      table.string('desc'),
      table.string('title'),
      table.integer('filed_seq',2)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
