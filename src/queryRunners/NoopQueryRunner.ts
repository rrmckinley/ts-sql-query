import { QueryRunner, DatabaseType } from "./QueryRunner"

export class NoopQueryRunner implements QueryRunner {
    // Supported databases
    readonly mariaDB: true = true
    readonly mySql: true = true
    readonly noopDB: true = true
    readonly oracle: true = true
    readonly postgreSql: true = true
    readonly sqlite: true = true
    readonly sqlServer: true = true
    readonly database: DatabaseType

    constructor(database: DatabaseType = 'noopDB') {
        this.database = database
    }

    getNativeConnection(): unknown {
        return null
    }

    executeSelectOneRow(_query: string, _params: any[]): Promise<any> {
        return Promise.resolve(undefined)
    }
    executeSelectManyRows(_query: string, _params: any[]): Promise<any[]> {
        return Promise.resolve([])
    }
    executeSelectOneColumnOneRow(_query: string, _params: any[]): Promise<any> {
        return Promise.resolve(undefined)
    }
    executeSelectOneColumnManyRows(_query: string, _params: any[]): Promise<any[]> {
        return Promise.resolve([])
    }
    executeInsert(_query: string, _params: any[]): Promise<number> {
        return Promise.resolve(0)
    }
    executeInsertReturningLastInsertedId(_query: string, _params: any[]): Promise<any> {
        return Promise.resolve(undefined)
    }
    executeUpdate(_query: string, _params: any[]): Promise<number> {
        return Promise.resolve(0)
    }
    executeDelete(_query: string, _params: any[]): Promise<number> {
        return Promise.resolve(0)
    }
    executeProcedure(_query: string, _params: any[]): Promise<void> {
        return Promise.resolve()
    }
    executeFunction(_query: string, _params: any[]): Promise<any> {
        return Promise.resolve(undefined)
    }
    executeBeginTransaction(): Promise<void> {
        return Promise.resolve()
    }
    executeCommit(): Promise<void> {
        return Promise.resolve()
    }
    executeRollback(): Promise<void> {
        return Promise.resolve()
    }
    addParam(params: any[], value: any): string {
        const index = params.length
        let result
        switch (this.database) {
            case 'mariaDB':
                result = '?'
                break
            case 'mySql':
                result = '?'
                break
            case 'noopDB':
                result = '$' + index
                break
            case 'oracle':
                result = ':' + index
                break
            case 'postgreSql':
                result = '$' + (index + 1)
                break
            case 'sqlite':
                result = '$' + index
                break
            case 'sqlServer':
                result = '@' + index
                break
            default:
                throw new Error('Unknown database ' + this.database)
        }
        params.push(value)
        return result
    }
    addOutParam(params: any[], name: string): string {
        const index = params.length
        params.push({out_param_with_name: name})
        return ':' + index
    }
}