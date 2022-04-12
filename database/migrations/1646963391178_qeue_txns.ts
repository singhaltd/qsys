import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class QeueTxns extends BaseSchema {
  protected tableName = 'qeue_txns'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('counter',4)
      table.integer('qnum',4)
      table.date('trn_dt')
      table.time('trn_tm')
      table.string('serv')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // table.timestamp('created_at')
      // table.timestamp('updated_at')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
